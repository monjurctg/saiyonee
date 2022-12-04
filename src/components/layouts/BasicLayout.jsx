import React from 'react'
import bg from '../../assets/imgs/bg.svg';

function BasicLayout({children,subItem}) {
  return (
    <div className="text-center min-vh-100 d-flex flex-column max-width-mobile mx-auto rounded-top">
        <div className="position-relative" style={{height: "40vh"}}>
          <img
            src={bg}
            alt="bg-star"
            className="img-fluid w-100 rounded-top"
            style={{height: "100%",objectFit:"cover"}}
          />
        {subItem}
        </div>
        {children}


    </div>
  )
}

export default BasicLayout