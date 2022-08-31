import React, { useState } from "react";
import Switch from "react-switch";

import { useSelector, useDispatch } from "react-redux";

import { updateResume } from "../store/slice/resume";

function EditHeader() {
  let name = "";
  let titles = [];

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const resume = useSelector(state => {
    return state.resume
  });
  const resumePayload = resume.payload
  const basicInfo = resume.payload?.body.basicInfo

  let networks = basicInfo?.social.map(function (network) {
    return (
      <span key={network.name} className="m-4" >
        <a href={network.url} target="_blank" rel="noopener noreferrer">
          <i className={network.class} style={{ fontSize: "400%", color: "black" }}></i>
        </a>
      </span>
    );
  });

  function onThemeSwitchChange(checked) {
    setChecked(checked);
    setTheme();
  }

  function setTheme() {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  const handleInputChange = (keyName, event) => {
    const newResumePayload = JSON.parse(JSON.stringify(resumePayload));
    if (keyName === "titles") {
      const titleString = String(event.target.value).toUpperCase()
      newResumePayload.body.basicInfo[keyName] = titleString.split(",");
    } else {
      newResumePayload.body.basicInfo[keyName] = event.target.value;
    }

    dispatch(updateResume(newResumePayload))
  }

  if (basicInfo) {
    name = basicInfo.name;
    titles = basicInfo.titles.map(x => x.toUpperCase()).flat();
  }

  return (
    <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
      <div style={{
        position: "absolute",
        top: "2vh",
        right: "2vh"

      }}>
        <Switch
          checked={checked}
          onChange={onThemeSwitchChange}
          offColor="#baaa80"
          onColor="#353535"
          className="react-switch mx-auto"
          width={90}
          height={40}
          uncheckedIcon={
            <span
              className="iconify"
              data-icon="twemoji:owl"
              data-inline="false"
              style={{
                display: "block",
                height: "100%",
                fontSize: 25,
                textAlign: "end",
                marginLeft: "20px",
                color: "#353239",
              }}
            ></span>
          }
          checkedIcon={
            <span
              className="iconify"
              data-icon="noto-v1:sun-with-face"
              data-inline="false"
              style={{
                display: "block",
                height: "100%",
                fontSize: 25,
                textAlign: "end",
                marginLeft: "10px",
                color: "#353239",
              }}
            ></span>
          }
          id="icon-switch"
        />
      </div>
      <div className="row aligner" style={{ height: '100%' }}>
        <div className="col-md-12">
          <div>
            <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
            <br />
            <h1 className="mb-0">
              <input
                className="wave"
                style={{
                  width: "50%",
                  fontSize: "36px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  borderColor: "whitesmoke"
                }}
                defaultValue={name}
                onChange={event => handleInputChange("name", event)}
              />
            </h1>
            <div className="title-container">
              <input
                className="wave my-4"
                style={{
                  width: "80%",
                  fontSize: "24px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  borderColor: "whitesmoke"
                }}
                defaultValue={titles.flat()}
                onChange={event => handleInputChange("titles", event)}
              />
            </div>
          </div>
        </div>
        {networks}
      </div>
    </header>
  );
}

export default EditHeader;
