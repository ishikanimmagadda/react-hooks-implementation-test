import React, { useState } from 'react';
import { useTasks } from './TaskContext';

const AddTask = () => {
    const [task, setTask] = useState('');
    const { addTask } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task) return;
        await addTask(task + " ");  // Call the context function which makes an API call
        setTask('');  // Clear the input
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
