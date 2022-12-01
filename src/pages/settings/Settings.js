import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../../components/layouts/HomeLayout';
import QuestionServices from '../../services/questionServices';
import UserServices from '../../services/userServices';

import "./../../assets/css/settingsStyle.scss";

const Settings = () => {

    const [profile, setprofile] = useState()

    const Navigate = useNavigate();

    let userProfile = async () => {
        let res = await UserServices.UserProfile();
        console.log("res", res.data);
        if (res.status === 200) {
            setprofile(res.data);

        }
    }
    useEffect(() => {
      userProfile();
    }, [])
    
    return (
        <HomeLayout>

            <div className='mt-3'>

                <div>
                    <div className='d-flex justify-content-between align-items-center settings' style={{
                        flexDirection:"column"
                    }}>
                        <div className='rounded-img'>
                            <img src={"img/pp.png"} alt=""/>
                        </div>

                        <h2 className='mt-4'>{profile?.full_name}</h2>

                        <div className='complete'>
                            <p>Complete my profile</p>
                        </div>
                    </div>

                    <div className='buttons'>
                        <button className='com-btn'>
                            View profile
                        </button>
                        <Link to={"/edit/profile"}>
                        <button className='edit-btn'>
                            Edit profile
                        </button>
                        </Link>

                    </div>
                </div>

            </div>
         
        </HomeLayout>
    )
}

export default Settings
