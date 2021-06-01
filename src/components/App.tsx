import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import ScheduleActivity from "./ScheduleActivity";
import TrackActivity from "./TrackActivity";
import routes from "../routes";

export default function App() {
  return (
    <Router>
      <$App>
        <Switch>
          <Route path={routes.schedule}>
            <ScheduleActivity />
          </Route>
          <Route path={routes.track(":activity")}>
            <TrackActivity />
          </Route>
          <Route path={routes.dashboard}>
            <Dashboard />
          </Route>
        </Switch>
      </$App>
    </Router>
  );
}

const $App = styled.div`
  width: 100vw;
  height: 100vh;
  @media only screen and (min-width: 600px) {
    border: 1px solid lightgray;
    width: 375px;
    height: 667px;
    overflow: auto;
    margin: 10px auto 0;
  }
`;
