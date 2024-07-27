import { create } from "zustand";
import axios from "axios";
import dayjs from "dayjs";

export const store = create((set, get) => ({
  events: [],
  isLoaded: false,
  copyEvents: [],

  getEvents: async () => {
    try {
      console.log("aqui");
      const { data } = await axios(
        "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule"
      );
      const formatEvent = data.map((e) => {
        const fecha = e.fecha.slice(0, 10);
        const start = new Date(`${fecha}T${e.hora}:00`);

        const end = new Date(start.getTime() + 30 * 60000); // a la hora del inicio  se le suma 30 minutos para asi generar la hora final

        const result = {
          id: e.id_agenda,
          title: e.id_agenda === -1 ? "Disponible" : e.ape_nom,
          start: start,
          end: end,
        };

        return result;
      });

      localStorage.setItem("event", JSON.stringify(formatEvent));
      localStorage.setItem("loaded", JSON.stringify(true));
      console.log("aqui*2");

      set((state) => ({
        ...state,
        events: formatEvent,
      }));
    } catch (error) {
      console.log("error", error);
    }
  },

  setEvents: () => {
    const copy = JSON.parse(localStorage.getItem("event"));

    const result = copy.map((e) => ({
      id: e.id,
      title: e.title,
      start: new Date(e.start),
      end: new Date(e.end),
    }));

    console.log("copy", copy);
    set((state) => ({
      ...state,
      events: result,
    }));
  },
}));
