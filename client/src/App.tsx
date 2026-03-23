import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Students from "./pages/Students";
import Schedule from "./pages/Schedule";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";


function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/dashboard"}>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/users"}>
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      </Route>
      <Route path={"/students"}>
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      </Route>
      <Route path={"/schedule"}>
        <ProtectedRoute>
          <Schedule />
        </ProtectedRoute>
      </Route>
      <Route path={"/attendance"}>
        <ProtectedRoute>
          <Attendance />
        </ProtectedRoute>
      </Route>
      <Route path={"/reports"}>
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      </Route>
      <Route path={"/settings"}>
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Default redirect to login */}
      <Route path={"/"} component={Login} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Header />
      <Router />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <DashboardLayout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
