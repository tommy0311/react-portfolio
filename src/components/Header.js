import React, { useState } from "react";
import Typical from "react-typical";
import Switch from "react-switch";

import { useSelector } from "react-redux";

function Header() {
  let name = "";
  let titles = [];

  const [checked, setChecked] = useState(false);

  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo

  function onThemeSwitchChange(checked) {
    setChecked(checked);
    setTheme();
  }

  let networks = basicInfo?.social.map(function (network) {
    return (
      <span key={network.name} className="m-4" >
        <a href={network.url} target="_blank" rel="noopener noreferrer">
          <i className={network.class} style={{ fontSize: "400%", color: "black", ariaHidden: "true" }}></i>
        </a>
      </span>
    );
  });

  function setTheme() {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  if (basicInfo) {
    name = basicInfo.name;
    titles = basicInfo.titles.map(x => [x.toUpperCase(), 1500]).flat();
  }

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <Typical className="title-styles" steps={titles} loop={50} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, (prevProps, nextProps) => true);

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
        <div className="col-12">
          <div>
            <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
            <br />
            <h1 className="mb-0">
              <Typical steps={[name]} wrapper="p" />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
            {networks}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
