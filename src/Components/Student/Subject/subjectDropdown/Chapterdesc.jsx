import React, { useState } from "react";
import styles from "../StudentSubject.module.css";
import CommonService from "../../../../services/common.service";
import { toast } from "sonner";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // Import Shadcn accordion components

export default function Chapterdesc({ chapterDesc }) {
  const [selectedKey, setSelectedKey] = useState("1");

  const onChange = (key) => {
    setSelectedKey(key);
  };

  // Download note by public folder path
  const downloadNote = async (filePath) => {
    try {
      const file = await CommonService.downloadFileByPath({ filePath });
      CommonService.downloadFileByBytes(file, filePath);
    } catch (err) {
      console.log("Problem in Chapterdesc :: downloadNote() => ", err);
    }
  };

  // Open link in new tab
  const newTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // Handle file download
  const handleDownload = (noteUrl) => {
    if (!noteUrl) {
      toast("No File Found");
      return;
    }
    window.location.href = noteUrl;
  };

  return (
    <div className={styles.tabsdiv}>
      <div className={styles.tabsdivd1}>
        <h2>{chapterDesc?.chaptername}</h2>
      </div>
      <Accordion type="single" collapsible value={selectedKey} onValueChange={onChange}>
        {/* Notes Tab */}
        <AccordionItem value="1">
          <AccordionTrigger>Notes</AccordionTrigger>
          <AccordionContent>
            {chapterDesc?.notes?.length > 0 ? (
              chapterDesc.notes.map((note) => (
                <div id={note?.id} className={styles.tab1} key={note?.id}>
                  <h4>{note?.description}</h4>
                  <button onClick={() => handleDownload(note?.url)}>
                    Download
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.div2h2}>No notes available!</p>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Links Tab */}
        <AccordionItem value="2">
          <AccordionTrigger>Links</AccordionTrigger>
          <AccordionContent>
            {chapterDesc?.links?.length > 0 ? (
              chapterDesc.links.map((link) => (
                <div id={link?.id} className={styles.tab1} key={link?.id}>
                  <h4>{link?.description}</h4>
                  <button onClick={() => newTab(link?.url)}>
                    Click Here
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.div2h2}>No links available!</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
