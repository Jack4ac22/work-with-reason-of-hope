"use client";
import { createContext, useContext, useState } from "react";

// Create the context
const PreferencesGlobalContext = createContext();

// create a provider
export function PreferencesGlobalProvider({ children }) {
  const [preferencesObject, setPreferencesObject] = useState({});
  return (
    <PreferencesGlobalContext.Provider
      value={{ preferencesObject, setPreferencesObject }}
    >
      {children}
    </PreferencesGlobalContext.Provider>
  );
}
// create a cutome hook to access the context
export function usePreferencesGlobal() {
  return useContext(PreferencesGlobalContext);
}
