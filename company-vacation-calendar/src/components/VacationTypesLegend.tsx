/** @jsxImportSource @emotion/react */
import React from "react";
import { useQuery } from "react-query";
import { getAllVacationTypes } from "../services/vacation.service";
import { isSmallDevice, isSmallDeviceMediaQuery } from "../styles/common";
import { vacationTypesColors } from "../styles/colors";
import { Tooltip } from "primereact/tooltip";
import VacationTypeModel from "../dtos/vacationType.dto";

type VacationTypesLegendProps = {
  vacationTypes?: Array<VacationTypeModel>;
  vacationTypesCount?: any;
};

const VacationTypesLegend: React.FC<VacationTypesLegendProps> = ({
  vacationTypes,
  vacationTypesCount,
}) => {
  const { data: newVacationTypes, isLoading } = useQuery<
    Array<VacationTypeModel>
  >(
    "vacation-types",
    () => getAllVacationTypes().then((data) => data.vacationTypes),
    {
      enabled: !vacationTypes,
    }
  );

  const vacationTypesToShow = vacationTypes || newVacationTypes;

  if (isLoading) {
    return <div>Loading vacation types legend...</div>;
  } else {
    return (
      <div>
        <div>Vacation Types:</div>
        <div
          css={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          {vacationTypesToShow?.map((x) => (
            <div key={x.id}>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isSmallDevice ? <Tooltip target=".vacation-type" /> : null}

                <div
                  className="vacation-type"
                  css={{
                    padding: "5px",
                    backgroundColor: vacationTypesColors[x.name],
                    marginRight: "5px",
                    borderRadius: "5px",
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    lineHeight: "20px",
                    color: "whitesmoke",
                    textShadow: "0 0 3px black",
                    fontWeight: "bold",
                    cursor: "default",
                    ...isSmallDeviceMediaQuery({ marginRight: "none" }),
                  }}
                  data-pr-tooltip={x.name}
                >
                  {x.name.split(" ").length > 1
                    ? `${x.name.split(" ")[0][0]}${x.name.split(" ")[1][0]}`
                    : x.name.split(" ")[0][0]}
                </div>
                {isSmallDevice ? null : <div>{x.name}</div>}
              </div>
              {vacationTypesCount ? (
                <div
                  css={{
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  {vacationTypesCount[x.name]}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

VacationTypesLegend.displayName = "VacationTypesLegend";
export default VacationTypesLegend;
