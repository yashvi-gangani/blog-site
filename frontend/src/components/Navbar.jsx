import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      <div className="max-w-6xl">

        <Link
          to="/"
          className="logo"
        >
          BlogSite
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/create">
                Create Blog
              </Link>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/profile">
                Profile
              </Link>

              <button
                onClick={
                  logoutHandler
                }
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;