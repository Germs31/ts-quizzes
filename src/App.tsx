import axios from 'axios';
import {useState} from 'react';

// Enum for difficulty
enum Difficulty {
  EASY = "easy",
  MEDIUM="medium",
  Hard="hard"
}

// Types
type QuestionState = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  answers: string[]
}

type AnswerObject = {
  question: string; 
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

// Total Questions
const TOTAL_QUESTIONS = 10

const App = () => {
  const [loader, setLoader] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [number, setNumber] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswer, setUsetAnswers] = useState<AnswerObject[]>([])
  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <div className="loader">Loading...</div>
      <button className="start">Start</button>
      <button className="next">Next Question</button>
    </div>
  );
}

export default App;
