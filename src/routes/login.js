import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import DialogModal from "../components/DialogModal"

export default function Login() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container className="d-flex col-12" >
          <Navbar.Brand style={{ fontSize: "24px" }} href="#">SMART RESUME</Navbar.Brand>

        </Container>
      </Navbar>

      <Container className="card col-10 col-sm-5 center" style={{ borderColor: "black" }}>
        <img id="profile-img" className="profile-img-card mt-5" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar" />
        <p id="profile-name" className="profile-name-card"></p>
        <form className="form-signin col-12">
          <span id="reauth-account" className="reauth-account"></span>
          <input type="account" id="inputAccount" className="form-control" placeholder="Account" required autofocus />
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div
            className="mx-auto btn-update-resume"
          >
            <span className="center my-3" style={{ fontSize: "14px" }}>Login</span>
          </div>
        </form>
      </Container>

      <DialogModal />
    </div>

  );
}