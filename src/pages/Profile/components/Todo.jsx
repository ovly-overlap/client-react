import { useEffect, useState } from "react";
import plusBtn from "../../../assets/plus-icon.svg";
import TodoCard from "./TodoCard.jsx";
import { getCurrentUser, updateCurrentUser } from "../../../utils/localStorage.js";

export default function Todo({ isMyProfile = false, selectedDay}) {
    const currentUser = getCurrentUser();
    const currentUserId = currentUser?.id;
    const [showInput, setShowInput] = useState(false);
    const [todos, setTodos] = useState(() => currentUser?.todos ?? []);    
    const formattedMonth = String(selectedDay.month + 1).padStart(2, '0');
    const formattedDay = String(selectedDay.day).padStart(2, '0');
    const selectedDateKey = `${selectedDay.year}-${formattedMonth}-${formattedDay}`;
    const filteredTodos = todos.filter(todo => todo.createdAt === selectedDateKey);

    useEffect(() => {
        if (isMyProfile && currentUserId) {
            updateCurrentUser({ todos });
        }
    }, [todos, isMyProfile, currentUserId]);

    return (
        <div style={style.todoSection}>
            <div style={style.todoBtnDiv}>
                <span style={style.todoText}>해야 할 일</span>
                {isMyProfile && (
                    <button style={style.plusButton} onClick={() => setShowInput(true)}>
                        <img src={plusBtn} alt="plusButton" style={style.plusButtonImg} />
                    </button>
                )}
            </div>
            <TodoCard
                todos={filteredTodos} 
                allTodos={todos}
                setTodos={setTodos}
                showInput={showInput}
                setShowInput={setShowInput}
                isMyProfile={isMyProfile}
                selectedDateKey={selectedDateKey}
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
        border: "none",
        backgroundColor:'transparent',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    plusButtonImg : {
        width : '22px',
        height: '22px'
    },
}
