import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Subscribe } from "../pages/Subscribe/Subscribe";
import { NotFoundPage } from "./NotFoundPage";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { MainLayout } from "./layouts/main/MainLayout";

function RouterConfig() {
  return (
    <Switch>
      <Redirect exact="true" from="/" to="/home" />
      <Route path="/home" render={() => <Home />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/subscribe" render={() => <Subscribe />} />
      <Route
        path="/dashboard"
        render={() => <MainLayout children={<Dashboard />} />}
      />
      <Route path="*" render={() => <NotFoundPage />} />
    </Switch>
  );
}

export { RouterConfig };
