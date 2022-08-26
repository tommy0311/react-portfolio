import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import $ from "jquery";
import "../App.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

import { fetchResumeById } from "../store/slice/resume";

function Show() {
  let { resumeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResumeById(resumeId))
    applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let applyPickedLanguage = (pickedLanguage, oppositeLangIconId) => {
    swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    let resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `/res_primaryLanguage.json`
        : `/res_secondaryLanguage.json`;
    loadResumeFromPath(resumePath);
  }

  let swapCurrentlyActiveLanguage = (oppositeLangIconId) => {
    var pickedLangIconId =
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

  let loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
      },
      error: function (xhr, status, err) {
      },
    });
  }

  return (
    <div>
      <Header />
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
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Footer />
    </div>
  );

}

export default Show;
