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
        <div className="cross">
          <img height={15} src="/img/delete3.png" alt="" />
        </div>

        <Link to={`/user-info/match/${sl?.id}/${sl?.app_user?.id}`}>
          {sl?.thumbnail_img_url ? (
            <img
              src={sl?.thumbnail_img_url}
              alt=""
              style={{
                height: "80%",
                width: "100%",
                border: "1px solid #cba0a0",
              }}
            />
          ) : (
            <h4 className="no-image">No Image</h4>
          )}
          <h5
            style={{
              fontSize: "14px",
              paddingTop: "10px",

              color: "#000",
              textAlign: "center",
            }}>
            {sl?.display_name}, {sl?.age}
          </h5>
        </Link>
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div
        className="py-4 d-flex justify-contetn-center flex-wrap"
        style={{gap: 10, justifyContent: "center"}}>
        {loading ? (
          <div className="load">Loading...</div>
        ) : matchList.length > 0 ? (
          matchList
        ) : (
          <h1 style={{fontSize: 20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default MatchList;
