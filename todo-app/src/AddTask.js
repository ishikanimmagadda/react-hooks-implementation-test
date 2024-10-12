// src/AddTask.js
import React, { useState } from 'react';
import { useTasks } from './TaskContext';

const AddTask = () => {
    const [task, setTask] = useState('');
    const { addTask } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task) return;
        addTask({ name: task + " ", completed: false });
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
