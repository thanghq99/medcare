import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Groups3Icon from "@mui/icons-material/Groups3";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const navConfig = [
  {
    title: "Lịch khám",
    path: "/lich-kham",
    icon: <PendingActionsIcon />,
  },
  {
    title: "Bác sĩ",
    path: "/bac-si",
    icon: <SupervisorAccountIcon />,
    isStaff: true,
    isAdmin: true,
  },
  {
    title: "Bệnh nhân",
    path: "/benh-nhan",
    icon: <PeopleAltIcon />,
    isStaff: true,
    isAdmin: true,
  },
  {
    title: "Lịch làm việc",
    path: "/lich-lam-viec",
    icon: <CalendarMonthIcon />,
    isStaff: true,
  },
  {
    title: "Ca làm việc",
    path: "/ca-lam-viec",
    icon: <WorkHistoryIcon />,
    isStaff: true,
    isAdmin: true,
  },
  {
    title: "Chuyên khoa",
    path: "/chuyen-khoa",
    icon: <Groups3Icon />,
    isStaff: true,
    isAdmin: true,
  },
  {
    title: "Thuốc",
    path: "/thuoc",
    icon: <MedicationIcon />,
    isStaff: true,
    isAdmin: true,
  },
  {
    title: "Cận lâm sàng",
    path: "/can-lam-sang",
    icon: <MedicalServicesIcon />,
    isStaff: true,
    isAdmin: true,
  },
];

export default navConfig;
