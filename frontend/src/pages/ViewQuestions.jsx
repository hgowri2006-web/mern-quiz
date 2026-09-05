import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function ViewQuestions({onBack}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    apiFetch("/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <div className="view-questions">
      <button className="back-button" onClick={onBack}>
          ← back
      </button>
      <h1 className="quiz-title">All Questions</h1>

      {questions.map((question, index) => (
        <div className="question-item" key={question._id}>

          <h3>
            {index + 1}. {question.question}
          </h3>

          <p>
            <strong>Category:</strong> {question.category}
          </p>

          <p>
            <strong>Difficulty:</strong> {question.difficulty}
          </p>

          <p>
            <strong>Answer:</strong> {question.answer}
          </p>

        </div>
      ))}

    </div>
  );
}

export default ViewQuestions;