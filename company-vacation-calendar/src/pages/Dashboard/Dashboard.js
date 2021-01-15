/** @jsxImportSource @emotion/react */
import React from "react";
import { getToken } from "../../services/auth.service";
import { GlobalContext } from "../../App";
import { useHistory } from "react-router-dom";
import { User } from "./User";
import { Admin } from "./Admin";
import { SuperAdmin } from "./SuperAdmin";
import { roles } from "../../utils/enums";

function Dashboard() {
  const routeHistory = useHistory();
  const [globalState] = React.useContext(GlobalContext);

  React.useLayoutEffect(() => {
    if (!getToken()) {
      routeHistory.replace("/login");
      return;
    }
  }, [globalState, routeHistory]);

  return <User />;

  // switch (globalState.user?.role?.name) {
  //   case roles.SuperAdmin:
  //     return <SuperAdmin />;
  //   case roles.Admin:
  //     return <Admin />;
  //   case roles.User:
  //     return <User />;
  //   default:
  //     return <div>Opps, who are you?! (No user roles was specified)</div>;
  // }
}

export { Dashboard };
