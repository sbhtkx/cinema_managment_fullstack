import "./App.css";
import { Switch, Route } from "react-router-dom";

// import HeaderComp from "./components/HeaderComp";
// import CreateAccountFormComp from "./components/CreateAccountFormComp";
import LoginPage from "./pages/LoginPage";
// import MenuComp from "./components/MenuComp";
// import UserListComp from "./components/UserListComp";
// import EditUserFormComp from "./components/EditUserFormComp";
import ErrorPage from "./pages/ErrorPage";
import AuthenticatedUserRoute from "./routes/AuthenticatedUserRoute";
import AuthenticatedAdminRoute from "./routes/AuthenticatedAdminRoute";
import MainPage from "./pages/MainPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import SessionTimeOutPage from "./pages/SessionTimeOutPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/createAccoount" component={CreateAccountPage} />
        <Route exact path="/sessionTimeOut" component={SessionTimeOutPage} />
        <AuthenticatedUserRoute exact path="/" component={MainPage} />
        <AuthenticatedUserRoute exact path="/movies" component={MainPage} />
        <AuthenticatedUserRoute
          exact
          path="/subscriptions"
          component={MainPage}
        />
        <AuthenticatedAdminRoute
          exact
          path="/manageUsers"
          component={MainPage}
        />
        <AuthenticatedAdminRoute
          exact
          path="/manageUsers/allUsers"
          component={MainPage}
        />
        <AuthenticatedAdminRoute
          exact
          path="/manageUsers/addUser"
          component={MainPage}
        />
        <AuthenticatedAdminRoute
          exact
          path="/manageUsers/editUser/:id"
          component={MainPage}
        />

        <AuthenticatedUserRoute exact path="/movies" component={MainPage} />
        <AuthenticatedUserRoute
          exact
          path="/movies/allMovies"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/movies/allMovies/:filter"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/movies/addMovie"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/movies/editMovie/:id"
          component={MainPage}
        />

        <AuthenticatedUserRoute
          exact
          path="/subscriptions"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/subscriptions/allMembers/"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/subscriptions/allMembers/:id"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/subscriptions/addMember"
          component={MainPage}
        />
        <AuthenticatedUserRoute
          exact
          path="/subscriptions/editMember/:id"
          component={MainPage}
        />

        <AuthenticatedUserRoute component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
