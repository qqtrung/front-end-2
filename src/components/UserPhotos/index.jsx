import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import images from "../../images";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchModel(`/photo/${userId}`),
      fetchModel(`/user/${userId}`),
    ]).then(([photosData, userData]) => {
      setPhotos(photosData || []);
      setUser(userData);
    });
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <div className="user-photos">
      <Typography variant="h4" className="user-photos-title">
        Photos of {user.first_name} {user.last_name}
      </Typography>
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia
            component="img"
            className="photo-image"
            image={images[photo.file_name]}
            alt="Photo"
          />
          <CardContent>
            <Typography variant="body2" className="photo-date">
              {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Typography variant="h6" className="comments-title">
              Comments:
            </Typography>
            {photo.comments &&
              photo.comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <Typography variant="body2" className="comment-header">
                    <Link
                      to={`/users/${comment.user._id}`}
                      className="comment-user-link"
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>{" "}
                    - {new Date(comment.date_time).toLocaleString()}
                  </Typography>
                  <Typography variant="body1" className="comment-text">
                    {comment.comment}
                  </Typography>
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
