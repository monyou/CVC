/** @jsxImportSource @emotion/react */
import React from "react";
import { isSmallDevice, PrimeSmallButton } from "../styles/common";
import { Card } from "primereact/card";
import moment from "moment";
import VacationModel from "../dtos/vacation.dto";

type VacationRequestsListProps = {
  pendingVacations: Array<VacationModel>;
  handleUpdateVacation: any;
};

const VacationRequestsList: React.FC<VacationRequestsListProps> = ({
  pendingVacations,
  handleUpdateVacation,
}) => {
  const noRequests = pendingVacations.length === 0;

  return (
    <div className="p-grid">
      {noRequests ? (
        <div css={{ textAlign: "center", width: "100%", marginTop: "50px" }}>
          There is no vacation requests yet.
        </div>
      ) : (
        pendingVacations.map((v) => {
          return (
            <div key={v.id} className="p-col-12 p-sm-6 p-lg-4 p-xl-3">
              <Card
                title={v.username}
                subTitle={`${v.vacationType.name} (${v.days.length} ${
                  v.days.length > 1 ? "days" : "day"
                })`}
                footer={
                  <div css={{ textAlign: "center" }}>
                    <PrimeSmallButton
                      label={isSmallDevice ? "" : "Accept"}
                      className="p-button-success"
                      icon="pi pi-check"
                      style={{ marginRight: ".5em" }}
                      onClick={() => handleUpdateVacation("accept", v.id)}
                    />
                    <PrimeSmallButton
                      label={isSmallDevice ? "" : "Reject"}
                      icon="pi pi-times"
                      className="p-button-danger"
                      onClick={() => handleUpdateVacation("reject", v.id)}
                    />
                  </div>
                }
              >
                {v.description}
                <div css={{ height: "70px", overflowY: "scroll" }}>
                  <ul>
                    {v.days.sort().map((d) => {
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
