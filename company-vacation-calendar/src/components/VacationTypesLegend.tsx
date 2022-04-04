/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { isSmallDevice, isSmallDeviceMediaQuery } from "../styles/common";
import { vacationTypesColors } from "../styles/colors";
import { Tooltip } from "primereact/tooltip";
import VacationTypeModel from "../dtos/vacationType.dto";
import { useGetAllVacationTypesQuery } from "../redux/baseApi";

type VacationTypesLegendProps = {
  vacationTypes?: Array<VacationTypeModel>;
};

const VacationTypesLegend: FC<VacationTypesLegendProps> = ({
  vacationTypes,
}) => {
  const { data: newVacationTypes, isFetching } = useGetAllVacationTypesQuery(
    undefined,
    { skip: !!vacationTypes }
  );

  const vacationTypesToShow = vacationTypes || newVacationTypes;

  if (isFetching) {
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
