import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateResume } from "../store/slice/resume";

function EditSkills() {
  let sectionName = "";
  let icons = [];

  const dispatch = useDispatch();
  const resume = useSelector(state => {
    return state.resume.payload
  });

  const onClickCB = (index) => {
    const newResume = JSON.parse(JSON.stringify(resume));
    newResume.body.skills[index].select = !newResume.body.skills[index].select;
    dispatch(updateResume(newResume))
  }

  if (resume) {
    sectionName = resume.body.basicInfo.sectionName.skills;
    icons = resume.body.skills.map((skill, index) => {
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
