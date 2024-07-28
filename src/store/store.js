import { create } from "zustand";
import axios from "axios";
import dayjs from "dayjs";

export const store = create((set, get) => ({
  events: [],
  copyEvents: [],

  getEvents: async () => {
    try {
      const storedEvent = JSON.parse(localStorage.getItem("event"));

      if (storedEvent) {
        const result = storedEvent.map((e) => ({
          id: e.id,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
        }));

        set({
          copyEvents: result,
        });
      } else {
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
          events: formatEvent,
          copyEvents: [...formatEvent],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

  addEvent: (event) => {
    set((state) => {
      const addEvent = [...state.copyEvents, event];

      localStorage.setItem("event", JSON.stringify(addEvent));

      return {
        ...state,
        copyEvents: addEvent,
      };
    });
  },

  updateEvents: (event) => {
    set((state) => {
      const filterEvent = state.copyEvents.filter(
        (e) => e.start != event.start
      );

      const newListEvents = [...filterEvent, event];
      localStorage.setItem("event", JSON.stringify(newListEvents));

      return {
        ...state,
        copyEvents: newListEvents,
      };
    });
  },

  removeEvent: (event) => {
    set((state) => {
      const deleteEvent = state.copyEvents.filter(
        (e) => e.start !== event.start
      );

      localStorage.setItem("event", JSON.stringify(deleteEvent));

      return {
        ...state,
        copyEvents: deleteEvent,
      };
    });
  },
}));
