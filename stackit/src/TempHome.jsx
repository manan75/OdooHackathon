import { useContext } from "react";
import { AppContent } from "./Context/AppContext";

const TempHome = () => {
  const { userData } = useContext(AppContent);

  return (
    <div>
      <h1>
        Hello {userData ? userData.username || userData.name : "Guest"}
      </h1>
    </div>
  );
};

export default TempHome;
