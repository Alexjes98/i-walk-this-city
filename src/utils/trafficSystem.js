import { create } from 'zustand';

// Store to manage traffic light states
export const useTrafficStore = create((set) => ({
  stoplightStates: new Map(), // Maps stoplight IDs to their current state
  registerStoplight: (id, position, rotation) => 
    set((state) => ({
      stoplightStates: new Map(state.stoplightStates).set(id, {
        id,
        position,
        state: 'red',
        stopPoint: position[2]
      })
    })),
  updateStoplightState: (id, lightState) =>
    set((state) => {
      const stoplightStates = new Map(state.stoplightStates);
      const current = stoplightStates.get(id);
      if (current) {
        stoplightStates.set(id, { ...current, state: lightState });
      }
      return { stoplightStates };
    }),
}));