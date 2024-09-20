import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setTasks } from "./redux-store/tasksSlice";
import AuthForm from "./components/AuthForm/AuthForm";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(setTasks(user.username));
    }
  }, [user, dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <AddTask
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                  />
                  <TaskList setEditingTask={setEditingTask} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={!user ? <AuthForm /> : <Navigate to="/" />}
          />
          <Route
            path="/add-task"
            element={
              user ? (
                <>
                  <AddTask
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                  />
                  <TaskList setEditingTask={setEditingTask} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
