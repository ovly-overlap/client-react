import { useState } from "react";
import { createPortal } from "react-dom";
import checkboxCheckIcon from "../../../assets/checkbox-check-icon.svg";
import sleepIcon from "../../../assets/sleep-icon.svg";
import { getTodayKey } from "../../../utils/localStorage.js";

const getTodayValue = () => getTodayKey();

export default function TodoCard({ todos, setTodos, showInput, setShowInput, isMyProfile=false }) {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 });
    const [memoEditingId, setMemoEditingId] = useState(null);
    const [memoInputValue, setMemoInputValue] = useState('');

    const isCardEmpty = todos.length === 0 && !showInput;
    const dynamicTodoCardStyle = {
        ...style.todoCard,
        alignItems: isCardEmpty ? 'center' : 'stretch',
        justifyContent: isCardEmpty ? 'center' : 'flex-start',
    };

    const toggleDone = (id) => {
        if (!isMyProfile) return;
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
        setOpenMenuId(null);
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditValue(todo.label);
        setOpenMenuId(null);
    };

    const confirmEdit = (id) => {
        if (editValue.trim()) {
            setTodos(todos.map(t => t.id === id ? { ...t, label: editValue.trim() } : t));
        }
        setEditingId(null);
    };

    const resetAddInput = () => {
        setInputValue('');
        setShowInput(false);
    };

    const addTodo = () => {
        if (!inputValue.trim()) return; 
        setTodos([
            ...todos,
            {
                id: Date.now(),
                label: inputValue.trim(),
                createdAt: getTodayKey(),
                done: false,
                memo: '',
            },
        ]);
        resetAddInput();
    };

    const handleAdd = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
        if (e.key === 'Escape') {
            resetAddInput();
        }
    };

    const startAddMemo = (todo) => {
        setMemoEditingId(todo.id);
        setMemoInputValue(todo.memo || '');
        setOpenMenuId(null);
    };

    const handleMemoAdd = (e, id) => {
        if (e.key === 'Enter') {
            setTodos(todos.map(t => t.id === id ? { ...t, memo: memoInputValue.trim() } : t));
            setMemoEditingId(null);
            setMemoInputValue('');
        }
        if (e.key === 'Escape') {
            setMemoEditingId(null);
            setMemoInputValue('');
        }
    };

    const handleKebabClick = (e, todoId) => {
        e.preventDefault();
        e.stopPropagation();

        if (openMenuId === todoId) {
            setOpenMenuId(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setMenuCoords({
                top: rect.bottom + window.scrollY + 4,
                left: rect.right + window.scrollX - 90
            });
            setOpenMenuId(todoId);
        }
    };

    const handleInputBlur = () => {
        if (!inputValue.trim()) {
            resetAddInput(); 
        } else {
            addTodo(); 
        }
    };

    return (
        <div style={dynamicTodoCardStyle} onClick={() => { setOpenMenuId(null); }}>
            <style>{`
                .todo-item-row .kebab-btn { opacity: 0; transition: opacity 0.15s; }
                .todo-item-row:hover .kebab-btn,
                .todo-item-row.menu-open .kebab-btn { opacity: 1 !important; }
            `}</style>

            {todos.length === 0 && !showInput ? (
                <div style={style.emptyTodo}>
                    <img src={sleepIcon} alt="sleep-icon" />
                    <div style={style.emptyText}>작성된 할 일이 없어요.</div>
                </div>
            ) : (
                <ul style={style.todoList}>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item-row ${openMenuId === todo.id ? 'menu-open' : ''}`}
                            style={{ ...style.todoItem, flexDirection: 'column', alignItems: 'flex-start' }}
                        >
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '10px' }}>
                                <div
                                    style={{
                                        ...(todo.done ? style.checkboxDone : style.checkbox),
                                        cursor: isMyProfile ? 'pointer' : 'default'
                                    }}
                                    onClick={(e) => { e.stopPropagation(); toggleDone(todo.id); }}
                                >
                                    {todo.done && (
                                        <img 
                                            src={checkboxCheckIcon} 
                                            alt="checked" 
                                            style={style.checkIcon} 
                                        />
                                    )}
                                </div>

                                {editingId === todo.id ? (
                                    <input
                                        autoFocus
                                        value={editValue}
                                        onChange={e => setEditValue(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && confirmEdit(todo.id)}
                                        onBlur={() => confirmEdit(todo.id)}
                                        style={style.editInput}
                                    />
                                ) : (
                                    <span style={todo.done ? style.labelDone : style.label}>
                                        {todo.label}
                                    </span>
                                )}
                                {isMyProfile && (
                                    <div style={style.kebabWrapper}>
                                        <button
                                            type="button"
                                            className="kebab-btn"
                                            style={style.kebabBtn}
                                            onClick={(e) => handleKebabClick(e, todo.id)}
                                        >
                                            ⋮
                                        </button>
                                        
                                        {openMenuId === todo.id && createPortal(
                                            <div 
                                                style={{ 
                                                    ...style.portalMenu, 
                                                    top: `${menuCoords.top}px`, 
                                                    left: `${menuCoords.left}px` 
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div style={style.menuItem} onClick={() => startEdit(todo)}>수정</div>
                                                <div style={style.menuItem} onClick={() => startAddMemo(todo)}>메모 추가</div>
                                                <div style={{ ...style.menuItem, color: 'var(--red)', border: 'none' }} onClick={() => deleteTodo(todo.id)}>삭제</div>
                                            </div>,
                                            document.body
                                        )}
                                    </div>
                                )}
                            </div>

                            <div style={{ paddingLeft: '27px', width: '100%', marginTop: '2px' }}>
                                {memoEditingId === todo.id ? (
                                    <input
                                        autoFocus
                                        placeholder="메모를 입력하고 Enter를 누르세요"
                                        value={memoInputValue}
                                        onChange={e => setMemoInputValue(e.target.value)}
                                        onKeyDown={e => handleMemoAdd(e, todo.id)}
                                        onBlur={() => setMemoEditingId(null)}
                                        style={style.memoInput} 
                                    />
                                ) : (
                                    todo.memo && (
                                        <div style={style.memoText}>
                                            {todo.memo}
                                        </div>
                                    )
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isMyProfile && showInput && (
                <div style={style.inputWrapper}>
                    <input
                        autoFocus
                        placeholder="TODO 추가하기"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={handleAdd}onBlur={handleInputBlur}
                        style={style.addInput}
                    />
                </div>
            )}
        </div>
    );
}

const style = {
    todoCard: {
        border: '3px solid var(--outline-3)',
        backgroundColor: 'var(--white)',
        borderRadius: '15px',
        minHeight: '290px',
        padding: '14px 16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    emptyTodo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:'10px',
    },
    emptyText: {
        fontSize: '20px', 
        color: 'var(--black)', 
        letterSpacing: '1px', 
        fontWeight: '500' 
    },
    todoList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    todoItem: {
        display: 'flex',
        padding: '10px 0',
    },
    memoInput: {
        width: '80%',
        padding: '4px 8px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
        color: 'var(--gray-2)',
    },
    memoText: {
        fontSize: '14px',
        color: 'var(--gray-2)',
        borderRadius: '4px',
        display: 'inline-block',
    },
    checkbox: {
        width: '18px',
        height: '18px',
        borderRadius: '3px',
        border: '2px solid transparent',
        backgroundImage: `linear-gradient(var(--white), var(--white)),
                            linear-gradient(to bottom, var(--outline-2-top) 2%, var(--outline-2-bottom) 98%)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        flexShrink: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxDone: {
        width: '18px',
        height: '18px',
        borderRadius: '3px',
        border: '2px solid transparent',
        backgroundImage: `linear-gradient(var(--white), var(--white)),
                            linear-gradient(to bottom, var(--outline-2-top) 2%, var(--outline-2-bottom) 98%)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        flexShrink: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        width: '12px',
        height: '12px',
        display: 'block',
    },
    label: {
        fontSize: '16px',
        fontWeight : '500',
        color: 'var(--black)',
        flex: 1,
    },
    labelDone: {
        fontSize: '16px',
        fontWeight : '500',
        color: 'var(--gray-1)',
        textDecoration: 'line-through',
        flex: 1,
    },
    kebabWrapper: {
        marginLeft: 'auto',
        display: 'inline-block',
    },
    kebabBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        color: 'var(--gray-2)',
        padding: '0 4px',
        lineHeight: 1,
    },
    portalMenu: {
        position: 'absolute',    
        backgroundColor: 'var(--white)',
        border: '1px solid var(--outline-3)',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 9999,            
        minWidth: '90px',
        overflow: 'hidden',
    },
    menuItem: {
        padding: '9px 16px',
        fontSize: '13px',
        cursor: 'pointer',
        color: 'var(--gray-1)',
        whiteSpace: 'nowrap',
    },
    editInput: {
        flex: 1,
        border: 'none',
        borderBottom: '1px solid var(--outline-2)',
        outline: 'none',
        fontSize: '15px',
        color: 'var(--gray-1)',
        background: 'transparent',
        padding: '2px 0',
    },
    inputWrapper: {
        marginTop: '8px',
        borderBottom: '1px solid var(--outline-3)',
        paddingTop: '4px',
    },
    addInput: {
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        color: 'var(--gray-2)',
        padding: '8px 4px',
        width: '100%',
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
    },
};