import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Liked from "../../components/explore/Liked";
import MatchList from "../../components/explore/MatchList";
import Shortlisted from "../../components/explore/Shortlisted";
import SuperLikeList from "../../components/explore/Visited";
import HomeLayout from "../../components/layouts/HomeLayout";

function Explore() {
  let activeTab = "";
  const {search} = useLocation();
  const [activeExplore, setactiveExplore] = useState(search);
  console.log(search, "route");
  // const navigate = useNavigate();

  // useEffect(() => {
  //  navigate('/explore?Match-list')
  // }, [])
  

  if (search === "?SuperLiked") activeTab = <SuperLikeList />;
  else if (search === "?Shortlist") activeTab = <Shortlisted />;
  else if (search === "?Match-list") activeTab = <MatchList />;
  else if (search === "?Liked") activeTab = <Liked />;

  return (
    <HomeLayout
      background={"#fff"}
      activeExplore={activeExplore}
      setactiveExplore={setactiveExplore}>
      <div className="mt-2 mb-5 explore p-4">{activeTab}</div>
    </HomeLayout>
  );
}

export default Explore;
