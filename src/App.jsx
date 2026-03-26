import "./App.css";
import { Header, Footer } from "./components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./features/auth/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        dispatch(userData ? login( userData ) : logout());
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return loading ? (
    <>
      <h1>test</h1>{" "}
    </>
  ) : (
    <div
      className="min-h-screen flex flex-wrap 
      content-between bg-gray-400"
    >
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
