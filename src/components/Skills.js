import React from "react";

function Skills(props) {
  let sectionName = "";
  let skills = [];

  if (props.sharedSkills && props.resumeBasicInfo) {
    sectionName = props.resumeBasicInfo.section_name.skills;
    skills = props.sharedSkills.map(function (skill, i) {
      return skill.select ? (
        <li className="list-inline-item mx-3" key={i}>
          <span>
            <div className="text-center skills-tile">
              <i className={skill.class} style={{ fontSize: "220%" }}>
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
