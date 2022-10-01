import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import $ from "jquery";

import { REACT_APP_APISERVER_BASE_URL } from "../config/config"
import { fetchResumeById } from "../store/slice/resume";
import DialogModal from "../components/DialogModal"
import { showModal } from "../store/slice/modal";

import "../App.scss";


function EditRaw() {
  let { resumeId } = useParams();
  const navigate = useNavigate();
  const fetchTimeRef = useRef(Date.now());

  const dispatch = useDispatch();
  const resume = useSelector(state => {
    return state.resume
  });
  const resumePayload = resume.payload
  const resumeBody = resume.payload?.body
  const resumeBodyRef = useRef(null)

  useEffect(() => {
    dispatch(fetchResumeById(resumeId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resumeBodyRef.current = JSON.stringify(resume.payload?.body)
  }, [resume]);

  const handleInputChange = (event) => {
    resumeBodyRef.current = event.target.value
  }

  const putResumeBody = () => {
    $.ajax({
      url: `${REACT_APP_APISERVER_BASE_URL}/api/resumes/${resumeId}`,
      type: 'put',
      dataType: 'json',
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      contentType: 'application/json',
      data: resumeBodyRef.current,
      processData: false,
      success: function (data, status, jqXHR) {
        dispatch(showModal(
          {
            name: "updateReumseModal",
            title: "Message",
            message: "Successfully Saved !",
            btn1Label: "Ok",
          }
        ))
      },
      error: function (jqXHR, status, error) {
        dispatch(showModal(
          {
            name: "updateReumseModal",
            title: "Message",
            message: error,
            btn1Label: "Ok",
          }
        ))
      }
    });
  }

  if (!resumePayload || resumePayload.updateTime <= fetchTimeRef.current) {
    return
  }

  return (
    <div style={{ height: "100vh" }}>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container className="d-flex col-12" >
          <Navbar.Brand style={{ fontSize: "24px" }} href="#">SMART RESUME</Navbar.Brand>
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
