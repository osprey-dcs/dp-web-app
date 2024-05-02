import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";

import DataValueCellRenderer from "./dataValueCellRenderer/DataValueCellRenderer";
import TimestampCellRenderer from "./timestampCellRenderer/TimestampCellRenderer";
import { getColDefs } from "/src/lib/utils";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const propTypes = {
    resultData: PropTypes.object
}

function QueryResults(props) {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    const components = useMemo(() => ({
        dataValueCellRenderer: DataValueCellRenderer,
        timestampCellRenderer: TimestampCellRenderer,
    }), []);

    useMemo(() => {
        if (props.resultData === undefined) {
            gridRef.current?.api.showLoadingOverlay();
        } else if (Object.keys(props.resultData).length === 0) {
            gridRef.current?.api.showNoRowsOverlay();
        } else if (typeof props.resultData === 'object') {
            setColDefs(getColDefs(props.resultData))
            setRowData(props.resultData.tableResult.rowMapTable.rows.map(row => row.columnValues))
        }
    }, [props.resultData]);


    return (
        <div className="ag-theme-quartz h-full pb-4 flex-grow">
            <AgGridReact
                ref={gridRef}
                components={components}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
};

QueryResults.propTypes = propTypes;
export default QueryResults;