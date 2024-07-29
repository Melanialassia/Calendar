//HOOKS
import { useState } from "react";
//COMPONENTS
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
    return Math.floor(Math.random() * num);
  };

  const openCreateModal = ({ start, end }) => {
    const idResult = getRandomId(100);

    const defaultValue = new Date(2021, 8, 16, 18, 30);

    const now = start || defaultValue;
    const hourEnd = end || new Date(now.getTime() + 30 * 60000);

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
      <div className=" flex  mx-auto p-4">
        <MyCalendar
          openEditModal={openEditModal}
          openCreateModal={openCreateModal}
        />
        <Modal show={modal} closeModal={closeModal}>
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
