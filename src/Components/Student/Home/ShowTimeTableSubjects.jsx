import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import "./TimeTable.css";

export default function ShowTimeTableSubjects({ startDate, sub }) {

    //time should be like 3:30 logic - split the string in array then map the array which return number 
    let [startHour, startMin] = sub?.starttime?.split(':').map(Number) ?? [];
    let [endHour, endMin] = sub?.endtime?.split(':').map(Number) ?? [];

    return (
        <>
            {/*subject name is lunch then show lunch*/}
            {sub.subject.subjectname === "Lunch" ?
                (<div className="lunchb">
                    <span>Lunch Break</span>
                </div>)
                //check current hours(3:40) with duration(3:30 - 4:30) -( (3 > 3 || (3 === 3 && 40 > 30)) && (3<4 || (3 === 4 && 40 < 30) ) 
                : ((startDate.getHours() > startHour || (startDate.getHours() === startHour &&
                    startDate.getMinutes() >= startMin)) &&
                    (startDate.getHours() < endHour || (startDate.getHours() === endHour &&
                        startDate.getMinutes() < endMin))) ?
                    (
                        <div className="lunch">
                            <span>{sub.subject.subjectname}</span>
                            <div style={{}}>
                                <span
                                    style={{ display: "inline-flex", alignItems: "center" }}
                                >
                                    Ongoing
                                </span>
                                &nbsp;
                                <SyncRoundedIcon
                                    className="rotate"
                                    style={{ verticalAlign: "middle" }}
                                />
                            </div>
                        </div>
                    ) : //else normal subject
                    (
                        <div className="ttd2d1" key={sub.id}>
                            <span>{sub.subject.subjectname}</span>
                            <span>&#10003;</span>
                        </div>
                    )}
            <br />
        </>
    );
}
