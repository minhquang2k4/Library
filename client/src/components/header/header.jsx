import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";

const Header = () => {
  const username = localStorage.getItem("username");
  
  const handleLogout = () => {
    localStorage.removeItem("username");
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.setItem("auth", false);
    window.location.href = "/login";
  };

  return (
    <header>
      <div className={style.nav}>
        <i className="huge book icon"></i>
        <Menu>
          <Menu.Item as={Link} to="/">
            Trang chủ
          </Menu.Item>
          <Menu.Item as={Link} to="/yourbooks">
            Sách của bạn
          </Menu.Item>
          <Menu.Item as={Link} to="/thongke">
            Thống kê
          </Menu.Item>
        </Menu>
        <Menu compact>
          {username ? (
            <Dropdown
              text={username}
              options={[{ key: 1, text: "Logout", value: "logout" }]}
              simple
              item
              onChange={(e, { value }) => {
                if (value === "logout") {
                  handleLogout();
                }
              }}
            />
          ) : (
            <Dropdown
              text="Tài khoản"
              options={[
                {
                  key: 1,
                  text: "Login",
                  value: "login",
                  as: Link,
                  to: "/login",
                },
                {
                  key: 2,
                  text: "Register",
                  value: "register",
                  as: Link,
                  to: "/register",
                },
              ]}
              simple
              item
            />
          )}
        </Menu>
      </div>
    </header>
  );
};

export default Header;

