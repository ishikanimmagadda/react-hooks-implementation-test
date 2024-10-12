// src/TaskList.js
import React from 'react';
import { useTasks } from './TaskContext';

const TaskList = () => {
    const { tasks, removeTask, toggleTask } = useTasks();

    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    <span onClick={() => toggleTask(task)}>
                        {task.completed ? <s>{task.name}</s> : task.name}
                    </span>
                    <button onClick={() => removeTask(task)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
