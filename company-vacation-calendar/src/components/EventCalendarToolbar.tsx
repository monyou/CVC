/** @jsxImportSource @emotion/react */
import React from "react";
import moment from "moment";
import {
  isSmallDevice,
  isSmallDeviceMediaQuery,
  PrimeSmallButton,
} from "../styles/common";

function Toolbar(
  calendarEvent: any,
  onNewEventHandler: any,
  newEventOption: any
) {
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
          width: "230px",
          display: "flex",
          justifyContent: "space-between",
          ...isSmallDeviceMediaQuery({ width: "120px" }),
        }}
      >
        <PrimeSmallButton
          label={isSmallDevice ? "" : "Prev"}
          icon={isSmallDevice ? "pi pi-angle-left" : ""}
          onClick={() =>
            calendarEvent.onNavigate(
              "prev",
              new Date(
                new Date(calendarEvent.date).setMonth(
                  calendarEvent.date.getMonth() - 1
                )
              )
            )
          }
        />
        <PrimeSmallButton
          label={isSmallDevice ? "" : "Today"}
          icon={isSmallDevice ? "pi pi-angle-down" : ""}
          onClick={() => calendarEvent.onNavigate("today", moment().toDate())}
        />
        <PrimeSmallButton
          label={isSmallDevice ? "" : "Next"}
          icon={isSmallDevice ? "pi pi-angle-right" : ""}
          onClick={() =>
            calendarEvent.onNavigate(
              "next",
              new Date(
                new Date(calendarEvent.date).setMonth(
                  calendarEvent.date.getMonth() + 1
                )
              )
            )
          }
        />
      </div>
      <div>{calendarEvent.label}</div>
      {newEventOption ? (
        <PrimeSmallButton
          label={isSmallDevice ? "" : "New Vacation"}
          icon={isSmallDevice ? "pi pi-calendar" : ""}
          onClick={onNewEventHandler}
        />
      ) : null}
    </div>
  );
}

export { Toolbar };
