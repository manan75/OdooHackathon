import { useContext } from "react";
import Navbar from "../Frontend/Navbar";
import { AppContent } from "./Context/AppContext";
import AskQuestion from "./AskQuestion";

const TempHome = () => {
  const { userData } = useContext(AppContent);

  return (
    <div>
        <Navbar/>
      <h1>
        Hello {userData ? userData.username || userData.name : "Guest"}
      </h1>
      <AskQuestion/>
    </div>
  );
};

export default TempHome;
