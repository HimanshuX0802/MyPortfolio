import React, { useState, useEffect } from 'react';
import './Todoadd.css';

function Todoadd() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleText = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') return;
        setTodos([...todos, { text, completed: false }]);
        setText('');
    };

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-container">
            <h2 className="todo-title">My Tasks</h2>
            <div className="add-todo">
                <input
                    type="text"
                    value={text}
                    onChange={handleText}
                    placeholder="What’s on your mind?"
                />
                <button type="submit" onClick={handleSubmit}>
                    <span>Add Task</span>
                </button>
            </div>
            <div className="todo-list">
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index} className={todo.completed ? 'completed' : ''}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(index)}
                            />
                            <span>{todo.text}</span>
                            <button onClick={() => handleDelete(index)}>
                                <span>✕</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todoadd;