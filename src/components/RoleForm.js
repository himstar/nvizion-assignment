import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRole, editRole } from "../redux/roleSlice";

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
  roleLabel: Yup.string().required("Rolelabel is required"),
  roleKey: Yup.string().required("Role is required"),
});

const RoleForm = () => {
  const location = useLocation();
  const { routeType } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    id: "",
    roleLabel: "",
    roleKey: "",
  };

  const onSubmit = (values, { resetForm }) => {
    if (location?.state) {
      // If editing, dispatch editRole action
      dispatch(editRole({ id: location.state.id, ...values }));
    } else {
      values.id = (Math.random() * 756).toFixed(8);
      // If adding, dispatch addRole action
      dispatch(addRole(values));
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
    <div>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="roleLabel"
              id="roleLabel"
              name="roleLabel"
              value={formik.values.roleLabel}
              onChange={formik.handleChange}
              error={
                formik.touched.roleLabel && Boolean(formik.errors.roleLabel)
              }
              helperText={formik.touched.roleLabel && formik.errors.roleLabel}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="roleKey"
              id="roleKey"
              name="roleKey"
              value={formik.values.roleKey}
              onChange={formik.handleChange}
              error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
              helperText={formik.touched.roleKey && formik.errors.roleKey}
            />
          </div>
          <Button type="submit" variant="contained" fullWidth color="primary">
            {routeType === "add" ? "Add" : "Update"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RoleForm;
