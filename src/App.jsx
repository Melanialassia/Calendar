//HOOKS
import { useEffect, useState } from "react";
//COMPONENTS
import LateralMenu from "./components/LateralMenu/LateralMenu";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import FormEvent from "./components/FormEvent/FormEvent";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";


function App() {
  
  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const openCreateModal = () => {
    setInitialValues({});
    setModal(true);
  };

  const openEditModal = (info) => {
    setInitialValues(info);
    console.log("hola", initialValues);
    setModal(true)
  }

  const closeModal = () => {
    setModal(false);
  };


  return (
    <div className="m-0 p-0">
      <Navbar openModal={openCreateModal} />
      <div className=" flex flex-row justify-between mx-auto p-4">
        <LateralMenu />
        <MyCalendar openModal={openEditModal} />
        <Modal show={modal} onClose={closeModal}>
          <FormEvent 
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
