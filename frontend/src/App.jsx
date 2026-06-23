import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/post/:id"
          element={<PostDetails />}
        />

        <Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;