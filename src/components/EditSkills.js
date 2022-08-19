import React, { useState, useEffect } from "react";

function EditSkills(props) {
  let sectionName = "";
  let icons = [];

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (props.sharedSkills && props.resumeBasicInfo) {
      const newSkills = [...props.sharedSkills]
      setSkills(newSkills);
    }
  }, [props])

  const onClickCB = (index) => {
    setSkills(skills => {
      skills[index].select = !skills[index].select;

      const newSkills = [...skills]
      props.skillsChangeCb(newSkills)
      return newSkills;
    })
  }

  if (props.sharedSkills && props.resumeBasicInfo) {
    sectionName = props.resumeBasicInfo.section_name.skills;
    icons = skills.map((skill, index) => {
      return (
        <button key={`btn-${index}`} className={skill.select === true ? "btn-edit-skills-on" : "btn-edit-skills-off"}
          onClick={() => onClickCB(index)}>
          <li className="list-inline-item mx-1" key={`li-${index}`}>
            <span>
              <div className="text-center skills-tile">
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
        </button>
      );
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
          <ul className="list-inline mx-auto skill-icon">{icons}</ul>
        </div>
      </div>
    </section>
  );
}

export default EditSkills;
