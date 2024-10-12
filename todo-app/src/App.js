import React from 'react';
import { TaskProvider } from './TaskContext';
import AddTask from './AddTask';
import TaskList from './TaskList';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
    return (
        <TaskProvider>
            <ErrorBoundary>
                <h1>To-Do List</h1>
                <AddTask />
                <TaskList />
            </ErrorBoundary>
        </TaskProvider>
    );
};

export default App;