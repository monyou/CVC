/** @jsxImportSource @emotion/react */
import { User } from "./User";
import { Admin } from "./Admin";
import { SuperAdmin } from "./SuperAdmin";
import { roles } from "../../utils/enums";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/user.slice";

function Dashboard() {
  const reduxUser = useSelector(selectUser);

  switch (reduxUser?.role?.name) {
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
