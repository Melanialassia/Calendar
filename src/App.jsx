//HOOKS
import { useEffect, useState } from "react";
//COMPONENTS
import CreateEvent from "./components/CreateEvent/CreateEvent";
import LateralMenu from "./components/LateralMenu/LateralMenu";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
//STORE
import { store } from "./store/store";

function App() {
  const { getEvents, events } = store();

  useEffect(() => {
    if(events.length === 0) {
      getEvents();
    }
  }, []);


  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="m-0 p-0">
      <Navbar openModal={openModal} />
      <div className=" flex flex-row justify-between mx-auto p-4">
        <LateralMenu />
        <MyCalendar />
        <Modal show={showModal} onClose={closeModal}>
          <CreateEvent />
        </Modal>
      </div>
    </div>
  );
}

export default App;
