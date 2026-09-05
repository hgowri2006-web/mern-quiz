

  import { useState , useEffect } from 'react'
  import { apiFetch } from '../api';
  
  function Quiz({topic, onBackToDashboard, username}) {
    const [questions, setQuestions] = useState([]);
    const[score, setScore]=useState(0);
    const[currentQuestion, setCurrentQuestion]=useState(0);
    const [feedback, setFeedback] = useState('');
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
    const [warning, setWarning] = useState('');
    const [tabSwitches, setTabSwitches] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
  
    
  
    const startQuiz = async () => {
    const response = await 
    apiFetch(`/quiz/start`,   {
      method: "POST"
      
    });
  
    const data = await response.json();
      setSessionId(data.sessionId);
      setExpiresAt(data.expiresAt);
     
  }; 
  const handleAnswer = async (option, correctAnswer) => {
  if (answered) return;

  try {
    const response = await apiFetch("/quiz/answer", {
      method: "POST",
       
      body: JSON.stringify({
        sessionId,
        questionId: questions[currentQuestion]._id,
        answer: option
      })
    });

    const data = await response.json();

    // Server says the quiz has expired
    if (!response.ok) {
      if (response.status === 403) {
        setFeedback("Time expired!");
        setCurrentQuestion(questions.length);
        return;
      }

      alert(data.message);
      return;
    }

    setAnswered(true);
    setSelectedAnswer(option);

    if (data.correct) {
      setScore((prev) => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }

  } catch (error) {
    alert("Unable to connect to server");
  }
};
     
    useEffect(() => {
      apiFetch(`/questions?category=${topic}`)
        .then((res) => res.json())
        .then((data) => setQuestions(data));
    },[topic]);
   useEffect(() => {
    if (!expiresAt) return;
  
    const timer = setInterval(() => {
      const remaining =
        new Date(expiresAt).getTime() - Date.now();
  
      const seconds = Math.max(0, Math.floor(remaining / 1000));
  
      setTimeLeft(seconds);
  
      if (seconds === 0) {
        clearInterval(timer);
        setCurrentQuestion(questions.length);
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, [expiresAt, questions.length]);
  
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden && expiresAt && sessionId) {
        
        setTabSwitches((prev) => prev + 1);
        setWarning("Warning: Do not switch tabs during the quiz!");
  
  
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [expiresAt, sessionId]);  
  const saveResult = async () => {
  try {
    await apiFetch(`/quiz/result`,  {
      method: "POST",
       
      body: JSON.stringify({
        username,
        sessionId,
        topic,
        score,
        totalQuestions: questions.length,
        tabSwitches
      })
    });
  } catch (error) {
    console.log("Error saving result:", error);
  }
};
    return (
      
  
    <div className="quiz-container">
      <div className="quiz-box">
        <h1 className="quiz-title">{topic}</h1>
       
      {!expiresAt && (<> 
        
         <div className="instructions-container">
  <h2>Quiz Instructions</h2>

  <ul>
    <li>The quiz contains multiple-choice questions.</li>
    <li>One question is shown at a time.</li>
    <li>Select an answer and click <b>Next</b>.</li>
    <li>The quiz has a fixed time limit and cannot be paused.</li>
    <li>Avoid switching tabs during the quiz.</li>
    <li>Your score and percentage will be shown at the end.</li>
  </ul>
</div>
<button className="start-button" onClick={startQuiz}>Start Quiz</button></>
      )}
  
      {expiresAt && currentQuestion < questions.length ? (
    <div>
  
      <p className="question-progress">Question {currentQuestion + 1} of {questions.length}</p>
  
      {timeLeft !== null && (
        <p>
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
      )}
  
      {warning && <p>{warning}</p>}
  
      <p>Tab switches: {tabSwitches}</p>
  
      <h3 className="question">{questions[currentQuestion].question}</h3>
  
      {questions[currentQuestion].options.map((option, index) => (
        <button className=
        {
          answered ? option === questions[currentQuestion].answer ? "option-button correct-option" : option === selectedAnswer 
          ? "option-button wrong-option" : "option-button" : "option-button"
          
        }
          key={index}
          onClick={() =>
            handleAnswer(option, questions[currentQuestion].answer)
          }
          disabled={answered}>
          {option}
        </button>
      ))}
       
        <p className={`feedback ${feedback === "Correct!" ? "correct" : "wrong"}`}>
    {feedback}
  </p>
  
  
  
      {feedback && (
        <button className="next-button"
          onClick={async () => {
            setFeedback('');
            setAnswered(false);
            setSelectedAnswer('');
  
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              setCurrentQuestion(questions.length);
              await saveResult();
            }
          }}
        >
          Next Question
        </button>
      )}
  
    </div>
  
  ) : expiresAt && currentQuestion >= questions.length ? (
  
    <div className="result-container">
      <h2>Quiz Completed!</h2>
  
      <p className="result-score">
        Your score</p>
        <div className="score">  {score} <span> out of {questions.length}</span>
       </div>
  
      <p className="result-percentage">
          {Math.round((score / questions.length) * 100)}%
      </p>
  <p className="result-message">
    Great job! Your quiz has been completed.
  </p>
  <div className="result-buttons">
      <button className="restart-button"
        onClick={async () => {
          setCurrentQuestion(0);
          setScore(0);
          setFeedback('');
          setAnswered(false);
          setExpiresAt(null);
          setTimeLeft(null);
          setTabSwitches(0);
          setWarning('');
  
          await startQuiz();
        }}
      >
        Restart Quiz
      </button>
      <button
  className="dashboard-button"
  onClick={onBackToDashboard}
>
  Back to Dashboard
</button>
    </div>
  </div>
  ) : null}
  </div>
  </div>
    );
  }
  
    
  export default Quiz;