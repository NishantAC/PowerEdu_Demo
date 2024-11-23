import React, { useEffect, useState } from "react";

const Section = ({ classNo, updatedClasses, setUpdatedClasses }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        userSelect: "none",
      }}
    >
      <div>{classNo}</div>
      <div
        style={{
          flex: "1",
          // backgroundColor: "blue",
          display: "flex",
          flexWrap: "wrap",
          padding: "0px 5px",
        }}
      >
        {updatedClasses[classNo - 1].sections.map((sectionElement, index) => (
          <div
            key={index}
            title={`Class Teacher: ${
              sectionElement.class_teacher || "NA"
            } \n Student Count:  ${sectionElement.student_count} \n Subjects: ${
              sectionElement.subjects
                ? sectionElement.subjects.join(", ")
                : "NA"
            }`}
          >
            {sectionElement.sectionName}
            {index == updatedClasses[classNo - 1].sections.length - 1
              ? "  "
              : ",  "}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyItems: "center", gap: "8px" }}>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "#ccc",
            height: "20px",
            width: "20px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => {
            const nextLetter = String.fromCharCode(
              65 + updatedClasses[classNo - 1].sections.length
            );
            const nextSection = {
              sectionName: `${classNo}${nextLetter}`,
              class_teacher: "",
              student_count: "0",
              subjects: null,
            };
            if (updatedClasses[classNo - 1].sections.length <= 25) {
              const updatedClassesObj = [...updatedClasses];
              updatedClassesObj[classNo - 1].sections = [
                ...updatedClassesObj[classNo - 1].sections,
                nextSection,
              ];
              setUpdatedClasses(updatedClassesObj);
            }
          }}
        >
          +
        </div>
        <div
          style={{
            width: "15px",
            display: "grid",
            placeContent: "center",
          }}
        >
          {updatedClasses[classNo - 1].sections.length}
        </div>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "#ccc",
            height: "20px",
            width: "20px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            if (updatedClasses[classNo - 1].sections.length > 0) {
              const updatedClassesObj = [...updatedClasses];
              updatedClassesObj[classNo - 1].sections = updatedClassesObj[
                classNo - 1
              ].sections.slice(0, -1);
              setUpdatedClasses(updatedClassesObj);
            }
          }}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default Section;
