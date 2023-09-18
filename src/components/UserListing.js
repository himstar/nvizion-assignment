import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserListing = () => {
  const users = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletingUser, setDeletingUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = () => {
    navigate("/user/add");
  };

  const handleEditUser = (userData) => {
    const userObj = { ...userData };
    userObj["password"] = "";
    navigate("/user/edit", {
      state: userObj,
    });
  };

  const handleDeleteUser = (userId) => {
    setOpen(true);
    setDeletingUser(userId);
  };
  const removeUser = () => {
    if (deletingUser) {
      dispatch(deleteUser(deletingUser));
      setOpen(false);
    }
  };
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "roleKey", headerName: "Role Key", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => handleEditUser(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Grid container sx={{ mt: 5 }}>
        <h2> User Listing </h2>
        <Grid item xs={12}>
          <Button
            sx={{ float: "right", mb: 2 }}
            variant="contained"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <DataGrid rows={users} columns={columns} getRowId={(row) => row.id} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete the user record?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changes cannot be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={removeUser} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserListing;
