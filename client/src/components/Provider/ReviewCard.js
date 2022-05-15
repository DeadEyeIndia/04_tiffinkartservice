import React from "react";
import { Rating } from "@material-ui/lab";
import PersonIcon from "@mui/icons-material/Person";

import "./Providers.css";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="app__reviewCard">
      <div className="app__reviewCard-top">
        <div className="app__reviewCard_userAvatar f-ai-c">
          <PersonIcon
            className="app__reviewCardIcon"
            fontSize="large"
            color="primary"
          />
          <p>{review.name}</p>
        </div>
        <div className="app__reviewCard-rating">
          <Rating {...options} />
        </div>
      </div>
      <div className="app__reviewCard-bottom">{review.comment}</div>
    </div>
  );
};

export default ReviewCard;
