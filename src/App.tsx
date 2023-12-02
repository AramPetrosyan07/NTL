import "./App.css";
import { RouterProvider } from "react-router-dom";
import LogIn from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/Dashboard";
import Preview from "./components/Preview";
import AdminPannel from "./pages/AdminPannel";
import Settings from "./components/Admin/Settings";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AdminHome from "./components/Admin/AdminHome";
import Profile from "./components/Admin/Profile";
import Notifications from "./components/Admin/Notifications";
import Teams from "./components/Admin/Teams";
import Security from "./components/Admin/Security";
import TrucksBoard from "./pages/TrucksBoard";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import AddItems from "./components/Admin/AddItems";
import ChangeItem from "./components/Admin/ChangeItem";
import { useTypedDispatch } from "./hooks/useTypedSelector";
import { useEffect } from "react";
import { authMe } from "./store/asyncThunk";
import TestInput from "./pages/TestInput";

function App() {
  const dispatch = useTypedDispatch();

  const authMeFn = async () => {
    await dispatch(authMe());
  };

  useEffect(() => {
    authMeFn();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" index element={<Dashboard />} />
        <Route path="/trucks" element={<TrucksBoard />} />
        <Route path="/testInput" element={<TestInput />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPannel />
            </PrivateRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="forgot"
          element={
            <PublicRoute>
              <Forgot />
            </PublicRoute>
          }
        />
        <Route path="/dashboard/preview/:id" element={<Preview />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPannel />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route
            path="additems"
            element={
              <PrivateRoute>
                <AddItems />
              </PrivateRoute>
            }
          />
          <Route
            path="changeitems"
            element={
              <PrivateRoute>
                <ChangeItem />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route
              path="teams"
              element={
                <PrivateRoute>
                  <Teams />
                </PrivateRoute>
              }
            />
            <Route
              path="security"
              element={
                <PrivateRoute>
                  <Security />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
