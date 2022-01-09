/** @jsxImportSource @emotion/react */
import { backgroundSoloPage } from "../../../../styles/colors";
import { centerDivOnScreen } from "../../../../styles/common";

function SuperAdminDashboard() {
  return (
    <div css={{ height: "100vh" }}>
      <h1
        css={{
          position: "absolute",
          ...centerDivOnScreen,
          color: backgroundSoloPage,
        }}
      >
        SuperAdmin page still in progress...
      </h1>
    </div>
  );
}

export default SuperAdminDashboard;
