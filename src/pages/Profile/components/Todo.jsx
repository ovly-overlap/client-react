import { useState } from "react";
import plusBtn from "../../../assets/plus-icon.svg";
import TodoCard from "./TodoCard.jsx";
import { dummyTodos } from "../dummyTodos.js";

    export default function Todo() {
        const [showInput, setShowInput] = useState(false);
        const [todos, setTodos] = useState(dummyTodos);
    
        return (
            <div style={style.todoSection}>
                <div style={style.todoBtnDiv}>
                    <span style={style.todoText}>해야 할 일</span>
                    <button style={style.plusButton} onClick={() => setShowInput(true)}>
                        <img src={plusBtn} alt="plusButton" style={style.plusButtonImg} />
                    </button>
                </div>
                <TodoCard
                    todos={todos}
                    setTodos={setTodos}
                    showInput={showInput}
                    setShowInput={setShowInput}
                />
            </div>
        );
    }
const style = {
    todoSection : {
        display : 'flex',
        flexDirection : 'column',
        gap : '13px'
    },
    todoBtnDiv : {
        display : 'flex',
        flexDirection : 'row', 
        gap: '10px'
    },
    todoText : {
        color: 'var(--gray-1)',
        fontWeight: 'bold',
        fontSize : '20px'
    },
    plusButton : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    plusButtonImg : {
        width : '22px',
        height: '22px'
    },addInput: {
        border: 'none',
        borderBottom: '1px solid var(--outline-3)',
        outline: 'none',
        fontSize: '14px',
        color: 'var(--gray-2)',
        padding: '8px 4px',
        width: '100%',
        backgroundColor: 'transparent',
    },
}