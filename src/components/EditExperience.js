import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

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

const EditExperience = (props) => {
  let sectionName = "";
  let works = [];

  const [, setActiveId] = useState(null);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    if (props.resumeExperience && props.resumeBasicInfo) {
      const newExperience = [...props.resumeExperience]
      setExperience(newExperience);
    }
  }, [props])

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
      setExperience((experience) => {
        const oldIndex = experience.findIndex(item => item.id === active.id)
        const newIndex = experience.findIndex(item => item.id === over.id)

        const newArray = arrayMove(experience, oldIndex, newIndex);
        return newArray
      });
    }
    setActiveId(null);
  };

  if (experience.length > 0 && props.resumeBasicInfo) {
    sectionName = props.resumeBasicInfo.section_name.experience;
    works = experience.map((work, index) => {
      return (<SortableItem work={work} key={work.id} id={work.id} index={index} handle={true} />);
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
          <VerticalTimeline layout={"1-column-left"}>
            <SortableContext items={experience} strategy={verticalListSortingStrategy}>
              {works}
              <VerticalTimelineElement
                iconStyle={{
                  background: "#AE944F",
                  color: "#fff",
                  textAlign: "center",
                }}
                icon={
                  <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
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