// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { Container } from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import store from "./redux/store";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import RoleForm from "./components/RoleForm";

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Box sx={{ display: "flex" }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Logo
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="user/:routeType" element={<UserForm />} />
              <Route path="role/:routeType" element={<RoleForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}

export default App;
