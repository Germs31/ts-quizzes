import axios from 'axios';
import {useState} from 'react';

// Enum for difficulty
enum Difficulty {
  EASY = "easy",
  MEDIUM="medium",
  Hard="hard"
}

// Types
type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

type QuestionState = Question & {answers: string[]}

type AnswerObject = {
  question: string; 
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

// Total Questions
const TOTAL_QUESTIONS = 10

// Shuffle Answer Function
const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5)

const App = () => {
  // State
  const [loader, setLoader] = useState(false)
  const [gameOver, setGameOver] = useState(true)
  const [score, setScore] = useState(0)
  const [number, setNumber] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswer, setUsetAnswers] = useState<AnswerObject[]>([])
  
  // Functions
  const startGame = async () =>{ 
    try {
      setLoader(true)
      setGameOver(false)
      await axios.get(`https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&difficulty=${Difficulty.EASY}&type=multiple&category=12`)
      .then(res => {
        const newQuestions = res.data.results.map((question: Question) => (
          {
            ...question,
            answers: shuffleArray([...question.incorrect_answers,question.correct_answer])
          }
        ))
        return setQuestions(newQuestions)
      })

      setScore(0)
      setUsetAnswers([])
      setNumber(0)
      setLoader(false)
    } catch (error) {
      throw error
    }
  }
  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      { loader && <div className="loader">Loading...</div>}
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ?<button className="start" onClick={startGame}>Start</button> : null}
    </div>
  );
}

export default App;
