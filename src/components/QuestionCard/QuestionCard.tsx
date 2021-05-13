import React from 'react'
import { AnswerState } from '../../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'

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
  <Wrapper>
    <p className='number'>
      Question: {questionNo} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map(answer => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
)

export default QuestionCard
