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
      console.log(res, "res");
    }
  };

  let shortList = sortListData.map((sl, index) => {
    return (
      <Link to={`/matched-user/${sl.id}/shortList`}>
        <div className="explore-img" key={index}>
          <div className="cross" onClick={() => removeShortList(sl?.id)}>
            X
          </div>
          <img src={sl?.app_user?.thumbnail_img_url} alt="" />
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
        ) : shortList.length > 0 ? (
          shortList
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default Shortlisted;
