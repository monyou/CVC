/** @jsxImportSource @emotion/react */
import React from "react";
import * as colors from "../../styles/colors";
import logoCalendar from "../../assets/logos/calendar.png";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { centerDivOnScreen } from "../../styles/common";
import { Toast } from "primereact/toast";

function Home() {
  const location = useLocation();
  const routeHistory = useHistory();
  const subscriptionToast = React.useRef(null);

  React.useEffect(() => {
    if (location.state?.subscriptionToast) {
      subscriptionToast.current.show({
        severity: "info",
        summary: "Subscription Sent",
        detail:
          "Your subscription was sent to the platform admins for review. You will receive an email with instructions when they confirm it!",
        life: 7000,
      });
      window.history.replaceState({}, "");
    }
  }, [location.state?.subscriptionToast]);

  return (
    <div
      css={{
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.backgroundSoloPage,
      }}
    >
      <Toast
        css={{ fontSize: "12px", maxWidth: "90%" }}
        ref={subscriptionToast}
      />
      <div
        css={{
          ...centerDivOnScreen,
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1 css={{ color: "white", marginTop: 0 }}>
          Company Vacation Calendar
        </h1>
        <img
          css={{
            display: "block",
            margin: "10px auto",
            width: "200px",
            height: "200px",
          }}
          src={logoCalendar}
          alt="logo"
        />
        <Button
          css={{ display: "block", width: "150px", marginTop: "30px" }}
          label="Login"
          className="p-button-primary p-button-rounded"
          onClick={() => routeHistory.push("/login")}
        />
        <Button
          css={{ display: "block", width: "150px", marginTop: "10px" }}
          label="Subscribe"
          className="p-button-primary p-button-rounded"
          onClick={() => routeHistory.push("/subscribe")}
        />
      </div>
    </div>
  );
}

export { Home };
