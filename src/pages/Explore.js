import React from 'react'
import HomeLayout from '../components/layouts/HomeLayout'

function Explore() {
  return (
    <HomeLayout>
      <div className='container pt-2'>
        <div className='container explore pt-2 text-center'>
          <img src='img/sharmila2.svg' alt=''/>
            <h1 className='pl-2 text-first'> Sharmila</h1>
          <div className='pl-2 d-flex'>
            <p>Student</p>
            <p>Khulna,BD</p>
            <p>Age 24</p>

          </div>
        </div>

      </div>
    </HomeLayout>
  )
}

export default Explore