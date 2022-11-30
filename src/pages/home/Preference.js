import React, { useState } from 'react'
import QuestionLayout from '../../components/layouts/QuestionLayout'

function Preference() {
    const [err, seterr] = useState(false)
  return (
    <QuestionLayout title="Set your Preference" err={err}>

        <div className='preference my-3'>
            <div className='preference-gender mb-3'>
                <h5>Gender</h5>
                <div>
                    <button>Male</button>
                    <button>Female</button>

                </div>
            </div>
            <div className='preference-gender mb-3'>
                <h5>Age</h5>
                <div>
                    <button>To</button>
                    <input type={'date'} />
                    <button>From</button>
                    <input type={'date'} />


                </div>
            </div>

        </div>
    </QuestionLayout>
  )
}

export default Preference