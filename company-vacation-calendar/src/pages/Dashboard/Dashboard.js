/** @jsxImportSource @emotion/react */
import React from "react";
import { getToken } from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import { User } from "./User";
import { Admin } from "./Admin";
import { SuperAdmin } from "./SuperAdmin";
import { roles } from "../../utils/enums";
import { connect, useSelector } from "react-redux";

function Dashboard() {
  const routeHistory = useHistory();
  const store = useSelector((state) => ({ user: state.user }));

  React.useLayoutEffect(() => {
    if (!getToken()) {
      routeHistory.replace("/login");
      return;
    }
  });

  switch (store.user?.role?.name) {
    case roles.SuperAdmin:
      return <SuperAdmin />;
    case roles.Admin:
      return <Admin />;
    case roles.User:
      return <User />;
    default:
      return <div>Opps, who are you?! (No user roles was specified)</div>;
  }
}

export default connect()(Dashboard);
export { Dashboard };
