import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es"); //traduccion al español
//STYLE
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./mycalendar.css";

const MyCalendar = () => {
  const localizer = dayjsLocalizer(dayjs);
  return (
    <div className="flex p-4 w-full h-full">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, width: '100%', margin: "0 auto" }}
        className="custom"
        views={["month", "week", "day"]}
        messages={{
          allDay: "Todo el día",
          previous: "Anterior",
          next: "Siguiente",
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
