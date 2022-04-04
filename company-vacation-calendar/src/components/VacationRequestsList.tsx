/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { PrimeSmallButton } from "../styles/common";
import { Card } from "primereact/card";
import moment from "moment";
import VacationModel from "../dtos/vacation.dto";

type VacationRequestsListProps = {
  pendingVacations: Array<VacationModel>;
  handleUpdateVacation: any;
};

const VacationRequestsList: FC<VacationRequestsListProps> = ({
  pendingVacations,
  handleUpdateVacation,
}) => {
  const noRequests = pendingVacations.length === 0;

  return (
    <div className="grid">
      {noRequests ? (
        <div css={{ textAlign: "center", width: "100%", marginTop: "50px" }}>
          There are no vacation requests yet.
        </div>
      ) : (
        pendingVacations.map((v) => {
          return (
            <div key={v.id} className="col-12 sm:col-6 lg:col-4 xl:col-3">
              <Card
                title={v.username}
                subTitle={`${v.vacationType.name} (${v.days.length} ${
                  v.days.length > 1 ? "days" : "day"
                })`}
                footer={
                  <div css={{ textAlign: "center" }}>
                    <PrimeSmallButton
                      label="Accept"
                      className="p-button-success p-button-rounded"
                      icon="pi pi-check"
                      style={{ marginRight: ".5em" }}
                      onClick={() => handleUpdateVacation("accept", v.id)}
                    />
                    <PrimeSmallButton
                      label="Reject"
                      icon="pi pi-times"
                      className="p-button-danger p-button-rounded p-button-outlined"
                      onClick={() => handleUpdateVacation("reject", v.id)}
                    />
                  </div>
                }
              >
                {v.description}
                <div css={{ height: "70px", overflowY: "scroll" }}>
                  <ul>
                    {[...v.days].sort().map((d) => {
                      return (
                        <li key={d}>{`${new Date(d).toLocaleDateString(
                          "bg"
                        )} (${moment(new Date(d).toISOString()).format(
                          "dddd"
                        )})`}</li>
                      );
                    })}
                  </ul>
                </div>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
};

VacationRequestsList.displayName = "VacationRequestsList";
export default VacationRequestsList;
