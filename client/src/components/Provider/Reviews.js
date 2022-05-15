import React from "react";
import { useSelector } from "react-redux";

import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const { details } = useSelector((state) => state.providerDetails);

  return (
    <>
      {details.success === false && details.provider === null ? (
        <h2 className="app__registerHeader">
          You have not add your Tiffin services
        </h2>
      ) : details.provider?.numOfReviews === 0 ? (
        <>
          <h2>You don't have any feedback on your Tiffin service</h2>
        </>
      ) : (
        <>
          <h2 className="app__userReviews">User Reviews</h2>
          <div className="app__providerReviews">
            {details.provider?.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Reviews;
