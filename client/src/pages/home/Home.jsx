import Centerbar from "../../components/centerbar/Centerbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Nav from "../../components/navbar/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="homeContainer">
        <Leftbar />
        <Centerbar />
        <Rightbar />
      </div>
    </>
  );
}
