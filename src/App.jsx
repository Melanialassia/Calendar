//COMPONENTS
import LateralMenu from "./components/LateralMenu/LateralMenu";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <MyCalendar />
        <LateralMenu />
      </div>
    </div>
  );
}

export default App;
