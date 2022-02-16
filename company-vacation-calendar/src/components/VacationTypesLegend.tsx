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
};

const VacationTypesLegend: React.FC<VacationTypesLegendProps> = ({
  vacationTypes,
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
        <div
          css={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          {vacationTypesToShow?.map((x, i) => (
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
                    fontWeight: 600,
                    cursor: "default",
                    ...isSmallDeviceMediaQuery({ marginRight: "none" }),
                  }}
                  data-pr-tooltip={x.name}
                  data-pr-position={
                    i < vacationTypesToShow.length - 2 ? "right" : "left"
                  }
                >
                  {x.name.split(" ").length > 1
                    ? `${x.name.split(" ")[0][0]}${x.name.split(" ")[1][0]}`
                    : x.name.split(" ")[0][0]}
                </div>
                {isSmallDevice ? null : <div>{x.name}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

VacationTypesLegend.displayName = "VacationTypesLegend";
export default VacationTypesLegend;
