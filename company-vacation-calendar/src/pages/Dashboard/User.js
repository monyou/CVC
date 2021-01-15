/** @jsxImportSource @emotion/react */
import React from "react";
import { EventCalendar } from "../../components/EventCalendar";
import { Dialog } from "primereact/dialog";
import { getAllVacationsByCompany } from "../../services/vacations.service";
import { GlobalContext } from "../../App";

function User() {
  const [globalState] = React.useContext(GlobalContext);
  const [state, setState] = React.useState({
    vacationsForCompany: [],
    showDialog: false,
  });

  React.useEffect(() => {
    getAllVacationsByCompany(globalState.user?.company?.id).then((response) => {
      console.log(response);
      setState({ ...state, vacationsForCompany: response });
    });

    // eslint-disable-next-line
  }, [state.vacationsForCompany]);

  return (
    <div>
      <EventCalendar
        eventsList={state.vacationsForCompany}
        onNewEvent={(e) => {
          setState({ ...state, showDialog: true });
        }}
      />

      <Dialog
        header="Apply for vacation"
        visible={state.showDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setState({ ...state, showDialog: false });
        }}
      ></Dialog>
    </div>
  );
}

export { User };
