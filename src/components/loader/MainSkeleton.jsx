import React from 'react';

function MainSkeleton() {
  return (
    <div className="main-skeleton">
      <div className="skeleton-animation" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <h5>Loading..</h5>
      </div>
    </div>
  );
}

export default MainSkeleton;
