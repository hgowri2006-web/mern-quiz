
import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import MemberLogin from "./pages/MemberLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuestion from "./pages/AddQuestion";
import ViewQuestions from "./pages/ViewQuestions";
import EditQuestions from "./pages/EditQuestions";
import DeleteQuestions from "./pages/DeleteQuestions";
import Signup from "./pages/Signup";

function App() {
  const [page, setPage] = useState("login");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [username, setUsername] = useState("");
 
  const handleSelectRole = (role) => {
    if(role === "admin"){
      setPage("adminLogin");
    } else{
    setPage("memberLogin");
    }
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setPage("quiz");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">

        {page === "login" && (
          <Login onSelectRole={handleSelectRole} />
        )}

         {page === "memberLogin" && (
          <MemberLogin onLogin={(username) => {
      setUsername(username);
      setPage("Dashboard");
    }}
    onSignup={() => setPage("signup")}
    onBack={() => setPage("login")}
  />
)}

        {page === "adminLogin" && (
          <AdminLogin onLogin={ () => setPage("AdminDashboard")} 
          onBack={() => setPage("login")}
          />
        )}
        {page === "AdminDashboard" && (
          <AdminDashboard 
            onAddQuestion={() => setPage("AddQuestion")}
            onViewQuestions={() => setPage("ViewQuestions")}
            onEditQuestions={() => setPage("EditQuestions")}
            onDeleteQuestions={() => setPage("DeleteQuestions")}
            onBack={() => setPage("adminLogin")}
          />
        )}

        {page === "Dashboard" && (
          <Dashboard 
          username={username}
          onLogout={() => {
            setUsername("")
            setPage("memberLogin")
          }}
          onSelectTopic={handleSelectTopic} />
        )}

        {page === "quiz" && (
          <Quiz topic={selectedTopic}
          username={username}
          onLogout={() => setPage("memberLogin")}
          onBackToDashboard={() => setPage("Dashboard")}  />
        )}
        {page === "AddQuestion" && (
          <AddQuestion onBack={() => setPage("AdminDashboard")} />
        )}
        {page === "ViewQuestions" && (
          <ViewQuestions onBack={() => setPage("AdminDashboard")} />
        )}
        {page === "EditQuestions" && (
          <EditQuestions onBack={() => setPage("AdminDashboard")} />
        )}
        {page === "DeleteQuestions" && (
          <DeleteQuestions onBack={() => setPage("AdminDashboard")} />
        )}
         {page === "signup" && (
  <Signup onSignup={() => setPage("memberLogin")
     
  } 
  onBack={() => setPage("login")}
  />
)}
      </div>
    </div>
  );
}

export default App;
