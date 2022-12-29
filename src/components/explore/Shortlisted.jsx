import React, {useEffect, useState} from "react";
import ExploreServices from "../../services/exploreServices";

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

  let shortList = sortListData.map((sl, index) => {
    return (
      <>
        <div className="explore-img" key={index}>
          <div className="cross">X</div>
          <img src={sl?.app_user?.thumbnail_img_url} alt="" />
        </div>
      </>
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
