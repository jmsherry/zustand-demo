import create from "zustand";
import { persist } from "zustand/middleware";
import { get, set } from "idb-keyval";


export const IDBStorage = {
  getItem: async (name) => {
    // Exit early on server
    if (typeof indexedDB === "undefined") {
      return null;
    }

    const value = await get(name);

    console.log("load indexeddb called");
    return value || null;
  },
  setItem: async (name, value) => {
    // Exit early on server
    if (typeof indexedDB === "undefined") {
      return;
    }
    set(name, value);
  },
};

// TODO: Maybe add immer
// import produce from 'immer'

// produce((state) => {
//   state.lush.forest.contains = null
// })

const { API_ENDPOINT = "https://carsapp2050.herokuapp.com/api/v1/cars/" } =
  process.env;

const headers = {
  "Content-Type": "application/json",
};

const useStore = create(
  persist(
    (set, get) => ({
      cars: [],
      error: null,
      isLoading: false,
      loaded: false,
      fetchCars: async () => {
        try {
          const response = await fetch(API_ENDPOINT, {
            headers,
          });
          if (!response.ok) throw response;
          set({
            cars: await response.json(),
            isLoading: false,
            loaded: true,
            error: null,
          });
        } catch (err) {
          set({ error: err, isLoading: false, loaded: true });
        }
      },
      addCar: async (data) => {
        try {
          const response = await fetch(API_ENDPOINT, {
            headers,
            method: "POST",
            body: JSON.stringify(data),
          });
          if (!response.ok) throw response;
          const newCar = await response.json();
          set({
            cars: [...get().cars, newCar],
            isLoading: false,
            loaded: true,
            error: null,
          });
        } catch (err) {
          set({ error: err, isLoading: false, loaded: true });
        }
      },
      updateCar: async (id, changes) => {
        try {
          const response = await fetch(`${API_ENDPOINT}${id}`, {
            headers,
            method: "PUT",
            body: JSON.stringify(changes),
          });
          if (!response.ok) throw response;
          const cars = get().cars;
          const idx = cars.findIndex((car) => car._id === id);
          if (idx === -1)
            throw new Error(`Can not find car to update with id ${id}`);
          const updatedCar = { ...cars[idx], ...changes };
          set({
            cars: [...cars.slice(0, idx), updatedCar, ...cars.slice(idx + 1)],
            isLoading: false,
            loaded: true,
            error: null,
          });
        } catch (err) {
          set({ error: err, isLoading: false, loaded: true });
        }
      },
      removeCar: async (id) => {
        try {
          const response = await fetch(`${API_ENDPOINT}${id}`, {
            headers,
            method: "DELETE",
          });
          if (!response.ok) throw response;
          const cars = get().cars;
          const idx = cars.findIndex((car) => car._id === id);
          if (idx === -1)
            throw new Error(`Can not find car to update with id ${id}`);

          set({
            cars: [...cars.slice(0, idx), ...cars.slice(idx + 1)],
            isLoading: false,
            loaded: true,
            error: null,
          });
        } catch (err) {
          set({ error: err, isLoading: false, loaded: true });
        }
      },
      // sync mutator
      // inc: () => set((state) => ({ count: state.count + 1 })),

      // Internals for rehydration
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      }
    }),
    {
      name: "car-storage",
      getStorage: () => IDBStorage,
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
      }
    }
  )
);

export default useStore;

export const selectCars = (state) => state.cars;
export const selectError = (state) => state.error;
export const selectisLoading = (state) => state.isLoading;
export const selectisLoaded = (state) => state.isLoaded;

export const fetchCars = (state) => state.fetchCars;
export const addCar = (state) => state.addCar;
export const updateCar = (state) => state.updateCar;
export const removeCar = (state) => state.removeCar;
