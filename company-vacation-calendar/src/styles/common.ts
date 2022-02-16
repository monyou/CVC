import styled from "@emotion/styled";
import { Button } from "primereact/button";

export const centerDivOnScreen = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const inputGroupWithError = {
  margin: "25px 0px",
};

export const isSmallDevice = window.innerWidth < 768;

export const isSmallDeviceMediaQuery = (props: any) => {
  return {
    "@media (max-width: 768px)": {
      ...props,
    },
  };
};

export const PrimeSmallButton = styled(Button)({
  height: "30px",
});

export const PrimeButton = styled(Button)({
  display: "block",
  width: "150px",
  margin: "0 auto",
  marginTop: "30px",
});

const common = {
  centerDivOnScreen,
  inputGroupWithError,
  isSmallDevice,
  isSmallDeviceMediaQuery,
  PrimeSmallButton,
  PrimeButton,
};

export default common;
