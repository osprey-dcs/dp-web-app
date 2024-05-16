import { getAnnotationColDefs } from "@/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";

function AnnotationResults({ resultData }) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    useMemo(() => {
        if (resultData === undefined) {
            gridRef.current?.api.showLoadingOverlay();
        } else if (Object.keys(resultData).length === 0) {
            gridRef.current?.api.showNoRowsOverlay();
        } else if (typeof resultData === "object") {
            setColDefs(
                getAnnotationColDefs(
                    resultData.annotationsResult.annotations[0]
                )
            );
            setRowData(resultData.annotationsResult.annotations);
        }
    }, [resultData]);

    return (
        <div className="ag-theme-quartz h-full mb-4 flex-grow shadow-sm rounded-lg">
            <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} />
        </div>
    );
}

export default AnnotationResults;
