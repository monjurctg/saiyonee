import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ExploreServices from "../../services/exploreServices";

function Liked({id}) {
  const [LikeData, setLikeData] = useState([]);
  const [loading, setLoading] = useState(false);

  let getLikeData = async () => {
    setLoading(true);
    let res = await ExploreServices.getLikeSupperLike(id ?? 0);

    if (res.status === 200) {
      setLikeData(res.data.liked_by_users);
      // console.log(res.data);
      setLoading(false);
    } else {
      console.log(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLikeData();
  }, []);
  // console.log('LikeData', LikeData)
  let LikeList = LikeData.map((ll, index) => {
    return (
      <div className="explore-img" key={index}>
        <div className="cross">
          {" "}
          <img height={15} src="/img/delete3.png" alt="" />
        </div>
        <Link to={`/user-info/like/${ll.id}/${ll?.app_user?.id}`}>
          {ll?.thumbnail_img ? (
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
          )}

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
        style={{gap: 10, justifyContent: "center"}}>
        {loading ? (
          <div className="load">Loading...</div>
        ) : LikeList.length > 0 ? (
          LikeList
        ) : (
          <h1 style={{fontSize: 20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default Liked;
