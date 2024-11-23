import React, { useState, useEffect } from 'react';
import './TeacherStudent.css';
import './StudentProfile/StudentProfile.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
// import StudentProfile from './StudentProfile/StudentProfile'
import KeyboardBackspaceOutlined from '@mui/icons-material/KeyboardBackspaceOutlined';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileDetails from './StudentProfile/ProfileDetails';
import AcademicsDetails from './StudentAcademics/AcademicsDetails';
import AttendanceDetails from './StudentAttendanceInfo/AttendanceDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudents } from '../../../slices/student';
import { Link } from 'react-router-dom';
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
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function TeacherStudent(props) {
	const dispatch = useDispatch();
	const { user: currentUser } = useSelector((state) => state.user);
	const { allStudents, student } = useSelector((state) => state.student);
	const overallValue = props.location.overall;
	const tabValue = props.location.tab;
	const userId = props.location.userId;
	const [selectedStudent, setSelectedStudent] = useState('');
	const [Overall, setOverall] = useState(overallValue ? overallValue : false);
	const showOverall = (student) => {
		setSelectedStudent(student);
		setOverall(true);
	};
	const hideOverall = () => setOverall(false);
	const [value, setValue] = React.useState(tabValue ? tabValue : 0);
	const [filterClass, setFilterClass] = useState('');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleApplyFilter = () => {
		dispatch(
			fetchAllStudents({
				school_code: currentUser.schoolcode,
				class_code: filterClass,
			}),
		);
	};

	useEffect(() => {
		if (currentUser.classes.length > 0) {
			dispatch(
				fetchAllStudents({
					school_code: currentUser.schoolcode,
					class_code: currentUser.classes[0],
				}),
			);
		}
		setFilterClass(currentUser.classes[0]);
	}, []);

	return (
		<>
			{!Overall ? (
				<>
					<div className="tchrstdnt">
						<div style={{ marginTop: '28px' }}>
							<p
								style={{
									fontFamily: 'Roboto',
									fontStyle: 'normal',
									fontWeight: '400',
									fontSize: '18px',
									lineHeight: '21px',
									color: '#4D4D4D',
								}}
							>
								Home &gt;
								<b>
									{' '}
									<u>Student Profile</u>
								</b>
							</p>
						</div>
						<h3
							style={{
								fontFamily: 'Poppins',
								fontWeight: '600',
								marginTop: '40px',
								fontSize: '25px',
							}}
						>
							Student List
						</h3>
						<br />
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								rowGap: '8px',
								columnGap: '22px',
								marginTop: '10px',
							}}
						>
							<p
								style={{
									fontFamily: 'Rubik',
									fontStyle: 'normal',
									fontWeight: '500',
									fontSize: '20px',
									color: '#000000',
									marginTop: 'auto',
									marginBottom: 'auto',
								}}
							>
								Filters:-
							</p>
							<select
								style={{
									borderRadius: '5px',
									fontSize: '17px',
									padding: '4px 10px',
									color: '#414141',
								}}
								onChange={(e) => setFilterClass(e.target.value)}
								value={filterClass}
							>
								{currentUser?.classes.length > 0 &&
									currentUser.classes.map((cls) => (
										<option
											value={cls}
											key={cls}
										>
											{cls}
										</option>
									))}
							</select>
							<button
								style={{
									borderRadius: '5px',
									background: '#214DF9',
									padding: '4px 24px',
									color: '#FFFFFF',
									border: 'none',
								}}
								onClick={handleApplyFilter}
							>
								Apply
							</button>
						</div>
						<div style={{ marginTop: '30px' }}>
							<TableContainer
								component={Paper}
								style={{ height: '370px' }}
							>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow
											style={{
												position: 'sticky',
												top: '0',
												paddingLeft: '10px',
												background:
													'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)',
												border: '2px solid #A4A4A4',
												boxSizing: 'border-box',
												borderRadius: '5px',
											}}
										>
											<TableCell
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
													textAlign: 'left',
												}}
											>
												S no.
											</TableCell>
											<TableCell
												align="left"
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
												}}
											>
												Academic Year
											</TableCell>
											<TableCell
												align="left"
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
												}}
											>
												Class
											</TableCell>
											<TableCell
												align="left"
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
												}}
											>
												Admission No.
											</TableCell>
											<TableCell
												align="left"
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
												}}
											>
												Roll No.
											</TableCell>
											<TableCell
												align="left"
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
												}}
											>
												Student Name
											</TableCell>
											<TableCell
												align="left"
												style={{
													paddingTop: '18px',
													paddingBottom: '18px',
													fontFamily: 'Poppins',
													fontStyle: 'normal',
													fontWeight: '600',
													fontSize: '18px',
													color: '#545454',
													borderBottom: 'none',
												}}
											>
												Action
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody
										style={{
											background: '#FFFFFF',
											border: '1px solid #A5A5A5',
											boxSizing: 'border-box',
											boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
											borderRadius: '5px',
										}}
									>
										{allStudents.map((student, index) => (
											<TableRow
												key={student.user_id}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
												}}
												style={{ paddingLeft: '10px' }}
											>
												<TableCell
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														flex: '0.05',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
														textAlign: 'left',
													}}
												>
													{++index}
												</TableCell>
												<TableCell
													align="left"
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
													}}
												>
													{student.academicyear}
												</TableCell>
												<TableCell
													align="left"
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
													}}
												>
													{student.class}
												</TableCell>
												<TableCell
													align="left"
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
													}}
												>
													{student.admissionno}
												</TableCell>
												<TableCell
													align="left"
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
													}}
												>
													{student.rollno}
												</TableCell>
												<TableCell
													align="left"
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
													}}
												>
													{student.name}
												</TableCell>
												<TableCell
													align="left"
													style={{
														paddingTop: '15px',
														paddingBottom: '15px',
														fontFamily: 'Lato',
														fontStyle: 'normal',
														fontWeight: '500',
														fontSize: '16px',
														color: '#000000',
														margin: 'auto',
													}}
												>
													<button
														type="submit"
														className="entermarksbtn"
														onClick={() => showOverall(student)}
													>
														View Overall
													</button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="studentprofile">
						<div className="studentaccount">
							<div
								style={{
									marginTop: '28px',
									marginRight: '25px',
									marginLeft: '25px',
								}}
							>
								<p
									style={{
										fontFamily: 'Roboto',
										fontStyle: 'normal',
										fontWeight: '400',
										fontSize: '18px',
										lineHeight: '21px',
										color: '#4D4D4D',
									}}
								>
									Home &gt;
									<b>
										{' '}
										<u>Student Profile</u>
									</b>
								</p>
								<br />
								<h2
									style={{
										textAlign: 'center',
										fontFamily: 'Poppins',
										fontWeight: '600',
										marginTop: '40px',
										fontSize: '25px',
									}}
								>
									Student Profile
								</h2>
								<div style={{ textAlign: 'center', marginTop: '50px' }}>
									<Avatar
										className="stdntavtr"
										sx={{ width: 120, height: 120 }}
									>
										<img src={student?.profileImage} />
									</Avatar>
									<button className="stdntprofilebtn">Delete Account</button>
								</div>
							</div>
						</div>
						<div style={{ width: '100%', padding: '0 0px' }}>
							<Box
								sx={{ width: '100%' }}
								className="stdnttabbox"
							>
								<Box className="stdnttabs">
									<Tabs
										value={value}
										onChange={handleChange}
										aria-label="basic tabs example"
										style={{ margin: 'auto' }}
									>
										<Tab
											label="Profile"
											{...a11yProps(0)}
											className={value === 0 ? 'stdnttab2' : 'stdnttab1'}
										/>
										<Tab
											label="Academics"
											{...a11yProps(1)}
											className={value === 1 ? 'stdnttab2' : 'stdnttab1'}
										/>
										<Tab
											label="Attendance"
											{...a11yProps(2)}
											className={value === 2 ? 'stdnttab2' : 'stdnttab1'}
										/>
									</Tabs>
								</Box>
								<TabPanel
									value={value}
									index={0}
								>
									<ProfileDetails
										hideOverall={hideOverall}
										userId={
											selectedStudent.user_id ? selectedStudent.user_id : userId
										}
									/>
								</TabPanel>
								<TabPanel
									value={value}
									index={1}
								>
									<AcademicsDetails
										userId={
											selectedStudent.user_id ? selectedStudent.user_id : userId
										}
									/>
								</TabPanel>
								<TabPanel
									value={value}
									index={2}
								>
									<AttendanceDetails
										userId={
											selectedStudent.user_id ? selectedStudent.user_id : userId
										}
									/>
								</TabPanel>
							</Box>
						</div>
						<button
							onClick={hideOverall}
							className="tchrprofilebackbtn"
						>
							<KeyboardBackspaceOutlined
								style={{ verticalAlign: 'middle', marginTop: '5px' }}
							/>
							<Link
								to={
									value == 2
										? '/teacher/student-attendance'
										: '/teacher/student-profile'
								}
								style={{ textDecoration: 'none', color: '#000' }}
							>
								Back
							</Link>
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default TeacherStudent;
