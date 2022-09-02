import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import $ from "jquery";

import DialogModal from "../components/DialogModal"
import { showModal } from "../store/slice/modal";

export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const postLogin = (account, password) => {
    $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/login`,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify({ account, password }),
      processData: false,
      success: function (response, status, jqXHR) {
        if (response.status === "success") {
          localStorage.setItem('token', response.token)
        }
        return navigate("/");
      },
      error: function (jqXHR, status, error) {
        dispatch(showModal(
          {
            name: "loginFailModal",
            title: "Message",
            message: "account or password incorrect !",
            btn1Label: "Ok",
          }
        ))
      }
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation()

    postLogin(account, password)
  }


  return (
    <div style={{ height: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container className="d-flex col-12" >
          <Navbar.Brand style={{ fontSize: "24px" }} href="#">SMART RESUME</Navbar.Brand>

        </Container>
      </Navbar>

      <Container className="card col-10 col-sm-5 center" style={{ borderColor: "black", marginTop: "15vh" }}>
        <img id="profile-img" className="profile-img-card mt-5" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar" />
        <p id="profile-name" className="profile-name-card"></p>
        <form className="form-signin col-12 mb-4" id='form-signin' onSubmit={handleOnSubmit}>
          <span id="reauth-account" className="reauth-account"></span>
          <input
            type="account"
            id="inputAccount"
            className="form-control"
            placeholder="Account"
            required autoFocus
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-3" style={{ fontSize: "12px" }}> account: demo</div>
          <div className="mb-1" style={{ fontSize: "12px" }}>password: demo</div>
          <button
            form='form-signin' type="submit"
            className="mx-auto btn-user-login"
          >
            <span className="center my-3" style={{ fontSize: "14px" }}>Login</span>
          </button>
        </form>
      </Container>

      <DialogModal />
    </div>

  );
}