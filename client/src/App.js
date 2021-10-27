import "./App.css";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import { userContext } from "./contexts/userContext/userContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { user, dispatch } = useContext(userContext);
  console.log(user);
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!user ? (
          <div>
            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: "bold" }}>MERN STACK LOGIN SYSTEM</p>
            </div>
            <div
              style={{
                position: "absolute",
                display: "inline-block",
                left: "92vw",
              }}
            >
              <button
                onClick={() => dispatch({ type: "LOGOUT" })}
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "2.3rem",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />
      <Switch>
        <Route exact path="/">
          <div style={{ textAlign: "center" }}>
            {!user ? (
              <p>Please login or register</p>
            ) : (
              <p>You already loged in</p>
            )}
          </div>
        </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute
          exact
          path="/home"
          component={HomePage}
          isAuth={user ? true : false}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
