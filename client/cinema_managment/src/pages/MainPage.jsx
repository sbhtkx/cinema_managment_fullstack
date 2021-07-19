import React from "react";
import { useLocation } from "react-router-dom";
import MoviesPage from "./MoviesPage";
import SubscriptionPage from "./SubscriptionPage";
import ManageUsersPage from "./ManageUsersPage";
import MenuComp from "../components/main_components/MenuComp";
import HomeComp from "../components/main_components/HomeComp";
import ScrollUpButtonComp from "../components/general_components/ScrollUpButtonComp";
import useSessionTimeOutLogOut from "../hooks/useSessionTimeOutLogOut";

const MainPage = () => {
  const location = useLocation();

  let page = null;
  const currentPath = location.pathname;
  if (currentPath === "/") {
    page = <HomeComp />;
  } else if (currentPath.startsWith("/movies")) {
    page = <MoviesPage />;
  } else if (currentPath.startsWith("/subscriptions")) {
    page = <SubscriptionPage />;
  } else if (currentPath.startsWith("/manageUsers")) {
    page = <ManageUsersPage />;
  }

  useSessionTimeOutLogOut();

  return (
    <div>
      <MenuComp />
      {page}
      <ScrollUpButtonComp />
    </div>
  );
};

export default MainPage;
