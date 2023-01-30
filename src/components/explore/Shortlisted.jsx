import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ExploreServices from "../../services/exploreServices";
import toastMsg from "../../utils/toastify";

function Shortlisted() {
  const [sortListData, setSortListData] = useState([]);
  const [loading, setLoading] = useState(false);

  let getShortisted = async () => {
    setLoading(true);
    let res = await ExploreServices.getShortList();

    if (res.status === 200) {
      setSortListData(res.data.shortlisted_users);
      // console.log(res.data);
      setLoading(false);
    } else {
      // console.log(res);
      // setLoading(false);
    }
  };

  useEffect(() => {
    getShortisted();
  }, []);

  const removeShortList = async (id) => {
    console.log("click");
    let data = new FormData();

    data.append("shortlist_id", id);

    const res = await ExploreServices.removeFromShortList(data);
    if (res.status === 200) {
      toastMsg.success(res.data.message);

      getShortisted();
    } else {
      // console.log(res, "res");
    }
  };
  // console.log('first', sortListData)
  let shortList = sortListData.map((sl, index) => {
    return (
      <div className="explore-img" key={index}>
        <div className="cross" onClick={() => removeShortList(sl?.id)}>
          <img
            height={15}
            src="https://icon-library.com/images/delete-icon-png/delete-icon-png-19.jpg"
            alt=""
          />
        </div>
        <Link to={`/user-info/shortList/${sl.id}/${sl.app_user.id}`}>
          {sl?.app_user?.thumbnail_img_url ? (
            <img src={sl?.app_user?.thumbnail_img_url} alt="" />
          ) : (
            <h4 className="no-image">No Image</h4>
          )}
        </Link>

        <h5 className="no-image-h5">
          {sl?.app_user?.full_name},{sl?.app_user?.age}
        </h5>
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div className="py-4 d-flex flex-wrap" style={{gap: 10}}>
        {loading ? (
          <div className="load">Loading...</div>
        ) : shortList.length > 0 ? (
          shortList
        ) : (
          <h1 style={{fontSize: 20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default Shortlisted;
