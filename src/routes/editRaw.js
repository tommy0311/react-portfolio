import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import $ from "jquery";

import { fetchResumeById, fetchTechnologies } from "../store/slice/resume";
import DialogModal from "../components/DialogModal"
import { showModal } from "../store/slice/modal";

import "../App.scss";


function EditRaw() {
  let { resumeId } = useParams();
  const navigate = useNavigate();
  const mountedRef = useRef(false);

  const dispatch = useDispatch();
  const resume = useSelector(state => {
    return state.resume
  });
  const resumePayload = resume.payload
  const resumeBody = resume.payload?.body
  const resumeBodyRef = useRef("")

  useEffect(() => {
    mountedRef.current = true;
    dispatch(fetchResumeById(resumeId))
  }, []);


  const handleInputChange = (event) => {
    resumeBodyRef.current = event.target.value
  }

  const putResumeBody = () => {
    $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/resumes/${resumeId}`,
      dataType: 'json',
      type: 'put',
      contentType: 'application/json',
      data: resumeBodyRef.current,
      processData: false,
      success: function (data, status, jqXHR) {
        dispatch(showModal(
          {
            name: "updateReumseOkModal",
            title: "Message",
            message: "Successfully Saved !",
            btn1Label: "Ok",
          }
        ))
      },
      error: function (jqXHR, status, error) {
      }
    });
  }

  if (!mountedRef.current) {
    return
  }

  return (
    <div style={{ height: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container className="d-flex col-12" >
          <Navbar.Brand style={{ fontSize: "24px" }} href="#">SMART RESUME</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={{ fontSize: "24px" }} href="#home">logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="col-11 center" >
        <textarea
          className="col-11 p-3"
          style={{
            textAlign: "left",
            backgroundColor: "transparent",
            borderColor: "black",
            fontSize: "20px",
            height: "70vh",
          }}
          defaultValue={JSON.stringify(resumeBody, undefined, 4)}
          onChange={event => handleInputChange(event)}
        />

      </Container>
      <Container className="d-flex col-11 center" >
        <div
          className="col-5 mx-auto btn-update-resume"
          onClick={() => navigate(-1)}
        >
          <span className="center my-3" style={{ fontSize: "20px" }}>BACK</span>
        </div>

        <div
          className="col-5 mx-auto btn-update-resume"
          onClick={putResumeBody} >
          <span className="center my-3" style={{ fontSize: "20px" }}>SAVE</span>
        </div>
      </Container>
      <DialogModal />
    </div>
  );

}

export default EditRaw;
