/** @jsxImportSource @emotion/react */
import moment from "moment";
import { PrimeSmallButton as Button } from "../components/PrimeSmallButton";
import { isSmallDevice } from "../styles/common";

function Toolbar(calendarEvent, onNewEventHandler) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        padding: "0 10px",
      }}
    >
      <div
        css={{
          width: isSmallDevice ? "120px" : "210px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          label={isSmallDevice ? "" : "Prev"}
          icon={isSmallDevice ? "pi pi-angle-left" : ""}
          onClick={() => {
            calendarEvent.onNavigate(
              "prev",
              new Date(
                new Date(calendarEvent.date).setMonth(
                  calendarEvent.date.getMonth() - 1
                )
              )
            );
          }}
        />
        <Button
          label={isSmallDevice ? "" : "Today"}
          icon={isSmallDevice ? "pi pi-angle-down" : ""}
          onClick={() => {
            calendarEvent.onNavigate("today", moment().toDate());
          }}
        />
        <Button
          label={isSmallDevice ? "" : "Next"}
          icon={isSmallDevice ? "pi pi-angle-right" : ""}
          onClick={() => {
            calendarEvent.onNavigate(
              "next",
              new Date(
                new Date(calendarEvent.date).setMonth(
                  calendarEvent.date.getMonth() + 1
                )
              )
            );
          }}
        />
      </div>
      <div>{calendarEvent.label}</div>
      <Button
        label={isSmallDevice ? "" : "Add Vacation"}
        icon={isSmallDevice ? "pi pi-calendar" : ""}
        onClick={onNewEventHandler}
      />
    </div>
  );
}

export { Toolbar };
