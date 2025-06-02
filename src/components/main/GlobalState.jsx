import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
    const [rowData, setRowData] = useState(null);

    return (
        <GlobalStateContext.Provider value={{ rowData, setRowData }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState() {
    return useContext(GlobalStateContext);
}
