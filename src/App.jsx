//HOOKS
import { useState } from "react";
//COMPONENTS
import LateralMenu from "./components/LateralMenu/LateralMenu";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import CreateEvent from "./components/CreateEvent/CreateEvent";

function App() {

  const[showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <div className="m-0 p-0">
      <Navbar  openModal={openModal}/>
      <div className="max-w-screen-xl flex flex-row justify-between mx-auto p-4">
        <LateralMenu />
        <MyCalendar />
      <Modal  show={showModal} onClose={closeModal}>
        <CreateEvent />
      </Modal>
      </div>
    </div>
  );
}

export default App;
