import Router from "./routes";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { AuthProvider } from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
