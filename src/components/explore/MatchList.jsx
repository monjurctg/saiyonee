import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import ExploreServices from "../../services/exploreServices";
import toastMsg from "../../utils/toastify";
import useSWR from "swr";
import {get_match_list} from "../../services/swrApi";
import fetcher from "../../utils/fetchData";

function MatchList() {
  // const [matchData, setMatchData] = useState([]);

  // const [loading, setLoading] = useState(true);
  const {data: matchData, error: matchError} = useSWR(
    "/match_making/get_match_list",
    fetcher
  );
  const loading = !matchData && !matchError;
  console.log(matchData, loading, "matchData");

  // let getShortisted = async () => {
  //   setLoading(true);
  //   let res = await ExploreServices.getMatchUsers();

  //   if (res.status === 200) {
  //     setMatchData(res.data.matched_users);
  //     // console.log(res.data.matched_users, "matched_users");
  //     setLoading(false);
  //   } else {
  //     // console.log(res);
  //     // setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getShortisted();
  // }, []);

  const unmatchHandler = async (id) => {
    let data = new FormData();
    data.append("match_record_id", id);
    const res = await ExploreServices.unMatchUser(data);
    console.log(res, "res from unmatch user ");
    if (res.status === 200) {
      toastMsg.success("unmatched successfully");
      // getShortisted();
    }
  };

  // console.log('matchData', matchData)
  let matchList =
    !loading &&
    matchData?.matched_users?.map((sl, index) => {
      return (
        <div className="explore-img" key={index}>
          <div className="cross" onClick={() => unmatchHandler(sl?.match_id)}>
            <img height={10} src="/img/cross.png" alt="" />
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
        className="py-4 d-flex  flex-wrap"
        style={{
          gap: 0,
          justifyContent:
            matchData?.matched_users.length <= 0
              ? "space-between"
              : "space-around",
        }}>
        {loading ? (
          <div className="load">Loading...</div>
        ) : !loading ? (
          matchList
        ) : (
          <h1 style={{fontSize: 20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default MatchList;
