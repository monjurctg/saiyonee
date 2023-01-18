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
      <div className="explore-img">
        <div className="cross">X</div>
        <Link to={`/user-info/like/${ll.id}/${ll?.app_user?.id}`} key={index}>
          {ll?.thumbnail_img ? (
            <img src={ll?.thumbnail_img} alt="" />
          ) : (
            <h4 className="no-image">No Image</h4>
          )}
        </Link>

        <h5 className="no-image-h5">
          {ll?.full_name}, {ll?.age}
        </h5>
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div className="py-4 d-flex flex-wrap" style={{gap: 10}}>
        {loading ? (
          <div className="load">Loading...</div>
        ) : LikeList.length > 0 ? (
          LikeList
        ) : (
          <h1 style={{fontSize:20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default Liked;
