import React from 'react'
import { useLocation } from 'react-router-dom';
import bg from '../../assets/imgs/bg.svg';

function BasicLayout({children,subItem}) {
let {pathname} = useLocation();
  return (
    <div className="text-center min-vh-100 d-flex flex-column max-width-mobile mx-auto rounded-md-top">
        <div className="position-relative" style={{height: pathname === "/" ? "": "40vh"}}>
          <img
            src={bg}
            alt="bg-star"
            className="img-fluid rounded-md-top rounded-bottom basic-img"
            style={{height: pathname !== "/" && "100%",objectFit:"cover",width:pathname === "/" ? 380 :"100%"}}
          />
        {subItem}
        </div>
        {children}


    </div>
  )
}

export default BasicLayout