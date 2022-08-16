import React, { forwardRef } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ForwardItem = forwardRef(({ id, ...props }, ref) => {
  return <div {...props} ref={ref}></div>;
});

function SortableItem(props) {
  let work = props.work;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: "transparant",
    opacity: isDragging ? 0.3 : 1,
    marginTop: props.index === 0 ? "5px" : "40px",
  };

  if (work) {
    const technologies = work.technologies;
    const mainTechnologies = work.mainTech;

    let tech = technologies.map((technology, i) => {
      return (
        <Badge pill className="experience-badge mr-2 mb-2" key={i}>
          {technology}
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
          icon={<i className="fab fa-angular experience-icon"></i>}
          key={props.id}
        >
          <div style={{ display: "flex" }}>
            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left", width: "80%" }}
            >
              <input value={work.title} style={{ width: "100%", textAlign: "left", backgroundColor: "transparent", borderColor: "whitesmoke" }} />
            </h3>
            <span style={{ flexGrow: "1" }} />
            <div {...listeners} {...attributes} className="btn btn-outline-secondary" style={{ margin: "auto 0", touchAction: "none" }}>
              <i className="fa fa-arrows-v" style={{ fontSize: "20px" }}></i>
            </div>
          </div>

          <h4
            className="vertical-timeline-element-subtitle"
            style={{ textAlign: "left" }}
          >
            {work.company}
          </h4>
          <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          <h6
            className="vertical-timeline-element-subtitle"
            style={{ textAlign: "left", marginTop: "10px" }}
          >
            {work.years}
          </h6>
          <button className="btn btn-outline-secondary" style={{ fontSize: "14px", marginTop: "10px" }}>
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
