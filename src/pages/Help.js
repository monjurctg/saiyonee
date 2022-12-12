import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../components/layouts/BasicLayout";

function Help() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(null);
  // console.log('err', err?.message)

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  let subItem = (
    <div
      className="position-absolute d-flex flex-column justify-content-center align-items-center position-top mt-6"
      onClick={() => navigate(-1)}
    >
      {/* <LinkLogo /> */}
      {/* <Link to={"/"}> */}
      <img src="img/logo.svg" alt="" />
      {/* </Link> */}
    </div>
  );
  return (
    <BasicLayout subItem={subItem}>
      <div
        className="card border-0  bg-transparent flex-grow-1"
        style={{ height: "40vh", marginTop: "-55px" }}
      >
        <div className="card-body bg-body rounded p-3">
          <h1
            className="card-title mt-3 mb-4"
            style={{
              fontFamily: "Inter",
            }}
          >
            Facing any issues? <br /> Need Help!!.
          </h1>
          <p
            style={{
              fontWeight: 400,
              fontSize: 16,
              color: "#6B7280",
            }}
          >
            Fill this up with your issue in the query.
          </p>
          <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "name" ? "2px solid red" : "",
            }}
          >
            <input
              type="text"
              id="inputEmail"
              value={name}
              name="name"
              onFocus={() => setErr({})}
              onChange={onChange}
              className="form-control border-0 rounded-1"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              style={{
                textAlign: "left",
              }}
            >
              Name
            </label>
          </div>
          <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "email" ? "2px solid red" : "",
            }}
          >
            <input
              type="email"
              id="inputEmail"
              value={email}
              name="email"
              onFocus={() => setErr({})}
              onChange={onChange}
              className="form-control border-0 rounded-1"
              placeholder="Email address"
              aria-describedby="email"
            />
            <label
              htmlFor="inputEmail"
              style={{
                textAlign: "left",
              }}
            >
              Email Address
            </label>
          </div>
          <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "email" ? "2px solid red" : "",
            }}
          >
            <textarea
              cols={"30"}
              rows={"5"}
              id="inputArea"
              value={email}
              name="email"
              onFocus={() => setErr({})}
              onChange={onChange}
              className="form-control border-0 rounded-1"
              placeholder="Write your query"
              aria-describedby="email"
            />
            <label
              htmlFor="inputArea"
              style={{
                textAlign: "left",
              }}
            >
              Write your query
            </label>
          </div>

          <div className="container px-4 pb-4 pt-2" style={{height: "20vh"}}>
          {err?.error  && <p className="text-primary">* {err?.message}</p>}
          <button
            // onClick={handleSubmit}
            disabled={
              loading
              // status === FetchStatus.LOADING ||
              // verifyingPreviousLogin ||
              // isPrefetchingForms
            }
            className="btn btn-primary w-100 rounded shadow p-3 my-2">
            <strong>Submit query </strong>
            {
              // (status === FetchStatus.LOADING ||
              // verifyingPreviousLogin ||
              //   isPrefetchingForms)
              loading && (
                <>
                  <i
                    className="spinner-border spinner-border-sm text-black"
                    role="status"
                    aria-hidden="true"></i>
                  <i className="visually-hidden">Loading...</i>
                </>
              )
            }
          </button>
        </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default Help;
