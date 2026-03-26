import { useDispatch } from "react-redux";
import authService from "../../../appwrite/auth";
import { logout } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/")
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-colors duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
