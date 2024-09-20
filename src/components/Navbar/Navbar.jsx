import { useDispatch } from "react-redux";
import { logout } from "../../redux-store/authSlice";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.navbar}>
      <h1>Task Manager</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
