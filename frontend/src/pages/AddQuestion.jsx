import { useState } from "react";
import { QUIZ_TOPICS } from "../quizConstants";
import {apiFetch} from "../api";

function AddQuestion({onBack}) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      question,
      options,
      answer,
      category,
      difficulty
    };

    const response = await apiFetch("/questions", {
  method: "POST",
  body: JSON.stringify(newQuestion)
}); 
const data = await response.json();

console.log("Add question response:", response.status, data);
    if (response.ok) {
      alert("Question added successfully!");

      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setCategory("");
      setDifficulty("easy");
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div className="add-questions">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <h1 className="quiz-title">Add Question</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="login-input"
        />

        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) =>
              handleOptionChange(index, e.target.value)
            }
            className="login-input"
          />
        ))}

        <input
          type="text"
          placeholder="Correct answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="login-input"
        />

        <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
               className="login-input">
  <option value="">Select Category</option>

  {QUIZ_TOPICS.map((topic) => (
    <option key={topic.name} value={topic.name}>
      {topic.name} {topic.emoji}
    </option>
  ))}
</select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="login-input"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button type="submit" className="start-button">
          Add Question
        </button>

      </form>

    </div>
  );
}

export default AddQuestion;