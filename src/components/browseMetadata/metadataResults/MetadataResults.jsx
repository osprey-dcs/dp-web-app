import { getMetadataColDefs } from "@/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";

function MetadataResults({ resultData }) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    useMemo(() => {
        if (resultData === undefined) {
            gridRef.current?.api.showLoadingOverlay();
        } else if (Object.keys(resultData).length === 0) {
            gridRef.current?.api.showNoRowsOverlay();
        } else if (typeof resultData === "object") {
            setColDefs(getMetadataColDefs(resultData.pvInfos[0]));
            setRowData(resultData.pvInfos);
        }
    }, [resultData]);

    return (
        <div className="ag-theme-quartz h-full mb-4 flex-grow shadow-sm rounded-lg">
            <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} />
        </div>
    );
}

export default MetadataResults;
