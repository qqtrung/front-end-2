import "./App.css";

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";

const App = (props) => {
  return (
    <Router>
      <div>
        <Grid container spacing={2}>

          /*
            * The top bar is always visible, so we place it outside the Routes component.
            Topbar chiếm 12 cột lên nó sẽ full width của container, còn các phần còn lại sẽ được chia theo tỉ lệ 3:9 (3 cột cho UserList và 9 cột cho UserDetail, UserPhotos, UserComments).

          */

          <Grid item xs={12}>
            <TopBar />
          </Grid>

          <div className="main-topbar-buffer" />

          /*
            Cái thằng này thì chiếm 3 cột nên nó sẽ chiếm 1/4 chiều rộng của container, còn thằng kia chiếm 9 cột nên nó sẽ chiếm 3/4 chiều rộng của container.
          */
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>

          /*
            Cái thằng này thì chiếm 9 cột nên nó sẽ chiếm 3/4 chiều rộng của container, còn thằng kia chiếm 3 cột nên nó sẽ chiếm 1/4 chiều rộng của container.
          */

          /*

            Cách hoạt động như sau 

            12 + 3 + 9 = 24 (tổng số cột trong một grid container)
            
            - TopBar chiếm 12 cột, nên nó sẽ full width của container.
            - UserList chiếm 3 cột, nên nó sẽ chiếm 1/4 chiều rộng của container.
            - UserDetail, UserPhotos, UserComments chiếm 9 cột, nên chúng sẽ chiếm 3/4 chiều rộng của container.

            nếu lớn hơn 12 thì nó sẽ xuống dòng, nếu nhỏ hơn 12 thì nó sẽ nằm trên cùng một dòng. Vì vậy, TopBar sẽ nằm trên cùng một dòng với UserList và UserDetail, UserPhotos, UserComments, nhưng chúng sẽ chiếm toàn bộ chiều rộng của container. Còn UserList và UserDetail, UserPhotos, UserComments sẽ nằm trên cùng một dòng nhưng chúng sẽ chiếm 1/4 và 3/4 chiều rộng của container tương ứng.

          */

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/comments/:userId" element={<UserComments />} />
              </Routes>
            </Paper>
          </Grid>
          
        </Grid>
      </div>
    </Router>
  );
};

export default App;
