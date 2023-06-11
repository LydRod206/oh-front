import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import API from "../api/API";

const InvoiceForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    API.createInvoice(values)
      .then((data) => {
        navigate("/invoices");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box m="20px">
      <Header title="CREATE NEW INVOICE"  />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Client ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.client_id}
                name="client_id"
                error={!!touched.client_id && !!errors.client_id}
                helperText={touched.client_id && errors.client_id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Services"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.services}
                name="services"
                error={!!touched.services && !!errors.services}
                helperText={touched.services && errors.services}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Work Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.work_description}
                name="work_description"
                error={!!touched.work_description && !!errors.work_description}
                helperText={touched.work_description && errors.work_description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost}
                name="cost"
                error={!!touched.cost && !!errors.cost}
                helperText={touched.cost && errors.cost}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Expenses"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expenses}
                name="expenses"
                error={!!touched.expenses && !!errors.expenses}
                helperText={touched.expenses && errors.expenses}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Payment Due"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.payment_due}
                name="payment_due"
                error={!!touched.payment_due && !!errors.payment_due}
                helperText={touched.payment_due && errors.payment_due}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  client_id: yup.number().required("required"),
  services: yup.string().required("required"),
  date: yup.string().required("required"),
  work_description: yup.string().required("required"),
  cost: yup.number().required("required"),
  expenses: yup.number().required("required"),
  payment_due: yup.string().required("required"),
  status: yup.string().required("required"),
});
const initialValues = {
  client_id: "",
  services: "",
  date: "",
  work_description: "",
  cost: "",
  expenses: "",
  payment_due: "",
  status: "",
};

export default InvoiceForm;