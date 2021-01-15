/** @jsxImportSource @emotion/react */
import React from "react";
import { PrimeSmallButton } from "../../components/PrimeSmallButton";
import {
  getAllVacationsByCompany,
  updateVacation,
} from "../../services/vacation.service";
import { vacationStatus } from "../../utils/enums";
import { Card } from "primereact/card";
import { connect, useSelector } from "react-redux";

function Admin() {
  const store = useSelector((state) => ({ user: state.user }));
  const [state, setState] = React.useState({ pendingVacations: [] });

  React.useEffect(() => {
    getAllVacationsByCompany(store.user?.company?.id).then((vacations) => {
      setState({
        ...state,
        pendingVacations: vacations.filter(
          (v) => v.status === vacationStatus.Pending
        ),
      });
    });
  }, []);

  function handleUpdateVacation(action, vacationId) {
    let requestData = {
      id: vacationId,
    };

    switch (action) {
      case "accept":
        requestData.status = vacationStatus.Accepted;
        break;
      case "reject":
        requestData.status = vacationStatus.Rejected;
        break;
    }

    updateVacation(requestData).then((response) => {
      setState({
        ...state,
        pendingVacations: state.pendingVacations.filter(
          (v) => v.id !== vacationId
        ),
      });
    });
  }

  return (
    <div>
      {state.pendingVacations.map((v) => {
        return (
          <Card key={v.id} title={v.username} subTitle={v.vacationType.name}>
            {v.description}
            <ul>
              {v.days.sort().map((d) => {
                return <li key={d}>{new Date(d).toLocaleDateString("bg")}</li>;
              })}
            </ul>
            <PrimeSmallButton
              label="Accept"
              className="p-button-success"
              icon="pi pi-check"
              style={{ marginRight: ".25em" }}
              onClick={() => handleUpdateVacation("accept", v.id)}
            />
            <PrimeSmallButton
              label="Reject"
              icon="pi pi-times"
              className="p-button-danger"
              onClick={() => handleUpdateVacation("reject", v.id)}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default connect()(Admin);
export { Admin };
