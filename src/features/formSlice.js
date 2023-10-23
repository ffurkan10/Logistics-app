// slices/formSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const formSlice = createSlice({
  name: "form",
  initialState: {
    il: "",
    id: null,
    ilce: "",
    km: 0,
    tur: "",
    addedData: sessionStorage.getItem("routeItems")
      ? JSON.parse(sessionStorage.getItem("routeItems"))
      : [],
  },
  reducers: {
    setIl: (state, action) => {
      state.il = action.payload;
    },
    setIlce: (state, action) => {
      state.ilce = action.payload;
    },
    setKm: (state, action) => {
      state.km = action.payload;
    },
    setTur: (state, action) => {
      state.tur = action.payload;
    },

    addData: (state) => {
      const counter = state.addedData.length || 0;
      state.counter = counter + 1;

      state.addedData.push({
        il: state.il,
        ilce: state.ilce,
        km: state.km,
        tur: state.tur,
        id: uuidv4(),
        counter: counter + 1,
      });
      state.il = "";
      state.ilce = "";
      state.km = 0;
      state.tur = "";
      sessionStorage.setItem("routeItems", JSON.stringify(state.addedData));
    },

    // deleteData: (state, action) => {
    //   const itemId = action.payload;
    //   state.addedData = state.addedData.filter((veri) => veri.id !== itemId);

    //   sessionStorage.setItem("routeItems", JSON.stringify(state.addedData));
    // },

    deleteData: (state, action) => {
      const itemId = action.payload;
      const itemToDelete = state.addedData.find((veri) => veri.id === itemId);
      const deletedItemCounter = itemToDelete ? itemToDelete.counter : 0;

      state.addedData.forEach((veri) => {
        if (veri.id !== itemId && veri.counter > deletedItemCounter) {
          veri.counter -= 1;
        }
      });

      state.addedData = state.addedData.filter((veri) => veri.id !== itemId);
      sessionStorage.setItem("routeItems", JSON.stringify(state.addedData));
    },

    updateData: (state, action) => {
      if (state && state.addedData) {
        state.addedData = state.addedData.map((item) => {
          if (item && item.id === action.payload.id) {
            item.il = action.payload.il;
            item.ilce = action.payload.ilce;
            item.km = action.payload.km;
            item.tur = action.payload.tur;
          }
          return item;
        });
      }
      sessionStorage.setItem("routeItems", JSON.stringify(state.addedData));
    },
  },
});

export const {
  setIl,
  setIlce,
  setKm,
  setTur,
  addData,
  deleteData,
  totalKm,
  updateData,
} = formSlice.actions;
export default formSlice.reducer;
