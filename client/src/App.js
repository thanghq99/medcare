import Router from "./routes";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
