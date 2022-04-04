/** @jsxImportSource @emotion/react */
import * as colors from "../../../../styles/colors";
import logoCalendar from "../../../../assets/logos/calendar.png";
import { useHistory } from "react-router-dom";
import { centerDivOnScreen, PrimeButton } from "../../../../styles/common";

function Home() {
  const routeHistory = useHistory();

  return (
    <div
      css={{
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.backgroundSoloPage,
      }}
    >
      <div
        css={{
          position: "absolute",
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
        <PrimeButton
          label="Login"
          className="p-button-primary p-button-rounded"
          onClick={() => routeHistory.push("/login")}
        />
        <PrimeButton
          css={{ marginTop: "10px" }}
          label="Subscribe"
          className="p-button-primary p-button-rounded"
          onClick={() => routeHistory.push("/subscribe")}
        />
      </div>
    </div>
  );
}

export default Home;
