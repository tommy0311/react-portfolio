import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import $ from "jquery";

import "../App.scss";


function Main() {
  let cards = null
  const [resumes, setResumes] = useState([])
  useEffect(() => {
    fetchResumes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResumes = () => {
    $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/resumes`,
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
          className="col-auto mb-5 mx-auto "
          key={index}
          style={{ cursor: "pointer", backgroundColor: "whitesmoke", minWidth: "30%" }}
        >
          <span className="portfolio-item d-block">
            <div>
              <p className="project-title-settings mt-5" style={{ fontSize: "24px" }}>
                {resume.name}
              </p>
            </div>
            <Container className="d-flex flex-column center">
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
            <Nav.Link style={{ fontSize: "24px" }} href="#home">logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="d-flex flex-wrap center">
        {cards}
      </div>
    </div>
  );

}

export default Main;
