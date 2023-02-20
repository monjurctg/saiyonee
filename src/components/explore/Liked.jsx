import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import useSWR, {useSWRConfig} from "swr";

import fetcher from "../../utils/fetchData";
import ProfileImage from "../ProfileImage";

function Liked({id}) {
  // const [LikeData, setLikeData] = useState([]);
  // const [loading, setLoading] = useState(false);
  let url = `all_liked/get_liked_by_users_list?is_superlike=${id ?? 0}`;
  const {user} = useSelector((state) => state.auth);

  const {mutate} = useSWRConfig();
  const {
    data: LikeData,
    error: LikeDataError,
    isLoading,
  } = useSWR(url, fetcher);

  console.log(LikeData, isLoading, "like");

  // let getLikeData = async () => {
  //   setLoading(true);
  //   let res = await ExploreServices.getLikeSupperLike(id ?? 0);

  //   if (res.status === 200) {
  //     setLikeData(res.data.liked_by_users);
  //     // console.log(res.data);
  //     setLoading(false);
  //   } else {
  //     console.log(res);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getLikeData();
  // }, []);
  // console.log('LikeData', LikeData)

  let LikeList = (LikeData?.liked_by_users || []).map((ll, index) => {
    return (
      <div className="explore-img" key={index}>
        <div className="cross">
          {" "}
          <img height={15} src="/img/cross.png" alt="" />
        </div>
        <Link to={`/user-info/like/${ll.id}`}>
          {/* {ll?.thumbnail_img ? (
            <img
              src={ll?.thumbnail_img}
              style={{
                height: "80%",
                width: "100%",
                border: "1px solid #cba0a0",
              }}
              alt=""
            />
          ) : (
            <h4 className="no-image">No Image</h4>
          )} */}
          <ProfileImage
            style={{
              height: "80%",
              width: "100%",
              // border: "1px solid #cba0a0",
              objectFit: "cover",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            url={ll?.thumbnail_img_url}
            gender={
              user?.gender?.toLowerCase()?.trim() === "male" ? "female" : "male"
            }
          />

          <h5
            style={{
              fontSize: "14px",
              paddingTop: "10px",

              color: "#000",
              textAlign: "center",
            }}>
            {ll?.full_name}, {ll?.age}
          </h5>
        </Link>
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div
        className="py-4 d-flex flex-wrap"
        style={{
          gap: 0,
          justifyContent:
            LikeList?.length <= 1 ? "space-between" : "space-around",
        }}>
        {isLoading ? (
          <div className="load">Loading...</div>
        ) : LikeList?.length > 0 ? (
          LikeList
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
                color: "#f33",
              }}>
              No data found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Liked;
