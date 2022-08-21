import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import "../App.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import EditExperience from "../components/EditExperience";
import Projects from "../components/Projects";
import EditSkills from "../components/EditSkills";
import DialogModal from "../components/DialogModal"

function Edit(props) {
  let { resumeId } = useParams();

  const [localResumeData, setLocalResumeData] = useState({});
  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});

  const resumeDataRef = useRef();
  const dialogModalRef = useRef()

  useEffect(() => {
    loadResumeData();
    loadSharedData();
    applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
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
      dataType: "json",
      cache: false,
      success: function (data) {
        setLocalResumeData(data);
      },
      error: function (xhr, status, err) {
      },
    });
  }

  const loadSharedData = () => {
    $.ajax({
      url: `/portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        setSharedData(data);
        document.title = `${data.basic_info.name}`;
      },
      error: function (xhr, status, err) {
      },
    });
  }

  const loadResumeData = () => {
    $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/resumes/${resumeId}`,
      dataType: "json",
      cache: false,
      success: function (response) {
        resumeDataRef.current = response.body
        setResumeData(response.body)
      },
      error: function (xhr, status, err) {
      },
    });
  }

  const putResumeData = () => {
    $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/resumes/${resumeId}`,
      dataType: 'json',
      type: 'put',
      contentType: 'application/json',
      data: JSON.stringify(resumeDataRef.current),
      processData: false,
      success: function (data, status, jqXHR) {
        dialogModalRef.current.show();
      },
      error: function (jqXHR, status, error) {
      }
    });
  }

  const skillsChangeCB = (newSkills) => {
    resumeDataRef.current.skills = newSkills
  }

  if (localResumeData === {} || resumeData === {} || sharedData === {}) {
    return (<></>)
  }

  return (
    <div>
      <Header sharedData={resumeData.basicInfo} />
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
      <About
        resumeBasicInfo={resumeData.basicInfo}
        sharedBasicInfo={resumeData.basicInfo}
      />
      <Projects
        resumeProjects={resumeData.projects}
        resumeBasicInfo={resumeData.basicInfo}
      />
      <EditSkills
        sharedSkills={resumeData.skills}
        skillsChangeCb={skillsChangeCB}
        resumeBasicInfo={resumeData.basicInfo}
      />
      <EditExperience
        resumeExperience={resumeData.experience}
        resumeBasicInfo={resumeData.basicInfo}
      />
      <Footer sharedBasicInfo={resumeData.basicInfo} />

      <section id="updateResume">
        <div className="d-flex col-12" >
          <div className="col-5 mx-auto btn-update-resume">
            <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black">Back</span>
            </h1>
          </div>
          <div
            className="col-5 mx-auto btn-update-resume"
            onClick={putResumeData} data-bs-toggle="modal" >
            <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black">Save</span>
            </h1>
          </div>
        </div>
        <DialogModal ref={dialogModalRef} title={"Message"} message={"Successfully Saved !"} />
      </section>
      <button onClick={() => console.log("resumeData " + JSON.stringify(resumeData))}>print</button>
    </div>
  );
}

export default Edit;
