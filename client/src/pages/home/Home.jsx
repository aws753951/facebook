import Centerbar from "../../components/centerbar/Centerbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Nav from "../../components/navbar/Nav";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Nav />
      <div className="homeContainer">
        <Leftbar />
        <Centerbar user={user} />
        <Rightbar user={user} />
      </div>
    </>
  );
}
