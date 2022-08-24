import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { showModal } from "../store/slice/modal";
import { updateResume } from "../store/slice/resume";

const ForwardItem = forwardRef(({ id, ...props }, ref) => {
  return <div {...props} ref={ref}></div>;
});

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const dispatch = useDispatch();
  const resume = useSelector(state => {
    return state.resume.payload
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: "transparant",
    opacity: isDragging ? 0.3 : 1,
    marginTop: props.index === 0 ? "5px" : "40px",
  };

  const showDeleteModal = (index) => {
    const newResume = JSON.parse(JSON.stringify(resume));
    newResume.body.experience.splice(index, 1);

    dispatch(showModal(
      {
        name: "deleteWorkModal",
        title: "Message",
        message: "Do you want to delete this item?",
        btn2Label: "Yes",
        btn1Label: "No",
        newResume: newResume
      }
    ))
  }

  const handleInputChange = (index, keyName, event) => {
    const newResume = JSON.parse(JSON.stringify(resume));
    newResume.body.experience[index][keyName] = event.target.value;
    dispatch(updateResume(newResume))
  }

  const handleTechOnClick = (techIndex) => {
    const newResume = JSON.parse(JSON.stringify(resume));
    const technologies = newResume.body.experience[props.index].technologies
    technologies[techIndex].select = !technologies[techIndex].select
    dispatch(updateResume(newResume))
  }


  if (resume) {
    const experience = resume.body.experience[props.index]
    const technologies = resume.body.experience[props.index].technologies;

    let techs = technologies.map((tech, techIndex) => {
      const badgeClassName = tech.select ? "experience-badge-on mr-2 mb-2" : "experience-badge-off mr-2 mb-2"

      return (
        <Badge pill className={badgeClassName} key={techIndex}>
          <button key={`btn-${techIndex}`} className="btn-edit-techs" onClick={() => handleTechOnClick(techIndex)}>
            {tech.name}
          </button>
        </Badge>
      );
    });
    return (
      <ForwardItem ref={setNodeRef} style={style} >
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ width: "80%" }}
          iconStyle={{
            background: "#AE944F",
            color: "#fff",
            textAlign: "center",
          }}
          icon={<i className="fab experience-icon"></i>}
          key={props.id}
        >
          <div style={{ display: "flex" }}>
            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left", width: "70%" }}
            >
              <input
                style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }}
                defaultValue={experience.company}
                onChange={event => handleInputChange(props.index, "company", event)}
              />
            </h3>
            <span style={{ flexGrow: "1" }} />
            <div {...listeners} {...attributes} className="btn btn-outline-secondary" style={{ margin: "auto 0", touchAction: "none" }}>
              <i className="fa fa-arrows-v" style={{ fontSize: "20px" }}></i>
            </div>
          </div>
          <h3
            className="vertical-timeline-element-title"
            style={{ textAlign: "left", marginTop: "10px" }}
          >
            <input
              style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }}
              defaultValue={experience.title}
              onChange={event => handleInputChange(props.index, "title", event)}
            />
          </h3>
          <div className="form-outline">
            <textarea
              className="form-control{border-width: 2px; border-color: grey;} mt-4 col-12"
              id="textArea1"
              rows="8"
              defaultValue={experience.description}
              onChange={event => handleInputChange(props.index, "description", event)}
            />
          </div>
          <div style={{ textAlign: "left", marginTop: "15px" }}>{techs}</div>
          <h3
            className="vertical-timeline-element-subtitle"
            style={{ textAlign: "left", marginTop: "10px" }}
          >
            <input
              style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }}
              defaultValue={experience.years}
              onChange={event => handleInputChange(props.index, "years", event)}
            />
          </h3>
          <button
            className="btn btn-outline-secondary"
            style={{ fontSize: "14px", marginTop: "10px" }}
            onClick={() => showDeleteModal(props.index)}>
            delete
          </button>
        </VerticalTimelineElement >
      </ForwardItem >
    );
  }

  return (
    <></>
  );
}

export default SortableItem;
