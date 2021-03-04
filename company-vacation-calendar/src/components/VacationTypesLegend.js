/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import { getAllVacationTypes } from "../services/vacation.service";
import { isSmallDevice, isSmallDeviceMediaQuery } from "../styles/common";
import PropTypes from "prop-types";
import { vacationTypesColors } from "../styles/colors";
import { Tooltip } from "primereact/tooltip";

function VacationTypesLegend({ vacationTypes, vacationTypesCount }) {
  const { data: newVacationTypes, isLoading } = useQuery(
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
          {vacationTypesToShow.map((x) => (
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
}

VacationTypesLegend.propTypes = {
  vacationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  vacationTypesCount: PropTypes.object,
};

export { VacationTypesLegend };
