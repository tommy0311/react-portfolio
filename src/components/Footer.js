import React from "react";
import { useSelector } from "react-redux";


function Footer() {
  //let networks = [];

  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo

  if (basicInfo) {
    /*
    networks = basicInfo.social.map(function (network) {
      return (
        <span key={network.name} className="m-4">
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.class}></i>
          </a>
        </span>
      );
    });*/
  }

  return (
    <footer>
      <div className="col-md-12 py-5">
        {/*<div className="social-links">{networks}</div>*/}

        <div className="copyright  text-center">
          <div className="container">
            {basicInfo
              ? (<small> Copyright &copy;{" "} {basicInfo.name} </small>)
              : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
