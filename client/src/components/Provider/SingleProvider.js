import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Rating } from "@material-ui/lab";

import Slider from "./Slider";
import {
  singleProvider,
  clearErrors,
  getAllReviews,
  newReview,
} from "../../actions/providerAction";
import ReviewCard from "./ReviewCard";
import Loader from "../Loader/Loader";
import "./SingleProvider.css";
import "./Providers.css";

const SingleProvider = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { id } = useParams();
  // console.log(id);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { details } = useSelector((state) => state.singleprovider);

  const { loading, reviews, error } = useSelector(
    (state) => state.providerreview
  );

  const options = {
    size: "large",
    value: details.provider?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
    providerId: id,
  });

  const reviewSubmitHandler = () => {
    dispatch(newReview(userReview));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(singleProvider(id));
    dispatch(getAllReviews(id));
  }, [alert, dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {details.success === true && details.provider !== null && (
            <>
              <div className="app__single">
                <div className="app__singleDetails">
                  <div className="app__singleDetails-header">
                    <h1>{details.provider?.nameRest}</h1>
                    <Rating {...options} />
                    <span>
                      {"   "}({details.provider?.numOfReviews} Reviews)
                    </span>
                  </div>

                  <div className="app__singleDetails-imageSlides">
                    <Slider slides={details.provider?.images} />
                  </div>

                  <p>
                    Address: {details.provider?.restLocality}
                    {", "} {details.provider?.addressRest}
                  </p>

                  <p>Phone: {details.provider?.contactNumber}</p>

                  <p>
                    City: {details.provider?.city}
                    {", "}
                    {details.provider?.state}
                  </p>

                  <p>Tiffin type: {details.provider?.tiffinType}</p>

                  <p>Category: {details.provider?.category}</p>

                  <p>Service: {details.provider?.service}</p>

                  <p>
                    One tiffin price:
                    <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
                    {details.provider?.singleprice}
                  </p>

                  <p>
                    A week price:{" "}
                    <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
                    {details.provider?.weeklyprice}
                  </p>

                  <p>
                    A month price:{" "}
                    <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
                    {details.provider?.monthlyprice}
                  </p>
                </div>
                <div className="app__review">
                  {isAuthenticated && (
                    <>
                      <h3 className="app__submitRating-heading">
                        Submit Review
                      </h3>
                      <div className="app__rating">
                        <div className="app__ratingForm">
                          <Rating
                            onChange={(e) =>
                              setUserReview({
                                ...userReview,
                                rating: e.target.value,
                              })
                            }
                            value={Number(userReview.rating)}
                            size="large"
                            className="app__ratingStars"
                          />
                          <textarea
                            className="app__ratingTextArea"
                            cols="30"
                            rows="5"
                            value={userReview.comment}
                            onChange={(e) =>
                              setUserReview({
                                ...userReview,
                                comment: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <div
                          className="app__ratingActions f-c-c"
                          onClick={reviewSubmitHandler}
                        >
                          Submit
                        </div>
                      </div>
                    </>
                  )}
                  <h3 className="app__reviewHeading">Reviews</h3>
                  {reviews && reviews[0] ? (
                    <div className="app__reviews">
                      {reviews &&
                        reviews.map((review) => (
                          <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                  ) : (
                    <p className="app__noReviews">No Reviews Yet</p>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SingleProvider;
