import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      // flex: 0.5 
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.6,
    },
    {
      field: "job",
      headerName: "Job Category",
      flex: 0.3,
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 0.7,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.2,
    }, 
  ];

  const MyComponent = () => {
    useEffect(() => {
      axios.get('https://your-backend.herokuapp.com/api/data')
        .then(response => {
          // Handle the response data
          console.log(response.data);
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
    }, []);
  

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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;