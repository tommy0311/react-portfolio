import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import $ from "jquery";

import { REACT_APP_APISERVER_BASE_URL } from "../config/config"
import "../App.scss";
import EditHeader from "../components/EditHeader";
import Footer from "../components/Footer";
import EditAbout from "../components/EditAbout";
import EditExperience from "../components/EditExperience";
import Projects from "../components/Projects";
import EditSkills from "../components/EditSkills";
import DialogModal from "../components/DialogModal"
import { fetchResumeById, fetchTechnologies } from "../store/slice/resume";
import { showModal } from "../store/slice/modal";

function Edit() {
  let { resumeId } = useParams();
  const navigate = useNavigate();
  const fetchTimeRef = useRef(Date.now());

  const resume = useSelector(state => {
    return state.resume
  });
  const resumePayload = resume.payload
  const resumeBody = resume.payload?.body

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResumeById(resumeId))
    dispatch(fetchTechnologies())
    //applyPickedLanguage(
    //  window.$primaryLanguage,
    //  window.$secondaryLanguageIconId
    //);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyPickedLanguage = (pickedLanguage, oppositeLangIconId) => {
    swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    let resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `/res_primaryLanguage.json`
        : `/res_secondaryLanguage.json`;
    loadResumeFromPath(resumePath);
  }

  let swapCurrentlyActiveLanguage = (oppositeLangIconId) => {
    let pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }

  const loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      type: "get",
      dataType: "json",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      cache: false,
      success: function (data) {
      },
      error: function (xhr, status, err) {
      },
    });
  }

  const putResumeBody = () => {
    $.ajax({
      url: `${REACT_APP_APISERVER_BASE_URL}/api/resumes/${resumeId}`,
      type: 'put',
      dataType: 'json',
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      contentType: 'application/json',
      data: JSON.stringify(resumeBody),
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
    <div>
      <EditHeader />
      <div className="col-md-12 mx-auto text-center language" style={{ display: "none" }}>
        <div
          onClick={() =>
            applyPickedLanguage(
              window.$primaryLanguage,
              window.$secondaryLanguageIconId
            )
          }
          style={{ display: "inline" }}
        >
          <span
            className="iconify language-icon mr-5"
            data-icon="twemoji-flag-for-flag-united-kingdom"
            data-inline="false"
            id={window.$primaryLanguageIconId}
          ></span>
        </div>
        <div
          onClick={() =>
            applyPickedLanguage(
              window.$secondaryLanguage,
              window.$primaryLanguageIconId
            )
          }
          style={{ display: "inline" }}
        >
          <span
            className="iconify language-icon"
            data-icon="twemoji-flag-for-flag-poland"
            data-inline="false"
            id={window.$secondaryLanguageIconId}
          ></span>
        </div>
      </div>
      <EditAbout />
      <Projects />
      <EditSkills />
      <EditExperience />
      <Footer />
      <DialogModal />

      <section id="updateResume">
        <Container className="d-flex col-11 center" >
          <div
            className="col-5 mx-auto btn-update-resume"
            onClick={() => navigate(-1)}
          >
            <span className="center my-3" style={{ fontSize: "20px" }}>BACK</span>
          </div>
          <div
            className="col-5 mx-auto btn-update-resume"
            onClick={putResumeBody} data-bs-toggle="modal" >
            <span className="center my-3" style={{ fontSize: "20px" }}>SAVE</span>
          </div>
        </Container>

      </section>
    </div>
  );
}

export default Edit;
