import { useState, useEffect } from 'react';
import Todoadd from './Component/Todoadd.jsx';
import './App.css';

function App() {
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="app-container">
            <nav className="navbar">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="https://github.com/HimanshuX0802">GitHub</a></li>
                </ul>
            </nav>
            <header>
                <p className="date">Date: {date}</p>
                <p className="time">Time: {time}</p>
            </header>
            <main>
                <Todoadd />
            </main>
        </div>
    );
}

export default App;