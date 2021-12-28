import axios from 'axios';
import {useState} from 'react';
// Components
import QuestionCard from './components/QuestionCard'

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
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  
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
      setUserAnswers([])
      setNumber(0)
      setLoader(false)
    } catch (error) {
      throw error
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      // user answer
      const answer = e.currentTarget.value

      // check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // add score is answer is correct
      if(correct) setScore((prev) => prev +1)
      // save answer in array fro user answers 
      const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
      // Move to next questino of not the last
      const nextQuestion = number + 1
      if(nextQuestion === TOTAL_QUESTIONS){
          setGameOver(true)
      } else {
          setNumber(nextQuestion)
      }
  }
  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      { loader && <div className="loader">Loading...</div>}

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?<button className="start" onClick={startGame}>Start</button> : null}

      {!gameOver ? <p>Score: {score}</p> : null}

      <div className="question-card-container">
        {!gameOver && !loader && (
            <QuestionCard 
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            />
          )
        }

        {!gameOver && !loader && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1
          ? 
          (                    <button className="next" onClick={nextQuestion}>Next Question</button>)
          :null
        }
      </div>
    </div>
  );
}

export default App;
