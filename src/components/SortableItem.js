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
    return state.resume
  });
  const resumePayload = resume.payload

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: "transparant",
    opacity: isDragging ? 0.3 : 1,
    marginTop: props.index === 0 ? "5px" : "40px",
  };

  const showDeleteModal = (index) => {
    const newResumePayload = JSON.parse(JSON.stringify(resumePayload));
    newResumePayload.body.experience.splice(index, 1);

    dispatch(showModal(
      {
        name: "deleteWorkModal",
        title: "Message",
        message: "Do you want to delete this item?",
        btn2Label: "Yes",
        btn1Label: "No",
        newResume: resumePayload
      }
    ))
  }

  const handleInputChange = (index, keyName, event) => {
    const newResumePayload = JSON.parse(JSON.stringify(resumePayload));
    newResumePayload.body.experience[index][keyName] = event.target.value;
    dispatch(updateResume(newResumePayload))
  }

  const handleTechOnClick = (techIndex) => {
    const newResumePayload = JSON.parse(JSON.stringify(resumePayload));
    const technologies = newResumePayload.body.experience[props.index].technologies
    technologies[techIndex].select = !technologies[techIndex].select
    dispatch(updateResume(newResumePayload))
  }


  if (resumePayload) {
    const experience = resumePayload.body.experience[props.index]
    const technologies = resumePayload.body.experience[props.index].technologies;

    let techs = technologies.map((tech, techIndex) => {
      const badgeClassName = tech.select ? "experience-badge-on mr-2 mb-2" : "experience-badge-off mr-2 mb-2"

      return (
        <Badge pill className={badgeClassName} key={techIndex}>
          <button key={techIndex} className="btn-edit-techs" onClick={() => handleTechOnClick(techIndex)}>
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

          <h1
            className="vertical-timeline-element-title mt-3"
            style={{ textAlign: "left" }}
          >
            <input
              style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }}
              defaultValue={experience.title}
              onChange={event => handleInputChange(props.index, "title", event)}
            />
          </h1>

          <h3
            className="vertical-timeline-element-title mt-3"
            style={{ textAlign: "left" }}
          >
            <input
              style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }}
              defaultValue={experience.company}
              onChange={event => handleInputChange(props.index, "company", event)}
            />
          </h3>

          <div >
            <textarea
              className="mt-4 p-3"
              style={{
                width: "100%",
                textAlign: "left",
                backgroundColor: "transparent",
                borderColor: "black",
                fontSize: "20px",
              }}
              rows="8"
              defaultValue={experience.description}
              onChange={event => handleInputChange(props.index, "description", event)}
            />
          </div>
          <div style={{ textAlign: "left", marginTop: "15px" }}>{techs}</div>
          <h3
            className="vertical-timeline-element-subtitle mt-3"
            style={{ textAlign: "left" }}
          >
            <input
              style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }}
              defaultValue={experience.years}
              onChange={event => handleInputChange(props.index, "years", event)}
            />
          </h3>
          <div style={{ display: "flex" }}>
            <button
              className="btn btn-outline-secondary mt-4"
              style={{ fontSize: "14px" }}
              onClick={() => showDeleteModal(props.index)}>
              delete
            </button>
            <span style={{ flexGrow: "1" }} />
            <div {...listeners} {...attributes} className="btn btn-outline-secondary mt-4" style={{ margin: "auto 0", touchAction: "none" }}>
              <i className="fa fa-arrows-v" style={{ fontSize: "20px" }}></i>
            </div>
          </div>
        </VerticalTimelineElement >
      </ForwardItem >
    );
  }

  return (
    <></>
  );
}

export default SortableItem;
