import React, {useEffect, useState} from "react";

import ExploreServices from "../../services/exploreServices";

function MatchList() {
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(false);

  let getShortisted = async () => {
    setLoading(true);
    let res = await ExploreServices.getMatchUsers();

    if (res.status === 200) {
      setMatchData(res.data.matched_users);
      console.log(res.data.matched_users, "matched_users");
      setLoading(false);
    } else {
      // console.log(res);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getShortisted();
  }, []);

  let matchList = matchData.map((sl, index) => {
    return (
      <>
        <div className="explore-img" key={index}>
          <div className="cross">X</div>
          <img src={sl?.app_user?.thumbnail_img_url} alt="" />
        </div>
      </>
    );
  });

  return (
    <div className="mt-2">
      <div
        className="pt-4 d-flex flex-wrap"
        style={{gap: 10}}>
        {loading ? (
          <h1>Loading...</h1>
        ) : matchList.length > 0 ? (
          matchList
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default MatchList;
