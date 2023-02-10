import { useRoutes } from "react-router-dom";

import PageLayout from "./layout";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/dashboard/Dashboard";
import WorkSchedule from "./pages/workSchedule/WorkSchedule";
import AppointmentSchedule from "./pages/appointmentSchedule/AppointmentSchedule";
import DoctorList from "./pages/doctor/DoctorList/DoctorList";
import Article from "./pages/article/Article";
import PatientList from "./pages/patient/PatientList/PatientList";
import SpecialtyList from "./pages/specialty/SpecialyList/SpecialtyList";
import MedicineList from "./pages/medicine/MecicineList/MedicineList";
import SubclinicalList from "./pages/subclinical/SubclinicalList/SubclinicalList";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "lich-lam-viec",
          element: <WorkSchedule />,
        },
        {
          path: "lich-kham",
          children: [
            {
              path: "danh-sach",
              element: <AppointmentSchedule />,
            },
            {
              path: "tao-moi",
              element: <>tao moi lich kham</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua lich kham</>,
            },
          ],
        },
        {
          path: "bac-si",
          children: [
            {
              path: "danh-sach",
              element: <DoctorList />,
            },
            {
              path: "tao-moi",
              element: <>tao moi bac si</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua bac si</>,
            },
          ],
        },
        {
          path: "benh-nhan",
          children: [
            {
              path: "danh-sach",
              element: <PatientList />,
            },
            {
              path: "tao-moi",
              element: <>tao moi benh-nhan</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua benh-nhan</>,
            },
          ],
        },
        {
          path: "chuyen-khoa",
          children: [
            {
              path: "danh-sach",
              element: <SpecialtyList />,
            },
            {
              path: "tao-moi",
              element: <>tao moi chuyen-khoa</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua chuyen-khoa</>,
            },
          ],
        },
        {
          path: "thuoc",
          children: [
            {
              path: "danh-sach",
              element: <MedicineList />,
            },
            {
              path: "tao-moi",
              element: <>tao moi thuoc</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua thuoc</>,
            },
          ],
        },
        {
          path: "can-lam-sang",
          children: [
            {
              path: "danh-sach",
              element: <SubclinicalList />,
            },
            {
              path: "tao-moi",
              element: <>tao moi can-lam-sang</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua can-lam-sang</>,
            },
          ],
        },
        {
          path: "bai-viet",
          children: [
            {
              path: "danh-sach",
              element: <Article />,
            },
            {
              path: "tao-moi",
              element: <>tao moi ai-viet</>,
            },
            {
              path: "chinh-sua",
              element: <>chinh sua bai-viet</>,
            },
          ],
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);
}
