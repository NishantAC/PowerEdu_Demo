import React, { useEffect, useState } from "react";
import "./ChapterDescription.css";
// import { Tabs } from 'antd';
// import AddIcon from '@mui/icons-material/Add';
import NoteService from "../../../../services/note.service";
import LinkService from "../../../../services/link.service";
import styles from "../TeacherSubject.module.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import NotesBtn from "./NotesBtn";
import LinkBtn from "./Linkbtn";
import Delete from "./Delete";
import { toast } from "sonner";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  ".css-heg063-MuiTabs-flexContainer": {
    justifyContent: "center",
    position: "static",
  },
  ".css-1qd0hn0-MuiButtonBase-root-MuiTab-root": {
    minWidth: "50px",
    padding: "12px 0",
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "black",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
      fontWeight: 700,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

//start
function ChapterDescription({
  classDropdownValue,
  chapterDesc,
  selected,
  getAssignedSubjects,
}) {
  const [value, setValue] = React.useState(0);
  const [chapterLinks, setChapterLinks] = useState(chapterDesc.links || []);
  const [chapterNotes, setChapterNotes] = useState(chapterDesc.notes || []);

  //so every time action is performed data will get change
  useEffect(() => {
    setChapterNotes(chapterDesc.notes || []);
    setChapterLinks(chapterDesc.links || []);
  }, [chapterDesc]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteNoteById = (noteId) => {
    NoteService.deleteNoteById(noteId)
      .then((res) => {
        const filt = chapterNotes?.filter((f) => Number(f.id) !== noteId);
        setChapterNotes(filt);
      })
      .catch((err) =>
        console.error(
          "Problem in ChapterDescription :: deleteNoteById() => ",
          err
        )
      );
  };

  const deleteLinkById = (linkId) => {
    LinkService.deleteLinkById(linkId)
      .then((res) => {
        const filt = chapterLinks?.filter((f) => Number(f.id) !== linkId);
        setChapterLinks(filt);
      })
      .catch((err) =>
        console.log(
          "Problem in ChapterDescription :: deleteLinkById() => ",
          err
        )
      );
  };

  //to avoid default behavior of anchor tag
  function handleDownload(e, url) {
    if (!url) {
      toast("No File Found");
      return;
    }
    e.preventDefault();
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={styles.tabsdiv}>
      {/*header*/}
      <div className={styles.tabsdivd1}>
        <h2>{`Chapter ${chapterDesc.chapter_number}`}</h2>
      </div>

      {/*body*/}
      <Box sx={{ width: "100%" }}>
        {/*Tabs*/}
        <Box stickyheader>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab
              label="Notes"
              {...a11yProps(0)}
              className={styles.Ctab}
            />
            <StyledTab
              label="Links"
              {...a11yProps(1)}
              className={styles.Ctab}
            />
          </StyledTabs>
        </Box>

        {/*Panel of Notes*/}
        <TabPanel value={value} index={0}>
          {/*To add Notes - sending chapter id*/}
          {/* {console.log(chapterNotes)} */}
          <NotesBtn
            classDropdownValue={classDropdownValue}
            chapterDesc={chapterDesc}
            getAssignedSubjects={getAssignedSubjects}
            setChapterNotes={setChapterNotes}
            chapterNotes={chapterNotes}
          />
          {chapterNotes?.length > 0 ? (
            chapterNotes?.map((ch) => {
              return (
                <div className={styles.tab1}>
                  <h4>{ch.description}</h4>
                  <div className={styles.tab1div}>
                    <button className={styles.tabbtn1}>
                      <a
                        style={{ textDecoration: "none" }}
                        href={ch.url}
                        onClick={(e) => handleDownload(e, ch.url)}
                      >
                        Download
                      </a>
                    </button>
                    <Delete
                      classDropdownValue={classDropdownValue}
                      id={ch.id}
                      getAssignedSubjects={getAssignedSubjects}
                      chapterDesc={chapterDesc}
                      name={ch.description}
                      note={true}
                      setChapterNotes={setChapterNotes}
                      chapterNotes={chapterNotes}
                    />
                    {/* <button className={styles.tabbtn2} onClick={() => { deleteNoteById(ch.id) }}>Delete</button> */}
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.div2h2}>No notes available!</p>
          )}
        </TabPanel>

        {/*Panel of Links*/}
        <TabPanel value={value} index={1}>
          {/*To add Links*/}
          {/* {console.table(chapterLinks)} */}
          <LinkBtn
            classDropdownValue={classDropdownValue}
            chapterDesc={chapterDesc}
            getAssignedSubjects={getAssignedSubjects}
            setChapterLinks={setChapterLinks}
            chapterLinks={chapterLinks}
          />
          {chapterLinks?.length > 0 ? (
            chapterLinks?.map((ch) => {
              return (
                <div className={styles.tab1}>
                  <h4>{ch.description}</h4>
                  <div className={styles.tab1div}>
                    <button className={styles.tabbtn1}>
                      <a
                        style={{ textDecoration: "none" }}
                        href={ch.url}
                        target="_blank"
                      >
                        view
                      </a>
                    </button>
                    <Delete
                      classDropdownValue={classDropdownValue}
                      id={ch.id}
                      getAssignedSubjects={getAssignedSubjects}
                      chapterDesc={chapterDesc}
                      name={ch.description}
                      note={false}
                      setChapterLinks={setChapterLinks}
                      chapterLinks={chapterLinks}
                    />
                    {/* <button className={styles.tabbtn2} onClick={() => deleteLinkById(ch.id)}>Delete</button> */}
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.div2h2}>No Links available!</p>
          )}
        </TabPanel>
      </Box>
    </div>
  );
}

export default ChapterDescription;
