// src/TaskContext.js
import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => setTasks((prevTasks) => [...prevTasks, task]);
    const removeTask = (taskToRemove) =>
        setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToRemove));
    const toggleTask = (taskToToggle) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task === taskToToggle ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};
