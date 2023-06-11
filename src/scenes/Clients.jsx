import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import API from "../api/API";

const Contacts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clients, setClients] = useState([]);
  useEffect(() => {
    API.getAllClients()
      .then((data) => {
        setClients(data.clients);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { 
      field: "id", 
      headerName: "ID",
      flex: 0.3
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      editable: true
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.3,
      editable: true
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.3,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.6,
      editable: true
    }
  ];
  

  return (
    <Box m="20px">
      <Header
        title="CLIENTS"
        subtitle="List of Clients for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={clients}
          columns={columns}
          slots={{
            Toolbar: GridToolbar,
          }}
          disableColumnFilter={false} 
        />
      </Box>
    </Box>
  );
};

export default Contacts;

