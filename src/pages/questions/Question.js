import React, { useEffect, useState } from 'react'
import RegisterLayout from '../../components/layouts/RegisterLayout'
import QuestionServices from '../../services/questionServices'

function Question() {
    const [err, seterr] = useState(null)

    const [question, setquestion] = useState("")

    let getQuestions = async () => {
        let res = await QuestionServices.getQuestions();
        console.log('res', res)
        if (res.status === 200) {
            seterr(false)
            setquestion(res.data.questions)
        } else {
            seterr(res.data.message)
        }
    }
    useEffect(() => {
        getQuestions()
     
    }, [])
    
    const onSubmit = (e) => {
        e.preventDefault()
            
        console.log('data')
    }
  return (
    <RegisterLayout err={err} onContinueClicked={onSubmit}>
        </RegisterLayout>
  )
}

export default Question