import { Navigate, Outlet, useRoutes } from "react-router-dom";

import PageLayout from "./layout";
import ErrorPage from "./pages/ErrorPage";
import WorkSchedule from "./pages/workSchedule/WorkSchedule";
import AppointmentSchedule from "./pages/appointmentSchedule/AppointmentSchedule";
import DoctorList from "./pages/doctor/DoctorList/DoctorList";
import PatientList from "./pages/patient/PatientList/PatientList";
import SpecialtyList from "./pages/specialty/SpecialyList/SpecialtyList";
import MedicineList from "./pages/medicine/MecicineList/MedicineList";
import SubclinicalList from "./pages/subclinical/SubclinicalList/SubclinicalList";
import ShiftList from "./pages/shift/ShiftList/ShiftList";
import Signin from "./pages/authPages/Signin";
import Signup from "./pages/authPages/Signup";
import RenewPassword from "./pages/authPages/RenewPassword";
import AuthPageLayout from "./layout/AuthPageLayout";

import useAuth from "./hooks/useAuth";

const Router = () => {
  const { isLoggedIn } = useAuth();
  return useRoutes([
    {
      path: "/",
      element: isLoggedIn() ? (
        <PageLayout />
      ) : (
        <Navigate to="/auth/dang-nhap" />
      ),
      children: [
        {
          path: "",
          element: <Navigate to="/lich-kham" />,
        },
        {
          path: "lich-lam-viec",
          element: <WorkSchedule />,
        },
        {
          path: "lich-kham",
          element: <AppointmentSchedule />,
        },
        {
          path: "bac-si",
          element: <DoctorList />,
        },
        {
          path: "benh-nhan",
          element: <PatientList />,
        },
        {
          path: "chuyen-khoa",
          element: <SpecialtyList />,
        },
        {
          path: "ca-lam-viec",
          element: <ShiftList />,
        },
        {
          path: "thuoc",
          element: <MedicineList />,
        },
        {
          path: "can-lam-sang",
          element: <SubclinicalList />,
        },
      ],
    },
    {
      path: "/auth",
      element: !isLoggedIn() ? <AuthPageLayout /> : <Navigate to="/" />,
      children: [
        {
          path: "dang-nhap",
          element: <Signin />,
        },
        {
          path: "dang-ky",
          element: <Signup />,
        },
        {
          path: "lay-lai-mat-khau",
          element: <RenewPassword />,
        },
        {
          path: "",
          element: <Navigate to="/auth/dang-nhap" />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
};

export default Router;
