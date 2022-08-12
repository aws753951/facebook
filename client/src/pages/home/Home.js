import Centerbar from "../../components/centerbar/Centerbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <Leftbar />
        <Centerbar />
        <Rightbar />
      </div>
    </>
  );
}
