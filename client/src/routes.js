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

const isPatient = (user) => {
  return user.isStaff === false;
};

const isStaff = (user) => {
  return user.isStaff === true && user.isAdmin === false;
};

const isAdmin = (user) => {
  return user.isStaff === true && user.isAdmin === true;
};

const Router = () => {
  const { isLoggedIn, user, logout } = useAuth();

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
          element:
            isStaff(user) || isAdmin(user) ? <WorkSchedule /> : <ErrorPage />,
        },
        {
          path: "lich-kham",
          element: <AppointmentSchedule />,
        },
        {
          path: "bac-si",
          element: isAdmin(user) ? <DoctorList /> : <ErrorPage />,
        },
        {
          path: "benh-nhan",
          element: isAdmin(user) ? <PatientList /> : <ErrorPage />,
        },
        {
          path: "chuyen-khoa",
          element: isAdmin(user) ? <SpecialtyList /> : <ErrorPage />,
        },
        {
          path: "ca-lam-viec",
          element: isAdmin(user) ? <ShiftList /> : <ErrorPage />,
        },
        {
          path: "thuoc",
          element: isAdmin(user) ? <MedicineList /> : <ErrorPage />,
        },
        {
          path: "can-lam-sang",
          element: isAdmin(user) ? <SubclinicalList /> : <ErrorPage />,
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
