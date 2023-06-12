import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import API from "../api/API";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const usePersistClient = () => {
  return React.useCallback(
    (client) => 
    new Promise((resolve, reject) => {
      API.updateClient(client.id, client)
        .then((data) => {
          resolve(data.client);
        })
        .catch((err) => {
          reject(err);
        });
    }),
    []
  );
};

const Contacts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const mutateRow = usePersistClient();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
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

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'Client Updated Successfully', severity: 'success'})
      return response;
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error'});
  }, []);

  const handleDeleteClick = (id) => () => {
    console.log("deleting id: " + id);
    API.deleteClient(id)
      .then((data) => {
        console.log(data);
        setSnackbar({ children: 'Client Deleted Successfully', severity: 'success'})
        setClients(clients.filter((row) => row.id !== id));
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({ children: err.message, severity: 'error'})
      });
    
  };

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
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
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
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{
            Toolbar: GridToolbar,
          }}
          disableColumnFilter={false} 
        />
        {!!snackbar && (
          <Snackbar 
            open 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default Contacts;

