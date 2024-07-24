//COMPONENTS
import LateralMenu from "./components/LateralMenu/LateralMenu";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="m-0 p-0">
      <Navbar />
      <div className="flex">
        <LateralMenu />
        <MyCalendar />
      </div>
    </div>
  );
}

export default App;
