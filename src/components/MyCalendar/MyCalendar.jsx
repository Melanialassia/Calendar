//HOOKS
import { useEffect } from "react";
//LIBRARY
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es"); //traduccion al español
//STORE
import { store } from "../../store/store";
//STYLE
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./mycalendar.css";

const MyCalendar = ({ openModal }) => {

  const {events,getEvents, setEvents, copyEvents } = store();
  const localizer = dayjsLocalizer(dayjs);

  useEffect(() => {
    getEvents();
  }, [getEvents]);


  //para poder agregarle estilos al calendario
  const eventPropGetter = (e) => {
    const style = {
      background: e.title === "Disponible" ? "#057A55" : "#6BBEE8",
      color: "white",
      border: "none",
    };

    return { style };
  };

  const handleEdit = (info) => {
    console.log("edicion", info);
    openModal(info);
  };

  return (
    <div className="flex p-4 w-full h-full">
      <Calendar
        localizer={localizer}
        events={copyEvents}
        defaultDate={new Date(2021, 8, 16)}
        style={{ height: 700, width: "100%", margin: "0 auto" }}
        eventPropGetter={eventPropGetter}
        onDoubleClickEvent={handleEdit}
        className="custom"
        views={["month", "week", "day", "agenda"]}
        messages={{
          previous: "<",
          next: ">",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos",
          showMore: (total) => `+${total} más`,
        }}
      />
    </div>
  );
};

export default MyCalendar;
