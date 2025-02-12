import React, { useEffect, useState } from "react";
import Section from "./Section";

const AddSectionsModal = ({
  isClassesModalOn,
  updatedClasses,
  setUpdatedClasses,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: "104%",
        height: "200px",
        backgroundColor: "white",
        borderRadius: "5px",
        zIndex: "10",
        overflowY: "auto",
      }}
    >
      {updatedClasses?.map((classElement, index) => (
        <div key={index}>
          <Section
            classNo={classElement.classNumber}
            updatedClasses={updatedClasses}
            setUpdatedClasses={setUpdatedClasses}
          />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 0px",
          backgroundColor: "#204DF9",
          color: "white",
          gap: "5px",
          userSelect: "none",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "white",
            color: "#204DF9",
            height: "20px",
            width: "20px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            const nextClass = {
              classNumber: updatedClasses.length + 1,
              sections: [],
            };
            if (updatedClasses.length <= 20) {
              const updatedClassesObj = updatedClasses.slice(0, -1);
              setUpdatedClasses(updatedClassesObj);
            }
          }}
        >
          -
        </div>
        <div>Add/Remove Class</div>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "white",
            color: "#204DF9",
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
            const nextClass = {
              classNumber: updatedClasses.length + 1,
              sections: [],
            };
            if (updatedClasses.length <= 20) {
              const updatedClassesObj = [...updatedClasses, nextClass];
              setUpdatedClasses(updatedClassesObj);
            }
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default AddSectionsModal;
