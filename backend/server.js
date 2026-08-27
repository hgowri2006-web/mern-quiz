import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Question from "./models/Questions.js";
import QuizSession from "./models/QuizSession.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js";
import QuizResult from "./models/QuizResult.js";
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/quiz_portal")
 .then(() => console.log("Mongodb connected"))
 .catch((error) => console.log(error));

app.get("/", (req,res) => {
    res.send("Quiz Portal backend is running");
});

app.get("/questions", async (req,res) => {
  try {
    const category = req.query.category;
    let questions;
    if (category) {
     questions= await Question.find({ category: category }); 
     }else{
      questions = await Question.find();
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/questions",async (req,res) => {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.json(newQuestion);
     
})
app.post("/quiz/start", async (req, res) => {
    const startTime = new Date();
    const expiresAt = new Date(startTime.getTime() + 2 * 60 * 1000);
    const session  = await QuizSession.create({ startTime, expiresAt});
    res.json({ sessionId: session._id,
        expiresAt: session.expiresAt
    });
})
app.post("/quiz/answer", async (req, res) => {
  try {
    const { sessionId, questionId, answer } = req.body;

    const session = await QuizSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Quiz session not found"
      });
    }

    // Server-side timer check
    if (Date.now() >= new Date(session.expiresAt).getTime()) {
      return res.status(403).json({
        message: "Quiz time has expired"
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    const correct = answer === question.answer;

    res.json({
      correct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.post("/quiz/result", async (req, res) => {
  try {
    const {
      username,
      sessionId,
      topic,
      score,
      totalQuestions,
      tabSwitches
    } = req.body;

    const percentage = Math.round(
      (score / totalQuestions) * 100
    );

    const result = await QuizResult.create({
      username,
      sessionId,
      topic,
      score,
      totalQuestions,
      percentage,
      tabSwitches
    });

    res.json({
      message: "Quiz result saved",
      result
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.get("/quiz/results/:username", async (req, res) => {
  try {
    const results = await QuizResult.find({
      username: req.params.username
    }).sort({ completedAt: -1 });

    res.json(results);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
 app.put("/questions/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.delete("/questions/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(
      req.params.id
    );
if (!deletedQuestion) {
      return res.status(404).json({
        message: "Question not found"
      });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
 app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    res.json({
      message: "Login successful",
       username: user.username
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
  
 
app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    res.json({
      message: "Admin login successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.listen(8080,() => {
    console.log("Server is running on port 8080");
});
