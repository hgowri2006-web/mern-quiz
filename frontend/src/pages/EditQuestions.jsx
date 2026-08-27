import { useEffect, useState } from "react";

function EditQuestions({onBack}) {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleChange = (field, value) => {
    setEditingQuestion({
      ...editingQuestion,
      [field]: value
    });
  };

  const handleSave = async () => {
    const response = await fetch(
      `http://localhost:8080/questions/${editingQuestion._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editingQuestion)
      }
    );

    if (response.ok) {
      alert("Question updated successfully!");

      setQuestions(
        questions.map((question) =>
          question._id === editingQuestion._id
            ? editingQuestion
            : question
        )
      );

      setEditingQuestion(null);
    }
  };

  return (
    <div className="edit-questions">
<button className="back-button" onClick={onBack}>
     ← Back
</button>
      <h1 className="quiz-title">Edit Questions</h1>

      {!editingQuestion && (
        <>
          {questions.map((question, index) => (
            <div className="question-item" key={question._id}>

              <h3>
                {index + 1}. {question.question}
              </h3>

              <button
                className="topic-button"
                onClick={() => setEditingQuestion(question)}
              >
                Edit
              </button>

            </div>
          ))}
        </>
      )}

      {editingQuestion && (
        <div>

          <input
            className="login-input"
            value={editingQuestion.question}
            onChange={(e) =>
              handleChange("question", e.target.value)
            }
          />

          {editingQuestion.options.map((option, index) => (
            <input
              key={index}
              className="login-input"
              value={option}
              onChange={(e) => {
                const updatedOptions = [
                  ...editingQuestion.options
                ];

                updatedOptions[index] = e.target.value;

                setEditingQuestion({
                  ...editingQuestion,
                  options: updatedOptions
                });
              }}
            />
          ))}

          <input
            className="login-input"
            value={editingQuestion.answer}
            onChange={(e) =>
              handleChange("answer", e.target.value)
            }
          />

          <input
            className="login-input"
            value={editingQuestion.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
          />

          <input
            className="login-input"
            value={editingQuestion.difficulty}
            onChange={(e) =>
              handleChange("difficulty", e.target.value)
            }
          />

          <button
            className="start-button"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="topic-button"
            onClick={() => setEditingQuestion(null)}
          >
            Cancel
          </button>

        </div>
      )}

    </div>
  );
}

export default EditQuestions;