// src/App.js
import React from 'react';
import ToDoList from './components/ToDoList';
import './App.css'; // Ensure you have your styles imported

const App = () => {
    return (
        <div className="container">
            <ToDoList />
        </div>
    );
};

export default App;