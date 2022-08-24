import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { updateResume } from "../store/slice/resume";

const EditExperience = (props) => {
  let sectionName = "";
  let works = [];

  const [, setActiveId] = useState(null);
  const dispatch = useDispatch();
  const resume = useSelector(state => {
    return state.resume.payload
  });

  const experience = resume ? resume.body.experience : []

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = experience.findIndex(item => item.id === active.id)
      const newIndex = experience.findIndex(item => item.id === over.id)
      const newArray = arrayMove(experience, oldIndex, newIndex);

      const newResume = JSON.parse(JSON.stringify(resume));
      newResume.body.experience = newArray;
      dispatch(updateResume(newResume))
    }
    setActiveId(null);
  };

  const createNewWork = () => {
    const newResume = JSON.parse(JSON.stringify(resume));
    newResume.body.experience.unshift({
      id: (Date.now() + Math.random()).toString(36),
      company: 'My Company1',
      title: 'My Title',
      years: '2020 - Present',
      createdAt: Date.now(),
      technologies: []
    });
    dispatch(updateResume(newResume))
  }

  if (resume) {
    sectionName = resume.body.basicInfo.sectionName.experience;
    works = experience.map((work, index) => {
      return (
        <SortableItem
          work={work}
          key={work.id}
          id={work.id}
          index={index}
          handle={true}
        />);
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="col-md-8 mx-auto">

          <Badge pill className="experience-badge" >
            <button
              className="btn-new-experience"
              onClick={createNewWork}>
              NEW
            </button>
          </Badge>

          <VerticalTimeline layout={"1-column-left"}>
            <SortableContext items={experience} strategy={verticalListSortingStrategy}>
              {works}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
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
            </SortableContext>
          </VerticalTimeline>
        </div>
      </DndContext>
    </section>

  );
}

export default EditExperience;