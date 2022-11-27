import React from 'react'

function BasicLayout({children}) {
  return (
    <div className="text-center min-vh-100 d-flex flex-column max-width-mobile mx-auto rounded-top">
       
        {children}


    </div>
  )
}

export default BasicLayout