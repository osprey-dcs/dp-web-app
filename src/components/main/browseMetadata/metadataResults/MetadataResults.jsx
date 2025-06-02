import { usePVs, usePVsDispatch } from "@/components/main/PVsContext";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getMetadataColDefs, onPVSelected } from "@/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";

function MetadataResults({ resultData }) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

    const dispatch = usePVsDispatch();
    const pvs = usePVs();

    function onCellClicked(e) {
        if (e.column.colId === "pvName") {
            onPVSelected(e.data.pvName, pvs, dispatch, ToastAction, toast);
            // dispatch({
            //     type: "added",
            //     pvName: e.data.pvName,
            // });
            // console.log(e.data.pvName);
        }
    }

    useMemo(() => {
        if (resultData === undefined) {
            setIsLoading(true);
        } else if (Object.keys(resultData).length === 0) {
            setIsLoading(false);
        } else if (typeof resultData === "object") {
            setIsLoading(false);
            setColDefs(getMetadataColDefs(resultData.pvInfos[0]));
            setRowData(resultData.pvInfos);
        }
    }, [resultData]);

    return (
        <div className="ag-theme-quartz h-full mb-4 flex-grow shadow-sm rounded-lg">
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                onCellClicked={(e) => onCellClicked(e)}
                loading={isLoading}
                enableCellTextSelection={true}
            />
        </div>
    );
}

export default MetadataResults;
