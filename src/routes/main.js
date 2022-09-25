import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import $ from "jquery";

import { userLogout } from "../store/slice/user";
import "../App.scss";


function Main() {
  let cards = null
  const dispatch = useDispatch();

  const [resumes, setResumes] = useState([])

  const user = useSelector(state => {
    return state.user
  });
  const userPayload = user.payload

  useEffect(() => {
    fetchResumes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(userLogout())
  }

  const fetchResumes = () => {
    $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/resumes`,
      type: "get",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      dataType: "json",
      cache: false,
      success: function (response) {
        response.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        setResumes(response)
        return
      },
      error: function (xhr, status, err) {
        throw err
      },
    });
  }

  if (resumes.length > 0) {
    cards = resumes.map((resume, index) => {
      return (
        <div
          className="mb-5 px-3"
          key={index}
          style={{ cursor: "pointer", backgroundColor: "whitesmoke", minWidth: "25vw", borderStyle: "solid" }}
        >
          <span className="portfolio-item d-block">
            <div>
              <p className="project-title-settings mt-5" style={{ fontSize: "24px" }}>
                {resume.name}
              </p>
            </div>
            <Container className="d-flex flex-column align-items-center">
              <Link
                className="col-10 my-3"
                style={{ fontSize: "24px", color: "black", borderStyle: "solid", padding: "10px" }}
                to={`/edit/${resume.resumeId}`}>
                EDIT
              </Link>
              <Link
                className="col-10 my-3"
                style={{ fontSize: "24px", color: "black", borderStyle: "solid", padding: "10px" }}
                to={`/raw/${resume.resumeId}`}>
                RAW
              </Link>
              <Link
                className="col-10 my-3"
                style={{ fontSize: "24px", color: "black", borderStyle: "solid", padding: "10px" }}
                to={`/show/${resume.resumeId}`}>
                OPEN
              </Link>
            </Container>
          </span>
        </div>
      )
    })
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container className="d-flex col-12" >
          <Navbar.Brand style={{ fontSize: "24px" }} href="#">SMART RESUME</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleLogout} style={{ fontSize: "24px" }} href="#">logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1 className="col-12 center mb-5">{userPayload.account}`s resumes</h1>

      <Container className="d-flex flex-wrap justify-content-between">
        {cards}
      </Container> 

    </div>
  );

}

export default Main;
