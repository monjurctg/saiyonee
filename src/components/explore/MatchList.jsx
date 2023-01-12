import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import ExploreServices from "../../services/exploreServices";

function MatchList() {
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(false);

  let getShortisted = async () => {
    setLoading(true);
    let res = await ExploreServices.getMatchUsers();

    if (res.status === 200) {
      setMatchData(res.data.matched_users);
      // console.log(res.data.matched_users, "matched_users");
      setLoading(false);
    } else {
      // console.log(res);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getShortisted();
  }, []);

  // console.log('matchData', matchData)
  let matchList = matchData.map((sl, index) => {
    return (
      <div className="explore-img" key={index}>
        <div className="cross">X</div>
        <Link key={index} to={`/user-info/match/${sl?.id}/${sl?.app_user?.id}`}>
          {sl?.thumbnail_img_url ? (
            <img src={sl?.thumbnail_img_url} alt="" />
          ) : (
            <h4 className="no-image">No Image</h4>
          )}
        </Link>

        <h5 className="no-image-h5">
          {sl?.display_name}, {sl?.age}
        </h5>
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div className="py-4 d-flex flex-wrap" style={{gap: 10}}>
        {loading ? (
          <div className="load">Loading...</div>
        ) : matchList.length > 0 ? (
          matchList
        ) : (
          <h1 style={{fontSize:20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default MatchList;
