import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {Dialog,Box,Button,TextField,List,ListItem,ListItemText,Typography,useTheme,MenuItem, DialogTitle, DialogContent, Switch, FormControlLabel} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import API from "../api/API";
import { Formik } from "formik";
import * as yup from "yup";

const Calendar = () => {
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
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    client_id: "",
    start: "",
    end: "",
    allDay: false,
  });

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Required"),
    client_id: yup.string().required("Required"),
    start: yup.date().required("Required"),
    end: yup.date().required("Required"),
    allDay: yup.boolean().required("Required"),
  });

  const handleDateClick = (selected) => {
    setFormValues({
      title: "",
      client_id: "",
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
    console.log(formValues);
    setOpen(true);
  };

  const handleSubmit = (values) => {
    API.createJob(values)
      .then((data) => {
        setCurrentEvents([
          ...currentEvents,
          {
            id: data.job.id,
            title: data.job.title,
            start: data.job.start,
            end: data.job.end,
            allDay: data.job.allDay,
            client_id: data.job.client_id,
          },
        ]);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => setOpen(false);

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      API.deleteJob(selected.event.id)
        .then((data) => {
          selected.event.remove();
          currentEvents.splice(
            currentEvents.findIndex((event) => event.id === selected.event.id),
            1
          );
          setCurrentEvents([...currentEvents]);
        })
        .catch((err) => {
          console.log(err);
        }
      );
    }
  };

  useEffect(() => {
    API.getAllJobs()
      .then((data) => {
        setCurrentEvents(
          data.jobs.map((job) => ({
            id: job.id,
            title: job.title,
            start: job.start,
            end: job.end,
            allDay: job.allDay,
            client_id: job.client_id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
    API.getAllClients()
      .then((data) => {
        setClients(data.clients);
      }
    );
  }, []);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>  
     
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Upcoming Jobs</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {event.client_id && `${event.client_id} - 
                      ${formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}`}                      
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            events={currentEvents}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            
          />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        >
          <DialogTitle>Add New Job</DialogTitle>
          <DialogContent>
            <Formik 
              onSubmit={handleSubmit}
              initialValues={formValues}
              validationSchema={checkoutSchema}
            >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box mt="20px">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box mt="20px">
                  <TextField
                    name="client_id"
                    select
                    label="Client"
                    defaultValue=""
                    value={values.client_id}
                    helperText="Please select a client"
                    onChange={handleChange}
                  >
                    {clients.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box mt="20px">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="start"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.start}
                    name="start"
                    error={!!touched.start && !!errors.start}
                    helperText={touched.start && errors.start}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box mt="20px">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="end"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.end}
                    name="end"
                    error={!!touched.end && !!errors.end}
                    helperText={touched.end && errors.end}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box mt="20px">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.allDay}
                        onChange={handleChange}
                        name="allDay"
                        color="primary"
                      />
                    }
                    label="All Day"
                  />

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New Job
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;






 