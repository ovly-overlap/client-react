import { useState } from "react";
import plusBtn from "../../../assets/plus-icon.svg";
import TodoCard from "./TodoCard.jsx";
import { dummyTodos } from "../dummyTodos.js";

export default function Todo({ isMyProfile = false }) {
    const [showInput, setShowInput] = useState(false);
    const [todos, setTodos] = useState(dummyTodos);

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
                todos={todos}
                setTodos={setTodos}
                showInput={showInput}
                setShowInput={setShowInput}
                isMyProfile={isMyProfile}
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