import { create } from 'zustand';

// Store to manage traffic light states
export const useTrafficStore = create((set) => ({
  stoplightStates: new Map(), // Maps stoplight IDs to their current state
  manualOverrides: new Map(), // Maps stoplight IDs to their override status

  registerStoplight: (id, position, rotation) => 
    set((state) => ({
      stoplightStates: new Map(state.stoplightStates).set(id, {
        id,
        position,
        state: 'red',
        stopPoint: position[2],
        isManuallyOverridden: false
      })
    })),

  updateStoplightState: (id, lightState) =>
    set((state) => {
      const stoplightStates = new Map(state.stoplightStates);
      const current = stoplightStates.get(id);
      const manualOverrides = state.manualOverrides;
      
      // If this stoplight is manually overridden, don't update its state
      if (current && manualOverrides.has(id)) {
        return { stoplightStates };
      }
      
      if (current) {
        stoplightStates.set(id, { ...current, state: lightState });
      }
      return { stoplightStates };
    }),

  manualOverrideStoplight: (id, lightState, duration) =>
    set((state) => {
      const stoplightStates = new Map(state.stoplightStates);
      const manualOverrides = new Map(state.manualOverrides);
      const current = stoplightStates.get(id);
      
      if (current) {
        stoplightStates.set(id, { 
          ...current, 
          state: lightState,
          isManuallyOverridden: true
        });
        
        manualOverrides.set(id, {
          originalState: current.state,
          duration
        });
      }
      
      return { stoplightStates, manualOverrides };
    }),

  resetStoplightOverride: (id) =>
    set((state) => {
      const stoplightStates = new Map(state.stoplightStates);
      const manualOverrides = new Map(state.manualOverrides);
      const current = stoplightStates.get(id);
      
      if (current) {
        stoplightStates.set(id, { 
          ...current, 
          isManuallyOverridden: false
        });
        
        manualOverrides.delete(id);
      }
      
      return { stoplightStates, manualOverrides };
    }),
}));