import React, { useState, useEffect } from "react";
import style from "./header.module.css";
import { Link, } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import axios from "axios";

const Header = () => {
  const options = [
    { key: 1, text: "Login", value: "login", as: Link, to: "/login" },
    { key: 2, text: "Register", value: "register", as: Link, to: "/register" },
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    // axios.get('http://localhost:8000/api/check-login')
    //   .then(res => {
    //     if (res.data.user) {
    //       setUser(res.data.user);
    //     }
    //   })
    //   .catch (err => {
    //     console.log(err);
    //   });
  }, []);

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
            Mượn sách
          </Menu.Item>
          <Menu.Item as={Link} to="/test">
            Trả sách
          </Menu.Item>
        </Menu>
        <Menu compact>
        {user ? (
            <Menu.Item>{user.username}</Menu.Item>
          ) : (
            <Dropdown text="Chưa có tài khoản?" options={options} simple item />
          )}
        </Menu>
      </div>
    </header>
  );
};

export default Header;