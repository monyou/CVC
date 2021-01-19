import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Subscribe } from "../pages/Subscribe/Subscribe";
import { NotFoundPage } from "./NotFoundPage";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { MainLayout } from "./layouts/main/MainLayout";
import { getToken } from "../services/auth.service";

function RouterConfig() {
  return (
    <Switch>
      <Redirect exact="true" from="/" to="/home" />
      <Route path="/home" render={() => loadNoAuthPage(Home)} />
      <Route path="/login" render={() => loadNoAuthPage(Login)} />
      <Route path="/subscribe" render={() => <Subscribe />} />
      <Route
        path="/dashboard"
        render={() => loadProtectedPage(Dashboard, MainLayout)}
      />
      <Route path="*" render={() => <NotFoundPage />} />
    </Switch>
  );
}

function loadNoAuthPage(Component) {
  if (getToken()) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Component />;
  }
}

function loadProtectedPage(Component, Layout) {
  if (getToken()) {
    return <Layout children={<Component />} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export { RouterConfig };
