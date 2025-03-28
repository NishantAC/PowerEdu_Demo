import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/Components/ui/accordion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";
import DropdownTable from "./DropdownTable";

function SubDropdown({ subject, index, activeItem, getAssignedSubjects, classDropdownValue }) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={index.toString()}>
                <AccordionTrigger className="flex items-center justify-between">
                    <Typography sx={{
                        fontFamily: 'Rubik',
                        fontStyle: "normal",
                        fontWeight: 500,
                        color: "#646464",
                        fontSize: "24px !important",
                        lineHeight: "28px !important",
                    }}>
                        {subject?.subject_name}
                    </Typography>
                    <KeyboardArrowDownIcon
                        style={{
                            fontSize: "35px",
                            fontWeight: "lighter",
                            transform: activeItem === index ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s ease-in-out",
                        }}
                    />
                </AccordionTrigger>

                <AccordionContent
                    className="bg-white border border-gray-400 shadow-lg rounded-md"
                >
                    {/* Check if chapters exist */}
                    {subject?.chapters?.length > 0 ? (
                        <DropdownTable chapters={subject.chapters} classDropdownValue={classDropdownValue} getAssignedSubjects={getAssignedSubjects} />
                    ) : (
                        <h5 className={styles.div2h2}>"No chapters found.!"</h5>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default SubDropdown;
