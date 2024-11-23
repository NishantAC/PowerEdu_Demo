import React, { useDebugValue, useEffect, useState } from "react";
import Folder from "./PaperFolder/Folder";
import "./TeacherExam.css";
import UploadPaper from "./PaperUpload/UploadPaper";
import PaperFilter from "./PaperUpload/PaperFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPapers } from "../../../slices/questionpaper";

function TeacherExam() {
  const { user } = useSelector((state) => state.user);
  const { papers } = useSelector((state) => state.questionpaper);
  const [filteredPapers, setFilteredPapers] = useState(papers)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPapers({ schoolcode: user?.schoolcode }));
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredPapers(papers)
  }, [papers])
  const groupedPapers = filteredPapers?.reduce((groups, paper) => {
    const { classid, examtype, academicyear } = paper;
    const key = `Class-${classid} ${examtype} ${academicyear}`;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(paper);

    return groups;
  }, {});

  console.log(groupedPapers);

  return (
    <div className="tchrexam">
      <div>
        <p
          style={{
            marginTop: "28px",
            fontfamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "21px",
            color: "#4D4D4D",
          }}
        >
          Home &gt;
          <b>
            {" "}
            <u>Question Papers</u>
          </b>
        </p>
      </div>
      <div style={{ marginTop: "60px", display: "flex" }}>
        <h3 style={{ fontSize: "25px" }}>Question Papers</h3>
        <div className="d1">
          <UploadPaper />
        </div>
      </div>
      <PaperFilter papers={papers} setFilteredPapers={setFilteredPapers}/>
      <div className="folderparent">
        {Object.entries(groupedPapers).map(([key, papers]) => (
          <Folder key={key} groupKey={key} papers={papers} />
        ))}

        {/* <Folder/> */}
      </div>
    </div>
  );
}

export default TeacherExam;
