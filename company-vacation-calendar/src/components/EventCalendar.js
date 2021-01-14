/** @jsxImportSource @emotion/react */
import React from "react";
import "moment/locale/bg";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Toolbar } from "./EventCalendarToolbar";
import moment from "moment";

function EventCalendar({
  eventsList = [],
  styles = {},
  startDateAccessorField = "start",
  endDateAccessorField = "end",
  onNewEvent = (e) => {},
}) {
  return (
    <Calendar
      localizer={momentLocalizer(moment)}
      events={eventsList}
      startAccessor={startDateAccessorField}
      endAccessor={endDateAccessorField}
      style={{ height: "calc(100vh - 100px)", ...styles }}
      view={"month"}
      popup={true}
      onView
      components={{
        toolbar: (e) => Toolbar(e, onNewEvent),
      }}
    />
  );
}

export { EventCalendar };
