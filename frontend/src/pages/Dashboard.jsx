 
 import { useEffect, useState } from "react";

function Dashboard({ username, onLogout, onSelectTopic }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!username) return;
fetch(`${import.meta.env.VITE_API_URL}/quiz/results/$username`,)
    
      .then((res) => res.json())
       .then((data) => setResults(data))
      .catch((error) => console.log(error));
  }, [username]);

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1 className="quiz-title">Quiz Portal</h1>
          <p className="dashboard-subtitle">
            Online Assessment Platform
          </p>
        </div>

        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <p>
        <b>Welcome, {username}!</b>
      </p>

      <h2>Choose a Quiz Topic</h2>

      <p>Select a topic to begin your quiz.</p>

      <div className="topics">

        <button
          className="topic-button"
          onClick={() => onSelectTopic("Astronomy")}
        >
          Astronomy🪐
        </button>

        <button
          className="topic-button"
          onClick={() => onSelectTopic("Aptitude")}
        >
          Aptitude🧠
        </button>

        <button
          className="topic-button"
          onClick={() => onSelectTopic("Programming")}
        >
          Programming💻
        </button>

      </div>

    <div className="performance-section">
  <h2>Performance</h2>

  {results.length === 0 ? (
    <p>No quiz attempts yet.</p>
  ) : (
    [...new Set(results.map((result) => result.topic))].map((topic) => {
      const topicResults = results.filter(
        (result) => result.topic === topic
      );

      const bestResult = topicResults.reduce((best, current) =>
        current.percentage > best.percentage ? current : best
      );

      return (
        <div key={topic} className="performance-item">
          <h3>{topic}</h3>

          <p>
            Best Score: {bestResult.score} / {bestResult.totalQuestions}
          </p>

          <p>
            Best Percentage: {bestResult.percentage}%
          </p>

          <p>
            Attempts: {topicResults.length}
          </p>
        </div>
      );
    })
  )}
</div>

    </div>
  );
}

export default Dashboard;