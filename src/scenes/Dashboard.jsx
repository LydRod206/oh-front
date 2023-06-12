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
import {Box,List,ListItem,ListItemText,Typography,useTheme,} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import API from "../api/API";

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

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const client_id = prompt("Please enter a client ID for your event");

    if (!title) {
      return;
    }
    if (!client_id) {
      return;
    }

    API.createJob({
      title,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
      client_id: client_id,
    })
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
    })
    .catch((err) => {
      console.log(err);
    });
  };

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
        )
        console.log(currentEvents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box m="20px">
       {/* HEADER */}
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
    </Box>
  );
};

export default Calendar;






 