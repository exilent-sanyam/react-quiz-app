import React from 'react'
import { AnswerState } from '../App'

type Props = {
  question: string
  answers: string[]
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerState | undefined
  questionNo: number
  totalQuestions: number
}

const QuestionCard: React.FunctionComponent<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}) => (
  <div>
    <p className='number'>
      Question: {questionNo} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map(answer => (
        <div key={answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default QuestionCard
