import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Groups3Icon from '@mui/icons-material/Groups3';
import MedicationIcon from '@mui/icons-material/Medication';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Lịch khám",
    path: "/lich-kham",
    icon: <PendingActionsIcon />,
    children: [
      {
        title: "Danh sách",
        path: "/lich-kham/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/lich-kham/tao-moi",
      },
    ],
  },
  {
    title: "Bác sĩ",
    path: "/bac-si",
    icon: <SupervisorAccountIcon />,
    children: [
      {
        title: "Danh sách",
        path: "/bac-si/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/bac-si/tao-moi",
      },
    ],
  },
  {
    title: "Bệnh nhân",
    path: "/benh-nhan",
    icon: <PeopleAltIcon />,
    children: [
      {
        title: "Danh sách",
        path: "/benh-nhan/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/benh-nhan/tao-moi",
      },
    ],
  },
  {
    title: "Lịch làm việc",
    path: "/lich-lam-viec",
    icon: <CalendarMonthIcon />
  },
  {
    title: "Chuyên khoa",
    path: "/chuyen-khoa",
    icon: <Groups3Icon />,
    children: [
      {
        title: "Danh sách",
        path: "/chuyen-khoa/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/chuyen-khoa/tao-moi",
      },
    ],
  },
  {
    title: "Thuốc",
    path: "/thuoc",
    icon: <MedicationIcon />,
    children: [
      {
        title: "Danh sách",
        path: "/thuoc/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/thuoc/tao-moi",
      },
    ],
  },
  {
    title: "Cận lâm sàng",
    path: "/can-lam-sang",
    icon: <MedicalServicesIcon />,
    children: [
      {
        title: "Danh sách",
        path: "/can-lam-sang/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/can-lam-sang/tao-moi",
      },
    ],
  },
  {
    title: "Bài viết",
    path: "/bai-viet",
    icon: <LibraryBooksIcon />,
    children: [
      {
        title: "Danh sách",
        path: "/bai-viet/danh-sach",
      },
      {
        title: "Tạo mới",
        path: "/bai-viet/tao-moi",
      },
    ],
  },
];

export default navConfig;
