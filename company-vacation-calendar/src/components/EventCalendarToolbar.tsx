/** @jsxImportSource @emotion/react */
import moment from "moment";
import {
  isSmallDevice,
  isSmallDeviceMediaQuery,
  PrimeSmallButton,
  smallIconButton,
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
          width: "260px",
          display: "flex",
          justifyContent: "space-between",
          ...isSmallDeviceMediaQuery({ width: "120px" }),
        }}
      >
        <PrimeSmallButton
          css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
          className="p-button-rounded"
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
          css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
          className="p-button-rounded"
          label={isSmallDevice ? "" : "Today"}
          icon={isSmallDevice ? "pi pi-angle-down" : ""}
          onClick={() => calendarEvent.onNavigate("today", moment().toDate())}
        />
        <PrimeSmallButton
          css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
          className="p-button-rounded"
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
          css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
          className="p-button-rounded"
          label={isSmallDevice ? "" : "New Vacation"}
          icon="pi pi-calendar"
          onClick={onNewEventHandler}
        />
      ) : null}
    </div>
  );
}

export { Toolbar };
