//HOOKS
import { useState } from "react";
//COMPONENTS
import LateralMenu from "./components/LateralMenu/LateralMenu";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import FormEvent from "./components/FormEvent/FormEvent";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";

function App() {
  const [modal, setModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isEditting, setIsEditting] = useState(false);
  const getRandomId = (num) => {
    //le creo un id random a evento
    return Math.floor(Math.random() * num + 1);
  };

  const openCreateModal = () => {
    const idResult = getRandomId(100);
    const now = new Date();
    const hourEnd = new Date(now.getTime() + 30 * 60000);

    setInitialValues({
      id: idResult,
      title: "",
      start: now,
      end: hourEnd,
    });
    setModal(true);
  };

  const openEditModal = (info) => {
    setInitialValues(info);
    setIsEditting(true);
    setModal(true);
  };

  const closeModal = () => {
    setIsEditting(false);
    setModal(false);
  };

  return (
    <div className="m-0 p-0">
      <Navbar openCreateModal={openCreateModal} />
      <div className=" flex flex-row justify-between mx-auto p-4">
        <LateralMenu />
        <MyCalendar openEditModal={openEditModal} />
        <Modal show={modal} onClose={closeModal}>
          <FormEvent
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            isEditting={isEditting}
            setIsEditting={setIsEditting}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
