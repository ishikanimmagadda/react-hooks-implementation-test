// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// Create a new task
app.post('/api/tasks', (req, res) => {
    const { name } = req.body;
    const newTask = { id: tasks.length + 1, name, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { name, completed } = req.body;
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.name = name !== undefined ? name : task.name;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('API is running');
});

