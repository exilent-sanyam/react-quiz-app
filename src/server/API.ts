import axios from 'axios'
import { shuffleArray } from '../utils/util'
import { Difficulty, Question, QuestionsState } from '../types'

export const fetchQuestions = async (
  totalQuestions: number,
  difficulty: Difficulty,
): Promise<QuestionsState[]> => {
  try {
    const URL = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}`
    const response = await axios.get(URL)
    const results = response.data?.results ?? []
    return results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }))
  } catch (error) {
    console.error(error)
    throw error
  }
}
