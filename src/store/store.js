import { create } from "zustand";
import axios from "axios";
import dayjs from "dayjs";

export const store = create((set, get) => ({
  events: [],


  getEvents: async () => {
    try {
      const storedEvent = JSON.parse(localStorage.getItem("event"));

      if (!storedEvent) {
        
        const { data } = await axios(
          "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule"
        );

        const formatEvent = data.map((e) => {
          const fecha = e.fecha.slice(0, 10);
          const start = new Date(`${fecha}T${e.hora}:00`);

          const end = new Date(start.getTime() + 30 * 60000); // a la hora del inicio  se le suma 30 minutos para asi generar la hora final

          const result = {
            id: e.id_agenda,
            title: e.id_agenda === -1 ? "DISPONIBLE" : e.ape_nom,
            start: start,
            end: end,
          };

          return result;
        });

        localStorage.setItem("event", JSON.stringify(formatEvent));

        set((state) => ({
          ...state,
          events: formatEvent
        }));

      } else {
      
        const result = storedEvent.map((e) => ({
          id: e.id,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
        }));

        set({
          events: result,
        });

      }
    } catch (error) {
      console.log(error);
    }
  },

  addEvent: (event) => {
    set((state) => {
      const addEvent = [...state.events, event];

      localStorage.setItem("event", JSON.stringify(addEvent));

      return {
        ...state,
        events: addEvent,
      };
    });
  },

  updateEvents: (event) => {
    set((state) => {
      const filterEvent = state.events.filter(
        (e) => e.start != event.start
      );

      const newListEvents = [...filterEvent, event];
      localStorage.setItem("event", JSON.stringify(newListEvents));

      return {
        ...state,
        events: newListEvents,
      };
    });
  },

  removeEvent: (event) => {
    set((state) => {
      const deleteEvent = state.events.filter(
        (e) => e.start !== event.start
      );

      localStorage.setItem("event", JSON.stringify(deleteEvent));

      return {
        ...state,
        events: deleteEvent,
      };
    });
  },
}));
