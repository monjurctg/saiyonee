import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AiOutlineDelete} from "react-icons/ai";
import ExploreServices from "../../services/exploreServices";
import toastMsg from "../../utils/toastify";
import useSWR, {useSWRConfig} from "swr";
import {get_match_list} from "../../services/swrApi";
import fetcher from "../../utils/fetchData";
import {useSelector} from "react-redux";
import ProfileImage from "../ProfileImage";

function MatchList() {
  const {user} = useSelector((state) => state.auth);
  const {mutate} = useSWRConfig();
  const {
    data: matchData,
    error: matchError,
    isLoading,
  } = useSWR("/match_making/get_match_list", fetcher);

  let matchList =
    !isLoading &&
    matchData?.matched_users?.map((sl, index) => {
      return (
        <div className="explore-img" key={index}>
          {/* <div className="cross" onClick={() => unmatchHandler(sl?.match_id)}>
            <img height={10} src="/img/cross.png" alt="" />
           
          </div> */}

          <Link to={`/user-info/match/${sl?.id}`}>
            {/* {sl?.thumbnail_img_url ? (
              <img
                src={sl?.thumbnail_img_url}
                alt=""
              
            ) : (
              <h4 className="no-image">No Image</h4>
            )}  */}
            <ProfileImage
              style={{
                height: "80%",
                width: "100%",
                // border: "1px solid #cba0a0",
                objectFit: "cover",
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              url={sl?.thumbnail_img_url}
              gender={
                user?.gender?.toLowerCase()?.trim() === "male"
                  ? "female"
                  : "male"
              }
            />
            <h5
              style={{
                fontSize: "14px",
                paddingTop: "10px",

                color: "#000",
                textAlign: "center",
                fontWeight: 600,
                fontStyle: "oblique",
                textTransform: "capitalize",
                paddingBottom: "10px",
              }}>
              {sl?.display_name?.slice(0, 15)}, {sl?.age}
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
            matchData?.matched_users.length > 1 ? "space-between" : "",
        }}>
        {isLoading ? (
          <div className="load">Loading...</div>
        ) : matchData?.matched_users.length > 0 ? (
          matchList
        ) : (
          <div
            style={{
              minHeight: "30vh",
              display: "flex",
              alignItems: "center",
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
              justifyContent: "center",
            }}>
            <h1
              style={{
                fontSize: 20,

                border: "1px solid #dee2e6",
                color: "#ffb7ac",
                padding: 10,
                width: "100%",
                textAlign: "center",
              }}>
              No data found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchList;
