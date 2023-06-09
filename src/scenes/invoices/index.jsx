// import React, { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, useGridApiContext } from '@mui/x-data-grid-pro';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import API from "../../api/API";
import { randomEmail } from '@mui/x-data-grid-generator';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


function DetailPanelContent({ row }) {
  const apiRef = useGridApiContext();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: row,
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    apiRef.current.updateRows([data]);
    apiRef.current.toggleDetailPanel(row.id);
  };

  return (
    <Stack
      sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
        <Stack
          component="form"
          justifyContent="space-between"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ height: 1 }}
        >
          <Typography variant="h6">{`Edit Order #${row.id}`}</Typography>
          <Controller
            control={control}
            name="customer"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label="Customer"
                size="small"
                error={invalid}
                required
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field, fieldState: { invalid } }) => (
              <TextField
                label="Email"
                size="small"
                error={invalid}
                required
                fullWidth
                {...field}
              />
            )}
          />
          <div>
            <Button
              type="submit"
              variant="outlined"
              size="small"
              disabled={!isValid}
            >
              Save
            </Button>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}


// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [invoices, setInvoices] = useState([]);
//   useEffect(() => {
//     API.getAllInvoices()
//       .then((data) => {
//         console.log(data.invoices);
//         setInvoices(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "date", headerName: "Date", flex: 0.3 },
    { field: "client", headerName: "Name", flex: 0.3 },
    { field: "phone", headerName: "Phone Number", flex: 0.3 },
    { field: "address", headerName: "Address", flex: 0.6 },
    { field: "workDescription", headerName: "Job Category",flex: 0.3 },
    { field: "cost", headerName: "Cost", flex: 0.2 },
    { field: "expenses", headerName: "Expenses", flex: 0.2 },
    { field: "isPaid", headerName: "Paid",flex: 0.2 } 
  ];
  const rows = [
    {
      id: 1,
      customer: 'Matheus',
      email: randomEmail(),
    },
    {
      id: 2,
      customer: 'Olivier',
      email: randomEmail(),
    },
    {
      id: 3,
      customer: 'Flavien',
      email: randomEmail(),
    },
    {
      id: 4,
      customer: 'Danail',
      email: randomEmail(),
    },
    {
      id: 5,
      customer: 'Alexandre',
      email: randomEmail(),
    },
  ];

  export default function FormDetailPanel() {
    const getDetailPanelContent = React.useCallback(
      ({ row }) => <DetailPanelContent row={row} />,
      [],
    );

    const getDetailPanelHeight = React.useCallback(() => 240, []);

  return (
    <Box sx={{ width: '100%', height: 400 }}>
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
          rows={invoices}
          columns={columns}
          rowThreshold={0}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        />
      </Box>
    </Box>
  );
};

