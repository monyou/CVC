/** @jsxImportSource @emotion/react */
import React from "react";
import "moment/locale/bg";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Toolbar } from "./EventCalendarToolbar";
import moment from "moment";

type EventCalendarProps = {
  eventsList?: any[];
  styles?: any;
  startDateAccessorField?: string;
  endDateAccessorField?: string;
  newEventOption?: boolean;
  onNewEvent?: any;
  eventStyling?: any;
  onEventClicked?: any;
};

const EventCalendar: React.FC<EventCalendarProps> = ({
  eventsList = [],
  styles = {},
  startDateAccessorField = "start",
  endDateAccessorField = "end",
  newEventOption = true,
  onNewEvent = (e: any) => {},
  eventStyling = (e: any) => {},
  onEventClicked = (e: any, el: any) => {},
}) => {
  return (
    <Calendar
      localizer={momentLocalizer(moment)}
      events={eventsList}
      startAccessor={startDateAccessorField}
      endAccessor={endDateAccessorField}
      style={{ height: "calc(100vh - 60px)", ...styles }}
      view={"month"}
      views={["month"]}
      popup={true}
      onView={() => {}}
      eventPropGetter={eventStyling}
      onSelectEvent={onEventClicked}
      components={{
        toolbar: (e: any) => Toolbar(e, onNewEvent, newEventOption),
      }}
    />
  );
};

EventCalendar.displayName = "EventCalendar";
export default EventCalendar;
