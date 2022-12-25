import React, {useState} from "react";
import Liked from "../../components/explore/Liked";
import MatchList from "../../components/explore/MatchList";
import Shortlisted from "../../components/explore/Shortlisted";
import Visited from "../../components/explore/Visited";
import HomeLayout from "../../components/layouts/HomeLayout";

function Explore() {
  const [activeExplore, setactiveExplore] = useState("Superliked list");
  let activeTab = "";
  if (activeExplore === "Superliked list") activeTab = <Visited />;
  else if (activeExplore === "Shortlist") activeTab = <Shortlisted />;
  else if (activeExplore === "Matched list") activeTab = <MatchList />;
  else if (activeExplore === "Liked") activeTab = <Liked />;

  return (
    <HomeLayout
      background={"#fff"}
      activeExplore={activeExplore}
      setactiveExplore={setactiveExplore}>
      <div className="mt-2 explore">{activeTab}</div>
    </HomeLayout>
  );
}

export default Explore;
