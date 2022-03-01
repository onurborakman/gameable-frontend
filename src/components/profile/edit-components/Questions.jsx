import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Questions = (props) => {
    const {handleAddQuestion} = props;
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [questionList, setQuestionList] = useState([]);

    useEffect(()=>{
        getQuestions();
    },[])

    const getQuestions = async() => {
        const data = await axios.get(`https://gameable-api.herokuapp.com/api/personality/all`);
        const questions = await data.data.data;
        setQuestionList(questions);
    }
    const questionOptions = questionList.map(question => <option value={JSON.stringify(question)}>{question.question}</option>)
    const answerOptions = () => selectedQuestion && selectedQuestion.answers.map(answer=><option value={answer}>{answer}</option>)

    const handleQuestionChange = (e) => {
        setSelectedQuestion(JSON.parse(e.target.value));
    }
    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const question = {
            id: selectedQuestion.id,
            question: selectedQuestion.question,
            answers: [selectedAnswer]
        }
        handleAddQuestion(question);
    }
  return (
    <div>
          <select onChange={handleQuestionChange}>
              <option value={''}>Please select a question</option>
              {questionOptions}
          </select>
          {selectedQuestion !== '' &&
              <select onChange={handleAnswerChange}>
                  <option value={''}>Please choose an answer</option>
                  {answerOptions()}
              </select>
          }
          <button onClick={handleSubmit}>Add Question</button>
    </div>
  )
}

export default Questions