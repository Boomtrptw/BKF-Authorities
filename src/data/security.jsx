import PhotoUser1 from "../assets/images/notification-user-1.png";
import PhotoUser2 from "../assets/images/notification-user-2.png";
import PhotoUser3 from "../assets/images/notification-user-3.png";

export const manageWorkProcess = [
  {
    moduleId: "E-SPT",
    moduleName: "New Project",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "PPS",
    moduleName: "Production Planning",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "LMS",
    moduleName: "Logistic",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "KBS",
    moduleName: "On Demand Kanban",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "TMS",
    moduleName: "Tooling Asset",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "DMS",
    moduleName: "Document Control",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "QMS",
    moduleName: "Quality",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    moduleId: "DAS",
    moduleName: "Data Analytics",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
]

export const userRole = [
  {
    roleName: "Administrators",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    roleName: "Approve CF Change",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    roleName: "Approve ECI Change",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    roleName: "Safety Manager",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    roleName: "QC Manager",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
]

export const roleModuleList = [
  "[E-SPT] New Project",
  "[PPS] Production Planning",
  "[LMS] Logistic",
  "[KBS] On Demand Kanban",
  "[TMS] Tooling Asset",
  "[DMS] Document Control",
  "[QMS] Quality",
  "[DAS] Data analytics"
];

export const roleFunctionList = [
  {
    name: "Skill Matrix",
    subFunction: [
      { name: "Setup Master Data" },
      { name: "Manage Course" },
      { name: "Manage Plan" },
      { name: "Training Result" },
      { name: "Report" },
    ],
  },
  {
    name: "Production Planning System",
  },
  {
    name: "Manpower Management",
  },
]

export const reportWorkProcess = [
  {
    modulesId: "E-SPT",
    modules: "New Project",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "PPS",
    modules: "Production Planning",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "LMS",
    modules: "Logistic",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "KBS",
    modules: "On Demand Kanban",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "TMS",
    modules: "Tooling Asset",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "DMS",
    modules: "Document Control",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "QMS",
    modules: "Quality",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
  {
    modulesId: "DAS",
    modules: "Data Analytics",
    updatedAdmin: "Pongsakorn Boonraksa",
    updatedDate: "19/02/2025 15:36:23",
  },
]

export const userManagement = [
  {
    photo: PhotoUser1,
    employeeId: "W65B13",
    firstName: "Phornthep",
    lastName: "Thinthong",
    company: "VRI",
    email:  "Phornthep.T@vri.co.th",
    phoneNumber: "091 321 3859",
    role: "Admin",
    status: "active",
  },
  {
    photo: PhotoUser2,
    employeeId: "W64F01",
    firstName: "Worramet",
    lastName: "Kanjanakaweekul",
    company: "VRI",
    email:  "Worramet.K@vri.co.th",
    phoneNumber: "080 412 4386",
    role: "Admin",
    status: "active",
  },
  {
    photo: PhotoUser3,
    employeeId: "W63K16 ",
    firstName: "May",
    lastName: "Thu Tun",
    company: "VRI",
    email:  "May.T@vri.co.th",
    phoneNumber: "082 587 9128",
    role: "Admin",
    status: "inactive",
  },
]

export const userDataReport = [
  {  
    photo: PhotoUser1,
    employeeId: "W65B13",
    firstName: "Phornthep",
    lastName: "Thinthong",
    company: "VRI",
    loginByDate: {
      "2025-02-17": [
        {
          session: 1,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Add Master Data Part",
          activeTime: "15:30:42"
        },
        {
          session: 2,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Add Master Data Part",
          activeTime: "15:33:20"
        },
        {
          session: 3,
          functionId: "VR-NM-X-005",
          functionName: "Report Work Process",
          functionDetail: "Export Excel File",
          activeTime: "15:34:47"
        },
      ],
      "2025-02-18": [
        {
          session: 1,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Delete Part",
          activeTime: "08:12:32"
        },
        {
          session: 2,
          functionId: "VR-NM-X-005",
          functionName: "Report Work Process",
          functionDetail: "Export Excel File",
          activeTime: "11:41:21"
        },
      ],
      "2025-02-19": [
        {
          session: 1,
          functionId: "VR-SC-E-101",
          functionName: "Manage Function",
          functionDetail: "Add Function",
          activeTime: "15:37:48"
        },
        {
          session: 2,
          functionId: "VR-SC-E-101",
          functionName: "Manage Function",
          functionDetail: "Delete Function",
          activeTime: "15:38:11"
        },
        {
          session: 3,
          functionId: "VR-SC-E-201",
          functionName: "User Management",
          functionDetail: "Add User Profile",
          activeTime: "15:40:03"
        },
        {
          session: 4,
          functionId: "VR-SC-E-201",
          functionName: "User Management",
          functionDetail: "Edit User Profile",
          activeTime: "15:44:39"
        },
      ],
      "2025-02-20": [
        {
          session: 1,
          functionId: "VR-SC-E-104",
          functionName: "Manage Password Policy",
          functionDetail: "Password Requirement",
          activeTime: "09:42:40"
        },
      ],
      "2025-02-21": [
        {
          session: 1,
          functionId: "VR-SC-X-203",
          functionName: "Report User Profile",
          functionDetail: "View Report",
          activeTime: "17:30:23"
        },
        {
          session: 2,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Edit Part",
          activeTime: "09:45:15"
        },
      ],
    }
  },
  {
    photo: PhotoUser2,
    employeeId: "W64F01",
    firstName: "Worramet",
    lastName: "Kanjanakaweekul",
    company: "VRI",
    loginByDate: {
      "2025-02-17": [
        {
          session: 1,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Add Master Data Part",
          activeTime: "09:41:23"
        },
        {
          session: 2,
          functionId: "VR-NM-E-002",
          functionName: "Department",
          functionDetail: "Add Master Data Department",
          activeTime: "10:54:50"
        },
        {
          session: 3,
          functionId: "VR-NM-E-005",
          functionName: "Report Work Process",
          functionDetail: "Export Excel File",
          activeTime: "13:12:56"
        },
      ],
      "2025-02-18": [
        {
          session: 1,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Delete Part",
          activeTime: "16:11:45"
        },
        {
          session: 2,
          functionId: "VR-NM-X-005",
          functionName: "Report Work Process",
          functionDetail: "Export Excel File",
          activeTime: "17:59:32"
        },
      ],
      "2025-02-19": [
        {
          session: 1,
          functionId: "VR-SC-E-101",
          functionName: "Manage Function",
          functionDetail: "Add Function",
          activeTime: "15:37:48"
        },
        {
          session: 2,
          functionId: "VR-SC-E-101",
          functionName: "Manage Function",
          functionDetail: "Delete Function",
          activeTime: "09:11:11"
        },
        {
          session: 3,
          functionId: "VR-SC-E-201",
          functionName: "User Management",
          functionDetail: "Add User Profile",
          activeTime: "10:04:20"
        },
      ],
    }
  },
  {
    photo: PhotoUser3,
    employeeId: "W63K16",
    firstName: "May",
    lastName: "Thu Tun",
    company: "VRI",
    loginByDate: {
      "2025-02-18": [
        {
          session: 1,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Add Master Data Part",
          activeTime: "16:05:35"
        },
        {
          session: 2,
          functionId: "VR-NM-E-002",
          functionName: "Department",
          functionDetail: "Edit Master Data Department",
          activeTime: "16:15:41"
        },
      ],
      "2025-02-20": [
        {
          session: 1,
          functionId: "VR-SC-E-101",
          functionName: "Manage Function",
          functionDetail: "Add Function",
          activeTime: "09:32:55"
        },
        {
          session: 2,
          functionId: "VR-SC-E-101",
          functionName: "Manage Function",
          functionDetail: "Edit Function",
          activeTime: "09:33:49"
        },
      ],
      "2025-02-21": [
        {
          session: 1,
          functionId: "VR-NM-E-001",
          functionName: "Part Information",
          functionDetail: "Edit Part",
          activeTime: "16:06:02"
        },
      ],
    }
  },
]

export const reportAuditTrialLog = [
  {
    photo: PhotoUser1,
    employeeId: "W65B13",
    firstName: "Phornthep",
    lastName: "Thinthong",
    company: "VRI",
    loginByDate: {
      "2025-02-17": [
        {
          session: 1,
          updateDetail: "Update Password",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "18:16:47"
        },
        {
          session: 2,
          updateDetail: "Update Image Profile",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "18:16:47"
        },
        {
          session: 3,
          updateDetail: "Update User Role",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "18:16:47"
        }
      ],
      "2025-02-18": [
        {
          session: 1,
          updateDetail: "Update Username",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "11:12:39"
        },
        {
          session: 2,
          updateDetail: "Update First Name",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "11:12:39"
        }
      ],
      "2025-02-19": [
        {
          session: 1,
          updateDetail: "Update Email",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "14:56:02"
        },
        {
          session: 2,
          updateDetail: "Update Company",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "14:56:02"
        },
        {
          session: 3,
          updateDetail: "Update Department",
          updateBy: "Phornthep Thinthong",
          activeTime: "18:30:01"
        },
        {
          session: 4,
          updateDetail: "Update Position",
          updateBy: "Phornthep Thinthong",
          activeTime: "18:30:01"
        }
      ]
    }
  },
  {
    photo: PhotoUser2,
    employeeId: "W64F01",
    firstName: "Worramet",
    lastName: "Kanjanakaweekul",
    company: "VRI",
    loginByDate: {
      "2025-02-18": [
        {
          session: 1,
          updateDetail: "Update First Name",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "09:50:24"
        },
        {
          session: 2,
          updateDetail: "Update Last Name",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "09:50:24"
        },
        {
          session: 3,
          updateDetail: "Update Username",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "09:50:24"
        },
        {
          session: 4,
          updateDetail: "Update Password",
          updateBy: "Pongsakorn Boonraksa",
          activeTime: "09:50:24"
        },
      ],
      "2025-02-20": [
        {
          session: 1,
          updateDetail: "Update Phone number",
          updateBy: "Phornthep Thinthong",
          activeTime: "10:11:31"
        },
        {
          session: 2,
          updateDetail: "Updated Email",
          updateBy: "Phornthep Thinthong",
          activeTime: "10:11:31"
        },
        {
          session: 3,
          updateDetail: "Update Company",
          updateBy: "Phornthep Thinthong",
          activeTime: "10:11:31"
        },
      ],
    }
  },
  {
    photo: PhotoUser3,
    employeeId: "W63K16",
    firstName: "May",
    lastName: "Thu Tun",
    company: "VRI",
    loginByDate: {
      "2025-02-18": [
        {
          session: 1,
          updateDetail: "Update Username",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "10:31:44"
        },
        {
          session: 2,
          updateDetail: "Update Password",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "10:31:44"
        },
      ],
      "2025-02-19": [
        {
          session: 1,
          updateDetail: "Update Department",
          updateBy: "Phornthep Thinthong",
          activeTime: "17:50:41"
        },
        {
          session: 2,
          updateDetail: "Update Position",
          updateBy: "Phornthep Thinthong",
          activeTime: "17:50:41"
        },
      ],
      "2025-02-20": [
        {
          session: 1,
          updateDetail: "Update First Name",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "13:23:57"
        },
        {
          session: 2,
          updateDetail: "Update Last Name",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "13:23:57"
        },
        {
          session: 3,
          updateDetail: "Updated Email",
          updateBy: "Aphisit Sangkrathok",
          activeTime: "13:23:57"
        },
      ],
    }
  },
]

export const licenseControl = [
  {
    shortName: "BKF",
    companyName: "Bangkok Metropolis Motor Co., Ltd.",
    startLicense: "01/01/2025",
    email: "Bangkokmetropolismotor@bkf.co.th",
    tel: "02 805 9000",
    license: "4",
    country: "Thailand",
  },
  {
    shortName: "VRI",
    companyName: "VR Intelligence Co., Ltd.",
    startLicense: "01/01/2025",
    email: "Info@vri.co.th",
    tel: "02 805 9096",
    license: "8",
    country: "Thailand",
  },
]

export const tabLicense = [
  { moduleId: 'E-SPT', moduleName: 'New Project' },
  { moduleId: 'PPS', moduleName: 'Production Planning' },
  { moduleId: 'LMS', moduleName: 'Logistic' },
  { moduleId: 'KBS', moduleName: 'On Demand Kanban' },
  { moduleId: 'TMS', moduleName: 'Tooling Asset' },
  { moduleId: 'DMS', moduleName: 'Document Control' },
  { moduleId: 'QMS', moduleName: 'Quality' },
  { moduleId: 'DAS', moduleName: 'Data Analytics' },
]

export const licenseUser = [
  {
    userName: "W65B13",
    firstName: "Pongsakorn",
    lastName: "Boonraksa",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Pongsakorn.B@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W64F01",
    firstName: "Aphisit",
    lastName: "Sangkrathok",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Aphisit.S@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W64K16",
    firstName: "Phornthep",
    lastName: "Thinthong",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Phornthep.T@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W67E25",
    firstName: "Pornprapai",
    lastName: "Atsawanurak",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Pornprapai.A@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W67I34",
    firstName: "Worramet",
    lastName: "Kanjanakaweekul",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Worramet.K@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W67I35",
    firstName: "Rawisara",
    lastName: "Arunrat",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Rawisara.A@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W62K14",
    firstName: "Natchapon",
    lastName: "Khiewprapai",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Natchapon.K@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W63I17",
    firstName: "Ploypilin",
    lastName: "Sangsiri",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Ploypilin.S@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W67D05",
    firstName: "Theerapong",
    lastName: "Tawan",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Theerapong.T@vri.co.th",
    userStatus: true,
  },
  {
    userName: "W68B01",
    firstName: "Sarun",
    lastName: "Wongsangiem",
    department: "VRI_IT_IT_SWDEV",
    position: "Officer 2",
    email: "Sarun.W@vri.co.th",
    userStatus: true,
  },
]

export const reportAccessLog = [
  {
    photo: PhotoUser1,
    employeeId: "W65B13",
    firstName: "Phornthep",
    lastName: "Thinthong",
    company: "VRI",
    loginByDate: {
      "2025-02-17": [
        {
          session: 1,
          logIn: "09:30:00",
          logOut: "10:15:00",
          durationMinutes: 45
        },
        {
          session: 2,
          logIn: "13:00:00",
          logOut: "18:30:00",
          durationMinutes: 330
        },
        {
          session: 3,
          logIn: "18:35:12",
          logOut: "18:45:35",
          durationMinutes: 10
        }
      ],
      "2025-02-19": [
        {
          session: 1,
          logIn: "10:00:00",
          logOut: "12:00:17",
          durationMinutes: 120
        },
        {
          session: 2,
          logIn: "13:45:13",
          logOut: "16:55:15",
          durationMinutes: 190
        }
      ],
      "2025-02-20": [
        {
          session: 1,
          logIn: "14:55:02",
          logOut: "17:50:34",
          durationMinutes: 175
        },
        {
          session: 2,
          logIn: "18:25:46",
          logOut: "18:32:55",
          durationMinutes: 7
        }
      ]
    }
  },
  {
    photo: PhotoUser2,
    employeeId: "W64F01",
    firstName: "Worramet",
    lastName: "Kanjanakaweekul",
    company: "VRI",
    loginByDate: {
      "2025-02-18": [
        {
          session: 1,
          logIn: "9:00:00",
          logOut: "11:30:21",
          durationMinutes: 150
        },
        {
          session: 2,
          logIn: "13:30:33",
          logOut: "14:35:11",
          durationMinutes: 65
        },
        {
          session: 3,
          logIn: "14:55:02",
          logOut: "17:50:34",
          durationMinutes: 175
        }
      ],
      "2025-02-20": [
        {
          session: 1,
          logIn: "10:00:00",
          logOut: "12:00:17",
          durationMinutes: 150
        },
      ],
    }
  },
  {
    photo: PhotoUser3,
    employeeId: "W63K16",
    firstName: "May",
    lastName: "Thu Tun",
    company: "VRI",
    loginByDate: {
      "2025-02-17": [
        {
          session: 1,
          logIn: "10:00:00",
          logOut: "12:00:17",
          durationMinutes: 60
        },
        {
          session: 2,
          logIn: "14:55:02",
          logOut: "16:55:15",
          durationMinutes: 60
        },
        {
          session: 3,
          logIn: "18:35:12",
          logOut: "18:45:35",
          durationMinutes: 10
        }
      ],
      "2025-02-19": [
        {
          session: 1,
          logIn: "09:30:00",
          logOut: "17:50:00",
          durationMinutes: 500
        },
      ],
      "2025-02-20": [
        {
          session: 1,
          logIn: "13:45:13",
          logOut: "16:55:15",
          durationMinutes: 190
        },
        {
          session: 2,
          logIn: "18:25:46",
          logOut: "18:32:55",
          durationMinutes: 7
        }
      ]
    }
  },
]