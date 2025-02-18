import React from "react";
import {TopNavigation} from "@atlaskit/page-layout";
import Avatar from "@atlaskit/avatar";
import {MenuGroup, Section, ButtonItem} from "@atlaskit/menu";
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

  return (
    <TopNavigation id='top-navigation'>
      <div className='flex items-center justify-between w-full px-4'>
        {/* Logo hoặc tiêu đề */}
        <h2
          className='text-xl font-semibold cursor-pointer'
          onClick={() => navigate("/")}>
          My Dashboard
        </h2>

        {/* Avatar và Menu */}
        <div className='flex items-center gap-2 cursor-pointer'>
          <Avatar
            src={avatarUrl}
            size='medium'
            onClick={() => navigate("/profile")}
          />
          <span>{username}</span>
        </div>

        <MenuGroup>
          <Section title='Options'>
            <ButtonItem onClick={() => navigate("/profile")}>
              Profile
            </ButtonItem>
            <ButtonItem onClick={handleLogout}>Logout</ButtonItem>
          </Section>
        </MenuGroup>
      </div>
    </TopNavigation>
  );
};

export default Header;
