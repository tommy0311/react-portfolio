import React from "react";
import { useSelector } from "react-redux";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import TextareaAutosize from 'react-textarea-autosize';

function Experience() {
  let sectionName = "";
  let works = [];

  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo
  const experience = resume.payload?.body ? resume.payload?.body.experience : []


  if (resume.payload && basicInfo) {

    sectionName = basicInfo.sectionName.experience;
    works = experience.map((work, workIndex) => {
      const technologies = work.technologies;

      let techs = technologies.map((tech, techIndex) => {
        return tech.select ? (
          <Badge pill className="experience-badge mr-2 mb-2" key={techIndex}>
            {tech.name}
          </Badge>) : null
      });

      return (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ width: "80%" }}
          iconStyle={{
            background: "#AE944F",
            color: "#fff",
            textAlign: "center",
          }}
          icon={<i className="fab experience-icon"></i>}
          key={workIndex}
        >
          <h1
            className="vertical-timeline-element-title ml-3 my-1"
            style={{ textAlign: "left" }}
          >
            {work.title}
          </h1>
          <h3
            className="vertical-timeline-element-subtitle ml-3 mt-3"
            style={{ textAlign: "left" }}
          >
            {work.company}
          </h3>
          <TextareaAutosize
            className="mt-4 p-3"
            style={{
              width: "100%",
              textAlign: "left",
              backgroundColor: "transparent",
              borderColor: "black",
              fontSize: "20px",
            }}
            readOnly="readonly"
            defaultValue={work.description}
          />
          <div className="ml-1" style={{ textAlign: "left", marginTop: "15px" }}>{techs}</div>
          <h4
            className="vertical-timeline-element-subtitle ml-1 mt-2"
            style={{ textAlign: "left" }}
          >
            {work.years}
          </h4>
        </VerticalTimelineElement>
      );
    });
  }

  return (
    <section id="resume" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span className="text-black" style={{ textAlign: "center" }}>
              {sectionName}
            </span>
          </h1>
        </div>
      </div>
      <div className="col-md-8 mx-auto">
        <VerticalTimeline layout={"1-column-left"}>
          {works}
          <VerticalTimelineElement
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
              fontSize: "20px"
            }}
            icon={
              <i className="fa fa-hourglass-start"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}></i>
            }
          />
        </VerticalTimeline>
      </div>
    </section>
  );
}

export default Experience;
