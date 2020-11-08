import "./App.css";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const routes = [
  { id: 1, component: Home, path: "/", exact: true, name: "Home" },
];

function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <a href={route.path}>{route.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route key={route.id} {...route} />
          ))}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
