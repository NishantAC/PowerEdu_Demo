const SidebarItems = [
    {
        name: "Home",
        route: "/teacher/home",
        child:[]
    },
    {
        name: "Students",
        child:[
            {
                name:"Student Attendance",
                route:"/teacher/student-attendance"
            },
            {
                name:"Student Profile",
                route:"/teacher/student-profile"
            },
            {
                name:"Extra Class",
                route:"/teacher"
            }
        ]
    },
    {
        name: "Assignments",
        child:[
            {
                name:"Add Assignment",
                route:"/teacher/add-assignment"
            },
            {
                name:"Add Homework",
                route:"/teacher/add-homework"
            }
        ]
    },
    {
        name: "Exam",
        child:[
            {
                name:"Exam Marks",
                route:"/teacher/exam-marks"
            },
            {
                name:"Class Test Marks",
                route:"/teacher/class-test-marks"
            },
            {
                name:"Upload Question Paper",
                route:"/teacher/upload-paper"
            }
        ]
    },
    {
        name: "Subjects",
        route: "/teacher/subject",
        child:[]
    },
    {
        name: "Mail",
        route: "/teacher/mail",
        child:[]
    },
    {
        name: "Notice",
        route: "/teacher/notice",
        child:[]
    },
];

export default SidebarItems;