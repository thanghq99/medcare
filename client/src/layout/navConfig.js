import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Groups3Icon from "@mui/icons-material/Groups3";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const navConfig = [
  // {
  //   title: "dashboard",
  //   path: "/dashboard",
  //   icon: <DashboardIcon />,
  // },
  {
    title: "Lịch khám",
    path: "/lich-kham",
    icon: <PendingActionsIcon />,
  },
  {
    title: "Bác sĩ",
    path: "/bac-si",
    icon: <SupervisorAccountIcon />,
  },
  {
    title: "Bệnh nhân",
    path: "/benh-nhan",
    icon: <PeopleAltIcon />,
  },
  {
    title: "Lịch làm việc",
    path: "/lich-lam-viec",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Ca làm việc",
    path: "/ca-lam-viec",
    icon: <WorkHistoryIcon />,
  },
  {
    title: "Chuyên khoa",
    path: "/chuyen-khoa",
    icon: <Groups3Icon />,
  },
  {
    title: "Thuốc",
    path: "/thuoc",
    icon: <MedicationIcon />,
  },
  {
    title: "Cận lâm sàng",
    path: "/can-lam-sang",
    icon: <MedicalServicesIcon />,
  },
  // {
  //   title: "Bài viết",
  //   path: "/bai-viet",
  //   icon: <LibraryBooksIcon />,
  //   children: [
  //     {
  //       title: "Danh sách",
  //       path: "/bai-viet/danh-sach",
  //     },
  //     {
  //       title: "Tạo mới",
  //       path: "/bai-viet/tao-moi",
  //     },
  //   ],
  // },
];

export default navConfig;
