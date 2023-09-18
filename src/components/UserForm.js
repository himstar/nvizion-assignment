import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, editUser } from "../redux/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  marginTop: "25px",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string().required("Mobile is required"),
  username: Yup.string().required("Username is required"),
  roleKey: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .required("Password is required"),
});
const UserForm = () => {
  const location = useLocation();
  const { routeType } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role); // Get the roles from the Redux store

  const initialValues = {
    id: "",
    name: "",
    email: "",
    mobile: "",
    username: "",
    roleKey: "",
    password: "",
  };

  const onSubmit = (values, { resetForm }) => {
    if (location?.state) {
      // If editing, dispatch editUser action with updated data
      dispatch(editUser({ id: location.state.id, ...values }));
    } else {
      values.id = (Math.random() * 756).toFixed(8);
      // If adding, dispatch addUser action
      dispatch(addUser(values));
    }
    resetForm();
    navigate("/");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: location?.state ? location.state : initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  useEffect(() => {});

  return (
    <>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Mobile"
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Username"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </div>
          <div>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="roleKey-label">RoleKey</InputLabel>
              <Select
                labelId="roleKey-label"
                id="roleKey"
                name="roleKey"
                value={formik.values.roleKey}
                onChange={formik.handleChange}
                error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={`role_${role.id}`} value={role.roleKey}>
                    {role.roleLabel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Password"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Button type="submit" variant="contained" fullWidth color="primary">
            {routeType === "add" ? "Add" : "Update"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UserForm;
