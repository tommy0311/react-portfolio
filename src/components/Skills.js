import React from "react";
import { useSelector } from "react-redux";

function Skills() {
  let sectionName = "";
  let skills = [];

  const resume = useSelector(state => {
    return state.resume
  });

  const basicInfo = resume.payload?.body.basicInfo
  const resumeskills = resume.payload?.body.skills

  if (basicInfo) {
    sectionName = basicInfo.sectionName.skills;
    skills = resumeskills.map(function (skill, i) {
      return skill.select ? (
        <li className="list-inline-item mx-3" key={i}>
          <span>
            <div className="text-center skills-tile btn-edit-skills-on">
              <i className={skill.class} style={{ fontSize: "220%", color: "#000000" }}>
                <p
                  className="text-center"
                  style={{ fontSize: "30%", marginTop: "4px" }}
                >
                  {skill.name}
                </p>
              </i>
            </div>
          </span>
        </li>
      ) : null;
    });
  }

  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-white">{sectionName}</span>
          </h1>
        </div>
        <div className="col-md-12 text-center">
          <ul className="list-inline mx-auto skill-icon">{skills}</ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
