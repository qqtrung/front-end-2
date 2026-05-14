import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  let contextText = "";

  if (location.pathname.startsWith('/users/')) {
    const userId = location.pathname.split('/')[2];
    const user = models.userModel(userId);
    if (user) {
      contextText = `${user.first_name} ${user.last_name}`;
    }
  } else if (location.pathname.startsWith('/photos/')) {
    const userId = location.pathname.split('/')[2];
    const user = models.userModel(userId);
    if (user) {
      contextText = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" className="topbar-title">
          Nguyễn Quang Trung - B23DCKH122
        </Typography>
        <Typography variant="h6" className="topbar-context">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
