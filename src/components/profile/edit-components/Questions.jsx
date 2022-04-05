import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Questions = (props) => {
    //Props
    const {handleAddQuestion, questions} = props;
    //States
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [questionList, setQuestionList] = useState([]);
    const [checkout, setCheckout] = useState(questions || []);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        getQuestions();
        setCheckout(questions)
    },[questions])
    //Function to get the list of questions
    const getQuestions = async() => {
        const data = await axios.get(`https://gameable-api.herokuapp.com/api/personality/all`);
        const questionsList = await data.data.data;
        setQuestionList(questionsList);
    }
    //Create the questions as options for dropdown
    const questionOptions = questionList.map(question => <option value={JSON.stringify(question)} key={JSON.stringify(question)
}>{question.question}</option>)
    //Depending on the selected question get the answers
    const answerOptions = () => selectedQuestion && selectedQuestion.answers.map(answer=><option value={answer} key={answer}>{answer}</option>)
    //Handle changes and update the states
    const handleQuestionChange = (e) => {
        setSelectedQuestion(JSON.parse(e.target.value));
    }
    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    }
    //Handle Submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const question = {
            id: selectedQuestion.id,
            question: selectedQuestion.question,
            answers: [selectedAnswer]
        }
        if(checkout.filter(e=>e.question===question.question).length === 0){
            setCheckout([...checkout, question]);
            handleAddQuestion(question);
            setMessage('')
        }else{
            setMessage('Question has already been added. Please select a different question');
        }
    }
  return (
    <div className='question-selection-box'>
        {message && <p>{message}</p>}
          <select onChange={handleQuestionChange} defaultValue={''}>
              <option value={''} selected disabled hidden key={''}>Please select a question</option>
              {questionOptions}
          </select>
          {selectedQuestion !== '' &&
              <select onChange={handleAnswerChange} defaultValue={''}>
                  <option value={''} selected disabled hidden key={''}>Please choose an answer</option>
                  {answerOptions()}
              </select>
          }
          <button onClick={handleSubmit} className='button' disabled={!selectedAnswer && "disabled"}><span>Add</span></button>
    </div>
  )
}

export default Questions