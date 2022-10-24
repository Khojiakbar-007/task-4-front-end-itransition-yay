import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home.js'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/home"} component={Home} />
      </Switch>
    </div>
  );
}

export default App;

/**
 * My Plan:
 * Step I:
 * finish form in Login and Registration ✅
 * send data through Axios (validate inputs) ✅
 * configure server (validate input with Regular Expressions) ✅
 * deploy to Internet 
 *
 * Step II:
 * JWT authentication ✅ 89%
 * Session encription (with cookies or whatever)
 *
 *  Option II:
 *  implement with Next.JS
 *  NOTE: deployment is easy here
 *
 */
