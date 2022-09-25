import React from "react";
import { Icon } from "@iconify/react";

import javascriptIcon from "@iconify/icons-logos/javascript";
import html5Icon from "@iconify/icons-logos/html-5";
import reactIcon from "@iconify/icons-logos/react";
import TextareaAutosize from 'react-textarea-autosize';

import { useSelector } from "react-redux";

function About() {
  let profilepic = "";
  let sectionName = "";
  let descriptionHeader = "";
  let description = "";


  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo

  if (basicInfo) {
    profilepic = "/images/" + basicInfo.image;
    sectionName = basicInfo.sectionName.about;
    descriptionHeader = basicInfo.descriptionHeader;
    description = basicInfo.description;
  }

  return (
    <section id="about">
      <div className="col-md-12">
        <h1 style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="polaroid">
              <span style={{ cursor: "auto" }}>
                <img
                  height="250px"
                  src={profilepic}
                  alt="Avatar placeholder"
                />
                <Icon
                  icon={html5Icon}
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon={javascriptIcon}
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon={reactIcon}
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
              </span>
            </div>
          </div>

          <div className="col-md-8 center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br />
                  <span className="wave">{descriptionHeader}</span>
                  <br />
                  <br />
                  <TextareaAutosize
                    style={{
                      width: "100%",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      fontSize: "16px"
                    }}
                    minRows="12"
                    readOnly="readonly"
                    defaultValue={description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
