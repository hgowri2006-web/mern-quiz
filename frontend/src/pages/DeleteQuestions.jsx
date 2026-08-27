import { useEffect, useState } from "react";

function DeleteQuestions({onBack}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      `http://localhost:8080/questions/${id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      setQuestions(
        questions.filter((question) => question._id !== id)
      );

      alert("Question deleted successfully!");
    }
  };

  return (
    <div className="delete-questions">
<button className="back-button" onClick={onBack}>
        ← Back    
</button>
      <h1 className="quiz-title">Delete Questions</h1>

      {questions.map((question, index) => (
        <div className="question-item" key={question._id}>

          <h3>
            {index + 1}. {question.question}
          </h3>

          <button
            className="topic-button"
            onClick={() => handleDelete(question._id)}
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default DeleteQuestions;