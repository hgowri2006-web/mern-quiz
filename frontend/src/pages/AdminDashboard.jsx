 function AdminDashboard({
  onAddQuestion,
  onViewQuestions,
  onEditQuestions,
  onDeleteQuestions,
  onBack
}) {
  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <button className="back-button" onClick={onBack}>
       ← back
    </button>
        <h1 className="quiz-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your quiz questions</p>
      </div>
    
      <div className="admin-welcome">
        <h2>Welcome, Admin!</h2>
        <p>Select an option to manage the quiz portal.</p>
      </div>

      <div className="admin-options">

        <button
          className="admin-option-button"
          onClick={() => onAddQuestion()}
        >
          <span className="admin-option-icon">➕</span>
          Add Question
        </button>

        <button
          className="admin-option-button"
          onClick={() => onViewQuestions()}
        >
          <span className="admin-option-icon">👁️</span>
          View Questions
        </button>

        <button
          className="admin-option-button"
          onClick={() => onEditQuestions()}
        >
          <span className="admin-option-icon">✏️</span>
          Edit Questions
        </button>

        <button
          className="admin-option-button"
          onClick={() => onDeleteQuestions()}
        >
          <span className="admin-option-icon">🗑️</span>
          Delete Questions
        </button>

      </div>

    </div>
  );
}

export default AdminDashboard;