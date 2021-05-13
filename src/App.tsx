import React, { useState } from 'react'
import { Difficulty, QuestionsState } from './types'
import { fetchQuestions } from './data-loader/API'
import QuestionCard from './components/QuestionCard/QuestionCard'
import { GlobalStyle, Wrapper } from './App.styles'
import Loader from 'react-loader-spinner'
import Restart from './components/Restart/Restart'
import { RestartButtonWrapper } from './components/Restart/Restart.syles'
import Confetti from 'react-confetti'

export type AnswerState = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10
const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [userAnswer, setUserAnswer] = useState<AnswerState[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)
    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(questions)
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) setScore(prevState => prevState + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswer(prev => [...prev, answerObject])
    }
  }

  const startOverAgain = async () => {
    await startQuiz()
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  const { height, width } = getWindowDimensions()

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else setNumber(nextQuestion)
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper className='App'>
        <h1>Quiz</h1>
        {gameOver && userAnswer.length === 0 ? (
          <button className='start' onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameOver && userAnswer.length === TOTAL_QUESTIONS ? (
          <RestartButtonWrapper>
            <Restart onClick={startOverAgain} />
          </RestartButtonWrapper>
        ) : null}
        {!gameOver && userAnswer.length === TOTAL_QUESTIONS ? (
          <Confetti width={width} height={height} />
        ) : null}
        {!gameOver && <p className='score'>Score:{score}</p>}
        {loading ? (
          <Loader type='ThreeDots' color='#00BFFF' height={80} width={80} />
        ) : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : undefined}
      </Wrapper>
    </>
  )
}

export default App
