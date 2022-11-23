import React from "react";

function RegSuccess() {
  return (
    <>
      <div className="text-center min-vh-100 max-width-mobile mx-auto">
        <img
          src="/img/congrats-bg.svg"
          alt="bg-star"
          className="img-fluid w-100 rounded-top"
        />
        <div className="container px-4">
          <div className="row">
            <div className="col">
              <div className="card border-0 mt-n8 bg-transparent rounded shadow">
                <div className="card-body bg-white rounded px-4 py-5">
                  <h1 className="card-title">
                    Congratulation! Register Success
                  </h1>
                  <p className="card-text text-muted">
                    Your informations are being verified now
                  </p>
                </div>
              </div>
              <button className="btn btn-primary w-100 rounded shadow p-3 my-4">
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegSuccess;
