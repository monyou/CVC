import styled from "@emotion/styled";
import { Button } from "primereact/button";

export const centerDivOnScreen = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
export const inputGroupWithError = {
  margin: "25px 0px",
};
export const inputErrorMsg = {
  color: "red",
  padding: "5px",
};
export const isSmallDevice = window.innerWidth < 768;
export const isSmallDeviceMediaQuery = function (props) {
  return {
    "@media (max-width: 768px)": {
      ...props,
    },
  };
};
export const PrimeSmallButton = styled(Button)({
  height: "30px",
});
