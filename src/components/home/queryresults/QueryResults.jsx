import { getDataColDefs } from "@/lib/utils";
import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";
import DataValueCellRenderer from "./dataValueCellRenderer/DataValueCellRenderer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";

const propTypes = {
    resultData: PropTypes.object,
};

function QueryResults(props) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [firstCell, setFirstCell] = useState(null);
    const [lastCell, setLastCell] = useState(null);

    const components = useMemo(
        () => ({ dataValueCellRenderer: DataValueCellRenderer }),
        []
    );

    function onCellClicked(event) {
        if (!firstCell || lastCell) {
            setFirstCell([event.rowIndex, event.column.instanceId]);
            setLastCell(null);
        } else {
            setLastCell([event.rowIndex, event.column.instanceId]);
            console.log(
                `${firstCell[0]}, ${firstCell[1]} to ${event.rowIndex}, ${event.column.instanceId}`
            );
        }

        const rowNode = gridRef.current?.api.getRowNode(event.rowIndex);
        const columnId = event.column.colId;
        const newRow = {
            ...rowData[event.rowIndex],
            [columnId]: {
                value: {
                    doubleValue:
                        rowData[event.rowIndex][columnId].value.doubleValue,
                    oneofKind: "doubleValue",
                    selected: true,
                },
            },
        };
        console.log(newRow);
        rowNode.updateData(newRow);
        // rowNode.updateData(
        //     rowData.map((row, i) => {
        //         if (i === event.rowIndex) {
        //             const columnId = event.column.colId;
        //             // console.log(rowData[0][column]);
        //             const newRow = {
        //                 ...rowData[i],
        //                 [columnId]: {
        //                     value: {
        //                         doubleValue:
        //                             rowData[i][columnId].value.doubleValue,
        //                         oneofKind: "doubleValue",
        //                         selected: true,
        //                     },
        //                 },
        //             };
        //             console.log(rowData[i]);
        //             console.log(newRow);
        //             return newRow;
        //         }
        //         // return row;
        //     })
        // );
        // console.log(rowNode);
        // console.log(event);
    }

    useMemo(() => {
        if (props.resultData === undefined) {
            gridRef.current?.api.showLoadingOverlay();
        } else if (Object.keys(props.resultData).length === 0) {
            gridRef.current?.api.showNoRowsOverlay();
        } else if (typeof props.resultData === "object") {
            setColDefs(getDataColDefs(props.resultData));
            console.log(props.resultData.tableResult.rowMapTable.rows);
            setRowData(
                props.resultData.tableResult.rowMapTable.rows.map(
                    (row) => row.columnValues
                )
            );
        }
    }, [props.resultData]);

    return (
        <div className="ag-theme-quartz h-full mb-4 flex-grow shadow-sm rounded-lg">
            <AgGridReact
                ref={gridRef}
                components={components}
                rowData={rowData}
                columnDefs={colDefs}
                onCellClicked={(e) => onCellClicked(e)}
            />
        </div>
    );
}

QueryResults.propTypes = propTypes;
export default QueryResults;
