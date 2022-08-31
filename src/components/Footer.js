import React from "react";
import { useSelector } from "react-redux";


function Footer() {
  //let networks = [];

  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo

  return (
    <footer>
      <div className="d-flex center col-12 my-5">
        <div className="copyright  text-center">
          <div className="container">
            {basicInfo
              ? (<small> Copyright &copy;{" "} {basicInfo.name} </small>)
              : null}
          </div>
        </div>
        <span key="home" className="m-4" >
          <a href="/" target="_self" rel="noopener noreferrer">
            <i className="fa fa-home" style={{ fontSize: "200%", color: "whitesmoke", ariaHidden: "true" }}></i>
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;