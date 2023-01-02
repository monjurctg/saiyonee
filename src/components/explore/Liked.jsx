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

  let LikeList = LikeData.map((ll, index) => {
    return (
      <Link to={`/user-info/liked/${ll.id}/${ll?.app_user?.id}`} key={index}>
        <div className="explore-img">
          <div className="cross">X</div>
          <img src={ll?.app_user?.thumbnail_img_url} alt="" />
        </div>
      </Link>
    );
  });

  return (
    <div className="mt-4">
      <div
        className="pt-4 d-flex justify-content-around flex-wrap"
        style={{gap: 10}}>
        {loading ? (
          <h1>Loading...</h1>
        ) : LikeList.length > 0 ? (
          LikeList
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default Liked;
