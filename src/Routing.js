import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";

function Routing() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className={`container`}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Routing;
