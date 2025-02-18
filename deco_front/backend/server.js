const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample user data
const userData = {
    username: "CodeMaster99",
    streak: 7,
    solved_problems: { easy: 15, medium: 8, hard: 2 },
    preferred_language: "Python",
    weak_areas: ["Dynamic Programming", "Recursion"],
    recent_submission: {
        problem: "Fibonacci Sequence",
        status: "Wrong Answer",
        execution_time: "150 ms"
    }
};

// API endpoint to get user stats
app.get('/api/user-stats', (req, res) => {
    res.json(userData);
});

// API endpoint to get recommendations (dummy data)
app.get('/api/recommendations', (req, res) => {
    const recommendations = [
        { id: 1, title: "Dynamic Programming Challenge" },
        { id: 2, title: "Recursion Practice" }
    ];
    res.json(recommendations);
});

// API endpoint to get leaderboard rank (dummy data)
app.get('/api/leaderboard', (req, res) => {
    res.json({ rank: 245 });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
