import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const { user, theme } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [recommendedProblems, setRecommendedProblems] = useState([]);
    const [leaderboardRank, setLeaderboardRank] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return; // Ensure user is logged in

            try {
                const [userStats, recommendations, leaderboard] = await Promise.all([
                    axios.get(`http://localhost:5000/api/user-stats/${user.uid}`), // Fetch user stats using user ID
                    axios.get('http://localhost:5000/api/recommendations'),
                    axios.get('http://localhost:5000/api/leaderboard')
                ]);
                setUserData(userStats.data);
                setRecommendedProblems(recommendations.data);
                setLeaderboardRank(leaderboard.data.rank);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user]); // Depend on user context

    if (!userData) {
        return <div className={`dashboard ${theme}`}>Loading your dashboard...</div>;
    }

    return (
        <div className={`dashboard ${theme}`}>
            <h1>Welcome, {user.displayName}! 👋</h1>
            <div className="stats">
                <p>🔥 <strong>Coding Streak:</strong> {userData.streak} days</p>
                <p>✅ <strong>Problems Solved:</strong> {userData.solved_problems.easy} Easy, {userData.solved_problems.medium} Medium, {userData.solved_problems.hard} Hard</p>
                <p>💻 <strong>Preferred Language:</strong> {userData.preferred_language}</p>
                <p>⚠️ <strong>Weak Areas:</strong> {userData.weak_areas.join(', ')}</p>
            </div>
            <h2>📌 Recent Submission</h2>
            <div className="submission">
                <p>📝 <strong>Problem:</strong> {userData.recent_submission.problem}</p>
                <p>🔍 <strong>Status:</strong> {userData.recent_submission.status}</p>
                <p>⏱️ <strong>Execution Time:</strong> {userData.recent_submission.execution_time}</p>
            </div>
            <h2>🎯 AI-Powered Recommendations</h2>
            <p>We noticed you’re struggling with <strong>{userData.weak_areas.join(', ')}</strong>. Try these learning modules to improve:</p>
            <ul>
                <li>📚 <a href="/learning/dynamic-programming">Dynamic Programming Crash Course</a></li>
                <li>📚 <a href="/learning/recursion">Mastering Recursion</a></li>
            </ul>
            <h2>🧩 Suggested Problems</h2>
            <ul>
                {recommendedProblems.length > 0 ? (
                    recommendedProblems.map((problem, index) => (
                        <li key={index}>⚡ <a href={`/problems/${problem.id}`}>{problem.title}</a></li>
                    ))
                ) : (
                    <p>Loading recommended problems...</p>
                )}
            </ul>
            <h2>🏆 Leaderboard Ranking</h2>
            <p>You are currently ranked <strong>#{leaderboardRank}</strong> globally! Keep pushing to climb higher. 🚀</p>
        </div>
    );
};

export default Dashboard;