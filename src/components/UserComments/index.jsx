import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
import images from "../../images";
import "./styles.css";

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchModel(`/comment/${userId}`).then((data) => {
      if (data) {
        console.log(data);
        setComments(data);
      }
    });
  }, [userId]);

  return (
    <div className="user-comments-container">
      <Typography variant="h5" className="user-comments-title">
        User Comments
      </Typography>

      {comments.map((cmt) => (
        <Card key={cmt._id} className="comment-card">
          <Link to={`/photos/${cmt.photo._id}`}>
            <CardMedia
              component="img"
              height="150"
              image={images[cmt.photo.file_name]}
              alt="photo"
              className="comment-image"
            />
          </Link>

          <CardContent className="comment-content">
            <Typography className="comment-text">{cmt.comment}</Typography>

            <Typography className="comment-date">
              {new Date(cmt.date_time).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserComments;
