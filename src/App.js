import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home.js'
import LearningApp from "./pages/Learning";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/learning"} component={LearningApp} />
      </Switch>
    </div>
  );
}

export default App;
