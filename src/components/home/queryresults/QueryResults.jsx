import { getDataColDefs } from "@/lib/utils";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import DataValueCellRenderer from "./dataValueCellRenderer/DataValueCellRenderer";

const propTypes = {
    resultData: PropTypes.object,
};

function QueryResults({ resultData, setCustomSelection }) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [firstCell, setFirstCell] = useState(null);
    const [lastCell, setLastCell] = useState(null);
    const [timeRange, setTimeRange] = useState({});
    const [dataSources, setDataSources] = useState([]);

    const components = useMemo(
        () => ({ dataValueCellRenderer: DataValueCellRenderer }),
        []
    );

    function selectRow(rowNode, columnIds) {
        let newRow = { ...rowNode.data };
        for (let index in columnIds) {
            const colId = columnIds[index];
            newRow[colId] = {
                value: {
                    oneofKind: "doubleValue",
                    doubleValue: rowNode.data[colId].value.doubleValue,
                    selected:
                        rowNode.data[colId].value.selected === undefined
                            ? true
                            : !rowNode.data[colId].value.selected,
                },
            };
        }
        rowNode.updateData(newRow);
    }

    function getColNames(columns, firstCol, lastCol) {
        const firstIndex = columns.indexOf(firstCol);
        const lastIndex = columns.indexOf(lastCol);

        if (firstIndex > lastIndex) {
            console.error("Start index cannot be greater than end index.");
            return;
        }
        const subArray = columns.splice(firstIndex, lastIndex - firstIndex + 1);
        return subArray;
    }

    function onCellClicked(event) {
        if (event.colDef.field === "timestamp") {
            return;
        }
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
    }

    useEffect(() => {
        if (lastCell) {
            let firstRow = gridRef.current?.api.getRowNode(firstCell.row.index);
            let cols = getColNames(
                Object.keys(firstRow.data),
                firstCell.column.name,
                lastCell.column.name
            );
            setDataSources(cols);
            let newTimeRange = {
                startTime: {},
                endTime: {},
            };
            for (let i = firstCell.row.index; i <= lastCell.row.index; ++i) {
                const rowNode = gridRef.current?.api.getRowNode(i);
                if (i === firstCell.row.index) {
                    newTimeRange.startTime.epochSeconds =
                        rowNode.data.timestamp.value.timestampValue.epochSeconds;
                    newTimeRange.startTime.nanoseconds =
                        rowNode.data.timestamp.value.timestampValue.nanoseconds.toString();
                } else if (i === lastCell.row.index) {
                    newTimeRange.endTime.epochSeconds =
                        rowNode.data.timestamp.value.timestampValue.epochSeconds;
                    newTimeRange.endTime.nanoseconds =
                        rowNode.data.timestamp.value.timestampValue.nanoseconds.toString();
                }
                selectRow(rowNode, cols);
            }
            setTimeRange(timeRange);
            setCustomSelection({
                dataSources: cols,
                timeRange: newTimeRange,
            });
        }
    }, [lastCell]);

    useMemo(() => {
        if (resultData === undefined) {
            gridRef.current?.api.showLoadingOverlay();
        } else if (Object.keys(resultData).length === 0) {
            gridRef.current?.api.showNoRowsOverlay();
        } else if (typeof resultData === "object") {
            setColDefs(getDataColDefs(resultData));
            console.log("set row data");
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
                // onCellCliked={(e) => onCellClicked(e)}
                // onCellMouseOver={(e) => console.log(e)}
            />
        </div>
    );
}

QueryResults.propTypes = propTypes;
export default QueryResults;
