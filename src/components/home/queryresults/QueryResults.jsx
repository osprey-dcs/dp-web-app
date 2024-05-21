import { getDataColDefs } from "@/lib/utils";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
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

    function selectCell(event) {
        const rowNode = gridRef.current?.api.getRowNode(event.rowIndex);
        console.log(rowNode);
        const columnId = event.column.colId;
        console.log(event);
        const newRow = {
            ...rowNode.data,
            [columnId]: {
                value: {
                    oneofKind: "doubleValue",
                    doubleValue: rowNode.data[columnId].value.doubleValue,
                    selected:
                        rowNode.data[columnId].value.selected === undefined
                            ? true
                            : !rowNode.data[columnId].value.selected,
                },
            },
        };
        rowNode.updateData(newRow);
    }

    function getColNames(columns, firstCol, lastCol) {
        const firstIndex = columns.indexOf(firstCol);
        const lastIndex = columns.indexOf(lastCol);

        console.log(firstIndex);
        console.log(lastIndex);

        if (firstIndex > lastIndex) {
            console.error("Start index cannot be greater than end index.");
            return;
        }
        const subArray = columns.splice(firstIndex, lastIndex - firstIndex + 1);
        return subArray;
    }

    function onCellClicked(event) {
        if (!firstCell || lastCell) {
            setFirstCell({
                row: { index: event.rowIndex },
                column: {
                    instanceId: event.column.instanceId,
                    name: event.column.colId,
                },
            });
            setLastCell(null);
        } else {
            setLastCell({
                row: { index: event.rowIndex },
                column: {
                    instanceId: event.column.instanceId,
                    name: event.column.colId,
                },
            });
        }
        // const rowNode = gridRef.current?.api.getRowNode(event.rowIndex);
        // const cols = [Object.keys(rowNode.data)];
        // let cols = getColNames(Object.keys(rowNode.data))
        // console.log(cols);
        // selectCell(event);
    }

    useEffect(() => {
        if (lastCell) {
            let firstRow = gridRef.current?.api.getRowNode(firstCell.row.index);
            let cols = getColNames(
                Object.keys(firstRow.data),
                firstCell.column.name,
                lastCell.column.name
            );
            console.log(cols);
        }
    }, [lastCell]);

    useMemo(() => {
        if (props.resultData === undefined) {
            gridRef.current?.api.showLoadingOverlay();
        } else if (Object.keys(props.resultData).length === 0) {
            gridRef.current?.api.showNoRowsOverlay();
        } else if (typeof props.resultData === "object") {
            setColDefs(getDataColDefs(props.resultData));
            console.log("set row data");
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
