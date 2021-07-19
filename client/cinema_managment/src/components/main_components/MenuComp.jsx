import React from "react";
import { Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, isAdmin } from "../../helpers/authHelpers";
import useSessionTimeOutLogOut from "../../hooks/useSessionTimeOutLogOut";

const MenuComp = () => {
  const remainedTime = useSessionTimeOutLogOut();
  const history = useHistory();
  const username = useSelector((state) => state.auth.username);

  return (
    <Navbar expand="md" className="p-2" bg="primary" variant="dark">
      <Navbar.Brand
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/");
        }}
      >
        Cinema Managment
      </Navbar.Brand>

      <Navbar.Collapse>
        <Nav className="container-fluid">
          <Nav.Link
            onClick={() => {
              history.push("/movies");
            }}
          >
            Movies
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/subscriptions");
            }}
          >
            Subscription
          </Nav.Link>
          {isAdmin() ? (
            <Nav.Link
              onClick={() => {
                history.push("/manageUsers");
              }}
            >
              Users Managment
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>

      <Nav>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id="button-tooltip" {...props}>
              Time before logout: {remainedTime} minutes
            </Tooltip>
          )}
        >
          <Navbar.Text className="ms-auto" style={{ color: "gold" }}>
            Signed in as: {username}
          </Navbar.Text>
        </OverlayTrigger>
        <Nav.Link
          onClick={() => {
            logout(() => {
              history.push("/");
            });
          }}
        >
          Log Out
        </Nav.Link>
      </Nav>
      <Navbar.Toggle />
    </Navbar>
  );
};

export default MenuComp;
