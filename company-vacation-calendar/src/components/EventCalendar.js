/** @jsxImportSource @emotion/react */
import "moment/locale/bg";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Toolbar } from "./EventCalendarToolbar";
import moment from "moment";
import PropTypes from "prop-types";

function EventCalendar({
  eventsList = [],
  styles = {},
  startDateAccessorField = "start",
  endDateAccessorField = "end",
  newEventOption = true,
  onNewEvent = (e) => {},
  eventStyling = (e) => {},
  onEventClicked = (e, el) => {},
}) {
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
      onView
      eventPropGetter={eventStyling}
      onSelectEvent={onEventClicked}
      components={{
        toolbar: (e) => Toolbar(e, onNewEvent, newEventOption),
      }}
    />
  );
}

EventCalendar.propTypes = {
  eventsList: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.object,
  startDateAccessorField: PropTypes.string,
  endDateAccessorField: PropTypes.string,
  newEventOption: PropTypes.bool,
  onNewEvent: PropTypes.func,
  eventStyling: PropTypes.func,
  onEventClicked: PropTypes.func,
};

export { EventCalendar };
