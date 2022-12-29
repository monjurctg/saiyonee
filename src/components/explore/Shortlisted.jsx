import React, { useEffect } from 'react'
import ExploreServices from '../../services/exploreServices'

function Shortlisted() {
  let getShortisted = async() => {
    let res = await ExploreServices.getShortList()
    console.log('res', res)
  }

  useEffect(() => {
    getShortisted()
  }, [])
  
  return (
    <div>Shortlisted</div>
  )
}

export default Shortlisted