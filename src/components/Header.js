import React from "react";
import Typical from "react-typical";
//import Switch from "react-switch";

import { useSelector } from "react-redux";

function Header() {
  let name = "";
  let titles = [];

  //const [checked, setChecked] = useState(false);

  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo
/*
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
*/

  let networks = basicInfo?.social.map(function (network) {
    return (
      <span key={network.name} className="m-4" >
        <a href={network.url} target="_blank" rel="noopener noreferrer">
          <i className={network.class} style={{ fontSize: "400%", color: "black", ariaHidden: "true" }}></i>
        </a>
      </span>
    );
  });

  if (basicInfo) {
    name = basicInfo.name;
    titles = basicInfo.titles.map(x => [x.toUpperCase(), 1500]).flat();
  }

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <Typical className="title-styles" steps={titles} loop={50} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, (prevProps, nextProps) => true);

  return (
    <header id="home" style={{ height: '100vh', display: 'block' }}>
      <div className="col-12">
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
    </header>
  );
}

export default Header;
