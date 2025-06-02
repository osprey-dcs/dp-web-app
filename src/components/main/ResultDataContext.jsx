import { createContext, useContext, useReducer } from "react";

export const ResultDataContext = createContext(null);
export const ResultDataDispatchContext = createContext(null);

export function ResultDataProvider({ children }) {
    const [resultData, dispatch] = useReducer(resultDataReducer, {});

    return (
        <ResultDataContext.Provider value={resultData}>
            <ResultDataDispatchContext.Provider value={dispatch}>
                {children}
            </ResultDataDispatchContext.Provider>
        </ResultDataContext.Provider>
    );
}

export function useResultData() {
    return useContext(ResultDataContext);
}

export function useResultDataDispatch() {
    return useContext(ResultDataDispatchContext);
}

function resultDataReducer(state, action) {
    switch (action.type) {
        case "changed":
            console.log(action.resultData);
            return action.resultData;
        default:
            throw Error("Unknown action: " + action.type);
    }
}
