import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from API on initial load
    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    const addTask = async (taskName) => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', { name: taskName });
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const removeTask = async (taskToRemove) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskToRemove.id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToRemove.id));
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    const toggleTask = async (taskToToggle) => {
        try {
            const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
            const response = await axios.put(`http://localhost:5000/api/tasks/${taskToToggle.id}`, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskToToggle.id ? response.data : task
                )
            );
        } catch (error) {
            console.error('Error toggling task:', error);
        }
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
