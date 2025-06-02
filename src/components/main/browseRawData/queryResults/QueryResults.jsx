import { usePVs, usePVsDispatch } from "@/components/main/PVsContext";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getDataColDefs, onPVSelected } from "@/lib/utils";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";
import DataValueCellRenderer from "./dataValueCellRenderer/DataValueCellRenderer";

const propTypes = {
    resultData: PropTypes.object,
};

function QueryResults({ resultData }) {
    const gridRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    const { toast } = useToast();

    const dispatch = usePVsDispatch();
    const pvs = usePVs();

    const components = useMemo(
        () => ({ dataValueCellRenderer: DataValueCellRenderer }),
        []
    );

    useMemo(() => {
        if (resultData === undefined) {
            setIsLoading(true);
        } else if (Object.keys(resultData).length === 0) {
            setIsLoading(false);
        } else if (typeof resultData === "object") {
            setIsLoading(false);
            setColDefs(getDataColDefs(resultData));
            setRowData(
                resultData.tableResult.rowMapTable.rows.map(
                    (row) => row.columnValues
                )
            );
        }
    }, [resultData]);

    return (
        <div className="ag-theme-quartz h-full mb-4 flex-grow shadow-sm rounded-lg">
            <AgGridReact
                ref={gridRef}
                components={components}
                rowData={rowData}
                columnDefs={colDefs}
                loading={isLoading}
                enableCellTextSelection={true}
                onColumnHeaderClicked={(e) =>
                    onPVSelected(
                        e.column.colId,
                        pvs,
                        dispatch,
                        ToastAction,
                        toast
                    )
                }
            />
        </div>
    );
}

QueryResults.propTypes = propTypes;
export default QueryResults;
