import React from 'react'

function BasicLayout({children,subItem}) {
  return (
    <div className="text-center min-vh-100 d-flex flex-column max-width-mobile mx-auto rounded-top">
        <div className="position-relative">
          <img
            src="/img/bg.svg"
            alt="bg-star"
            className="img-fluid w-100 rounded-top"
          />
        {subItem}
        </div>
        {children}


    </div>
  )
}

export default BasicLayout