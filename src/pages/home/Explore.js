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
  //console.log("search", search);
  const [activeExplore, setactiveExplore] = useState(search);

  const navigate = useNavigate();

  useEffect(() => {
    if (!search) {
      setactiveExplore("?Match-list");
      navigate("/explore?Match-list");
    } else {
      setactiveExplore(search);
    }
    //  navigate('/explore?Match-list')
    // setactiveExplore('?Match-list')
  }, [search, navigate]);

  if (search === "?SuperLiked") activeTab = <SuperLikeList />;
  else if (search === "?Shortlist") activeTab = <Shortlisted />;
  else if (search === "?Match-list" || !search) activeTab = <MatchList />;
  else if (search === "?Liked") activeTab = <Liked />;

  return (
    <HomeLayout
      background={"#fff"}
      search={search}
      activeExplore={activeExplore}
      setactiveExplore={setactiveExplore}>
      <div className="mt-2 mb-5 explore p-4">{activeTab}</div>
    </HomeLayout>
  );
}

export default Explore;
