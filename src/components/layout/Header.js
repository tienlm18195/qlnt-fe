import React from "react";
import {TopNavigation} from "@atlaskit/page-layout";
import Avatar from "@atlaskit/avatar";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("userName");
  const avatarUrl = "https://i.pravatar.cc/150?img=3";

  // Xử lý sự kiện Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return <div></div>;
};

export default Header;
