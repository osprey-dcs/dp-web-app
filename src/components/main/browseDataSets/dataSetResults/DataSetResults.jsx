import { getDataSetColDefs } from "@/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";

function DataSetResults({ resultData }) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useMemo(() => {
        if (resultData === undefined) {
            setIsLoading(true);
        } else if (Object.keys(resultData).length === 0) {
            setIsLoading(false);
        } else if (typeof resultData === "object") {
            setIsLoading(false);
            setColDefs(
                getDataSetColDefs(resultData.dataSetsResult.dataSets[0])
            );
            setRowData(resultData.dataSetsResult.dataSets);
        }
    }, [resultData]);

    return (
        <div className="ag-theme-quartz h-full mb-4 flex-grow shadow-sm rounded-lg">
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                loading={isLoading}
                enableCellTextSelection={true}
            />
        </div>
    );
}

export default DataSetResults;
