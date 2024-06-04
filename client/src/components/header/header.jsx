import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";

import React from "react";
import style from "./header.module.css";

const options = [
  { key: 1, text: "Login", value: "login", as: Link, to: "/login" },
  { key: 2, text: "Register", value: "register", as: Link, to: "/register" },
];

const Header = () => {
  return (
    <header>
      <div className={style.nav}>
        <h1 className={style.logo}>
          <i className="large book icon"></i>
        </h1>
        <Menu>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/test">
            Test
          </Menu.Item>
          <Menu.Item as={Link} to="/test">
            Test
          </Menu.Item>
          <Menu.Item as={Link} to="/test">
            Test
          </Menu.Item>
        </Menu>
        <Menu compact>
          <Dropdown text="Chưa có tài khoản?" options={options} simple item />
        </Menu>
      </div>
    </header>
  );
};

export default Header;
