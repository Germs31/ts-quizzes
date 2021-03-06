import { AnswerObject } from '../App'
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number
}
const QuestionCard: React.FC<Props> = ({question,answers,callback,userAnswer,questionNumber,totalQuestions}) => {
    return (
        <div className="quiz-card">
            <p>Question: {questionNumber}/ {totalQuestions}</p>

            <p>{question}</p>

            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button 
                            disabled={!!userAnswer} 
                            value={answer} 
                            onClick={callback}>
                            {answer}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard
