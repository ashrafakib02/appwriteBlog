import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //TODO: make it more easy to understand and maintainable
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    const timer = setTimeout(() => setLoader(false), 0);
    return () => clearTimeout(timer);

  }, [authStatus, navigate, authentication]);

  return loader ? <div className="loader">Loading...</div> :<>{children}</>;
}
