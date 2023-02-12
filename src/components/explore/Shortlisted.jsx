import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useSWR, {useSWRConfig} from "swr";
import ExploreServices from "../../services/exploreServices";
import fetcher from "../../utils/fetchData";
import toastMsg from "../../utils/toastify";

function Shortlisted() {
  // const [sortListData, setSortListData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const {mutate} = useSWRConfig();
  const {
    data: sortListData,
    error: shortListError,
    isLoading,
  } = useSWR("/shortlist/get_shortlist_users", fetcher);

  // let getShortisted = async () => {
  //   setLoading(true);
  //   let res = await ExploreServices.getShortList();

  //   if (res.status === 200) {
  //     setSortListData(res.data.shortlisted_users);
  //     // console.log(res.data);
  //     setLoading(false);
  //   } else {
  //     // console.log(res);
  //     // setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getShortisted();
  // }, []);

  const removeShortList = async (id) => {
    console.log("click");
    let data = new FormData();

    data.append("shortlist_id", id);

    const res = await ExploreServices.removeFromShortList(data);
    if (res.status === 200) {
      toastMsg.success(res.data.message);

      // getShortisted();
      mutate("/shortlist/get_shortlist_users");
    } else {
      // console.log(res, "res");
    }
  };
  console.log("first", sortListData);
  let shortList = (sortListData?.shortlisted_users || []).map((sl, index) => {
    return (
      <div className="explore-img" key={index}>
        <div className="cross" onClick={() => removeShortList(sl?.id)}>
          <img height={15} src="/img/cross.png" alt="" />
        </div>

        <Link to={`/user-info/shortList/${sl?.app_user?.id}`}>
          {sl?.app_user.thumbnail_img_url ? (
            <img
              src={sl?.app_user?.thumbnail_img_url}
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
            {sl?.app_user.display_name}, {sl?.app_user.age}
          </h5>
        </Link>
        {/* <Link to={`/user-info/shortList/${sl.id}/${sl.app_user.id}`}>
          {sl?.app_user?.thumbnail_img_url ? (
            <img src={sl?.app_user?.thumbnail_img_url} alt="" />
          ) : (
            <h4 className="no-image">No Image</h4>
          )}
        </Link> */}
        {/* 
        <h5 className="no-image-h5">
          {sl?.app_user?.full_name},{sl?.app_user?.age}
        </h5> */}
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div
        className="py-4  d-flex flex-wrap"
        style={{
          gap: 0,
          justifyContent:
            sortListData?.shortlisted_users?.length <= 1
              ? "space-between"
              : "space-around",
        }}>
        {isLoading ? (
          <div className="load">Loading...</div>
        ) : shortList?.length > 0 ? (
          shortList
        ) : (
          <h1 style={{fontSize: 20}}>No data found</h1>
        )}
      </div>
    </div>
  );
}

export default Shortlisted;
