import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRole } from "../redux/roleSlice";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const RoleListing = () => {
  const roles = useSelector((state) => state.role);
  const navigate = useNavigate();
  const [deletingRole, setDeletingRole] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleAddRole = () => {
    navigate("/role/add");
  };

  const handleEditRole = (roleData) => {
    navigate("/role/edit", {
      state: roleData,
    });
  };

  const handleDeleteRole = (roleId) => {
    setOpen(true);
    setDeletingRole(roleId);
  };
  const removeRole = () => {
    if (deletingRole) {
      if (deletingRole === "434343") {
        alert("You can't delete a default role!");
        setOpen(false);
        return false;
      }
      dispatch(deleteRole(deletingRole));
      setOpen(false);
    }
  };
  const columns = [
    { field: "roleLabel", headerName: "Role Label", flex: 1 },
    { field: "roleKey", headerName: "Role Key", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => handleEditRole(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRole(params.row.id)}
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
        <h2>Role Listing</h2>
        <Grid item xs={12}>
          <Button
            sx={{ float: "right", mb: 2 }}
            variant="contained"
            onClick={handleAddRole}
          >
            Add Role
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid rows={roles} columns={columns} getRowId={(row) => row.id} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete the role record?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changes cannot be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={removeRole} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleListing;
