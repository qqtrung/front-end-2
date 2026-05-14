import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/user/list").then((data) => {
      if (data) {
        setUsers(data);
      }
    });
  }, []);

  return (
    <div className="user-list">
      <Typography variant="body1" className="user-list-title">
        User List
      </Typography>

      <List component="nav">
        {users.map((item) => (
          <ListItem key={item._id} className="user-list-item">
            <ListItemText
              primary={
                <Link
                  to={`/users/${item._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.first_name} {item.last_name}
                </Link>
              }
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                label={item.photoCount || 0}
                sx={{ backgroundColor: "green", color: "white" }}
              />

              <Chip
                label={item.commentCount || 0}
                sx={{ backgroundColor: "red", color: "white" }}
                component={Link}
                to={`/comments/${item._id}`}
                clickable
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
