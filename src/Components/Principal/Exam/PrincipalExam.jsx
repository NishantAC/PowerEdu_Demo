import React, { useEffect, useState } from "react";
import ExamType from "./ExamType/ExamType";
import "./PrincipalExam.css";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Import ShadCN Accordion components

import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, fetchExamTypes, mergeExamTypes } from "../../../slices/examtype";
import AddNewExamType from "./ExamType/AddNewExamType";
import { getDropdownClasses } from "../../../slices/principal";
import { getDropdownSubjectsByClass } from "../../../slices/subject";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ExamTypeService from "../../../services/examtype.service";
import { toast } from "sonner";

function PrincipalExam() {
  const [activeKey, setActiveKey] = useState("");
  const [classid, setClassid] = useState("1A");
  const [copyClass, setCopyClass] = useState("");

  const { user } = useSelector((state) => state.user);
  const { classes } = useSelector(state => state.principal);

  const { examTypes } = useSelector((state) => state.examtype);
  const [examTypesData, setExamTypesData] = useState(examTypes);
  const [copyData, setCopyData] = useState("");
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);

  const handleMegreDialoge = () => {
    setIsMergeDialogOpen(true);
  };

  useEffect(() => {
    setExamTypesData(examTypes);
  }, [examTypes]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExamTypes({ school_code: user?.school_id, class_code: classid }));
  }, [dispatch, user, classid]);

  useEffect(() => {
    dispatch(getDropdownClasses({ school_id: user?.school_id }));
  }, []);

  useEffect(() => {
    dispatch(getDropdownSubjectsByClass({ school_id: user?.school_id, class_code: classid }));
  }, [classid]);

  const fetchCopyData = async () => {
    if (classid === copyClass) {
      toast.error("Please select a different class", { autoClose: 1000, position: 'bottom-right' });
      return;
    }
    const examtype = await ExamTypeService.fetchExamTypes({ school_code: user?.school_id, class_code: copyClass });
    setCopyData(examtype);
    setExamTypesData(prevExamTypesData => [...prevExamTypesData, ...examtype]);
  };

  const mergeExamTypesAndExams = () => {
    dispatch(mergeExamTypes({ examTypeData: copyData, class_code: classid })).then((result) => {
      if (result.payload) {
        toast.success(result.payload.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearMessage());
      } else {
        toast.error(result.error.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearError());
      }
    });
    setCopyClass("");
    setCopyData("");
    setIsMergeDialogOpen(false);
  };

  const cancelMerge = () => {
    setExamTypesData(examTypes);
    setCopyClass("");
    setCopyData("");
    setIsMergeDialogOpen(false);
  };

  return (
    <div className="prncplexam">
      <div>
        <p
          style={{
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
            <u>Exam Schedule</u>
          </b>
        </p>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <p
          style={{
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "20px",
            color: "#000000",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          Filters:-{" "}
        </p>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <select
          disabled={copyData}
          style={{
            borderRadius: "5px",
            fontSize: "17px",
            padding: "4px 10px",
            color: "#414141",
          }}
          value={classid}
          onChange={(e) => setClassid(e.target.value)}
        >
          <option value="">Class</option>
          {classes?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <p
          style={{
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "20px",
            color: "#000000",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          Copy from Class:-{" "}
        </p>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <select
          disabled={copyData}
          style={{
            borderRadius: "5px",
            fontSize: "17px",
            padding: "4px 10px",
            color: "#414141",
          }}
          value={copyClass}
          onChange={(e) => setCopyClass(e.target.value)}
        >
          <option value="">Class</option>
          {classes?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {!copyData ? (
          <div>
            <button className="applybtnprncpl" onClick={() => fetchCopyData()}>Apply</button>
          </div>
        ) : (
          <div>
            <Button onClick={() => handleMegreDialoge()}>Merge Exams</Button>
            <Button onClick={() => cancelMerge()} color="error">Cancel</Button>
          </div>
        )}
      </div>

      <div>
        <div className="yearly">
          <div style={{ width: "100%", margin: "auto", marginTop: "50px" }}>
            {/* ShadCN Accordion */}
            <Accordion type="single" collapsible activeKey={activeKey} onValueChange={setActiveKey}>
              {examTypesData?.map((examtype) => (
                <AccordionItem key={examtype.id} value={examtype.id}>
                  <AccordionTrigger>{examtype.name}</AccordionTrigger>
                  <AccordionContent>
                    <ExamType
                      copyData={copyData}
                      examtype={examtype}
                      activeKey={activeKey}
                      setActiveKey={setActiveKey}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
              {!copyData && <AddNewExamType classid={classid} />}
            </Accordion>
          </div>
        </div>
        <Dialog open={isMergeDialogOpen} onClose={cancelMerge}>
          <DialogTitle>Confirm Merge</DialogTitle>
          <DialogContent>
            {`Are you sure you want to merge exams from ${copyClass} to ${classid}?`}
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelMerge} color="error">No</Button>
            <Button onClick={mergeExamTypesAndExams}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default PrincipalExam;
