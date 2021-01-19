/** @jsxImportSource @emotion/react */
import React from "react";
import { User } from "./User";
import { Admin } from "./Admin";
import { SuperAdmin } from "./SuperAdmin";
import { roles } from "../../utils/enums";
import { useSelector } from "react-redux";

function Dashboard() {
  const store = useSelector((state) => ({ user: state.user }));

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

export { Dashboard };
