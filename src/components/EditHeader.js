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
      <span key={network.name} className="mx-4" >
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
    <header id="home" style={{ minHeight: "100vh", display: 'block' }}>

      <div className="col-12">

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
            <div className="title-container my-4 ">
              <input
                className="wave "
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
            {networks}
          </div>


    </header>
  );
}

export default EditHeader;
