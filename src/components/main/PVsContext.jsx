import { createContext, useContext, useReducer } from "react";

export const PVsContext = createContext(null);
export const PVsDispatchContext = createContext(null);

export function PVsProvider({ children }) {
    const [pvs, dispatch] = useReducer(pvsReducer, new Set());

    return (
        <PVsContext.Provider value={pvs}>
            <PVsDispatchContext.Provider value={dispatch}>
                {children}
            </PVsDispatchContext.Provider>
        </PVsContext.Provider>
    );
}

export function usePVs() {
    return useContext(PVsContext);
}

export function usePVsDispatch() {
    return useContext(PVsDispatchContext);
}

function pvsReducer(pvs, action) {
    switch (action.type) {
        case "added":
            return new Set(pvs).add(action.pvName);
        case "removed":
            let newPVList = new Set(pvs);
            newPVList.delete(action.pvName);
            return newPVList;
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}
