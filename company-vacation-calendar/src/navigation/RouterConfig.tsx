import { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getToken, logout, getUserFromToken } from "../utils/common";
import { Roles } from "../utils/enums";
import Welcome from "../modules/home/pages/welcome/Welcome";
import Login from "../modules/auth/pages/login/Login";
import Subscribe from "../modules/auth/pages/subscribe/Subscribe";
import NotFoundPage from "./NotFoundPage";
import MainLayout from "./layouts/main/MainLayout";
import ActivateUser from "../modules/auth/pages/activateUser/ActivateUser";
import SuperAdminDashboard from "../modules/superadmin/pages/dashboard/SuperAdminDashboard";
import UserDashboard from "../modules/user/pages/dashboard/UserDashboard";
import AdminDashboard from "../modules/admin/pages/dashboard/AdminDashboard";
import CustomLayout from "./layouts/custom/CustomLayout";

const RouterConfig: FC = (): React.ReactElement => {
  return (
    <Switch>
      <Redirect exact from="/" to="/welcome" />
      <Redirect exact from="/super-admin" to="/super-admin/dashboard" />
      <Redirect exact from="/admin" to="/admin/dashboard" />
      <Redirect exact from="/user" to="/user/dashboard" />
      <Route path="/welcome" render={() => loadNoAuthPage(Welcome)} />
      <Route path="/login" render={() => loadNoAuthPage(Login)} />
      <Route
        path="/new-user/:email/:id/:securityKey"
        render={() => loadNoAuthPage(ActivateUser)}
      />
      <Route path="/subscribe" render={() => loadNoAuthPage(Subscribe)} />
      <Route
        exact
        path="/super-admin/dashboard"
        render={() =>
          loadProtectedPage(SuperAdminDashboard, MainLayout, Roles.SuperAdmin)
        }
      />
      <Route
        exact
        path="/admin/dashboard"
        render={() =>
          loadProtectedPage(AdminDashboard, MainLayout, Roles.Admin)
        }
      />
      <Route
        exact
        path="/user/dashboard"
        render={() => loadProtectedPage(UserDashboard, MainLayout)}
      />
      <Route path="*" render={() => <NotFoundPage />} />
    </Switch>
  );
};

function loadNoAuthPage(Component: any): React.ReactElement {
  if (getToken()) {
    const user = getUserFromToken();
    switch (user?.role.name) {
      case Roles.SuperAdmin:
        return <Redirect to="/super-admin" />;
      case Roles.Admin:
        return <Redirect to="/admin" />;
      case Roles.User:
        return <Redirect to="/user" />;
      default:
        logout();
        return <Redirect to="/login" />;
    }
  } else {
    return <CustomLayout children={<Component />} />;
  }
}

function loadProtectedPage(
  Component: any,
  Layout: any,
  role?: string
): React.ReactElement {
  if (getToken()) {
    if (role) {
      const user = getUserFromToken();
      if (user?.role.name !== role) return <Redirect to="/access-denied" />;
    }
    return <Layout children={<Component />} />;
  } else {
    return <Redirect to="/login" />;
  }
}

RouterConfig.displayName = "RouteConfig";
export default RouterConfig;
