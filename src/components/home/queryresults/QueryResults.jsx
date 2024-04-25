import PropTypes from "prop-types";
import { useMemo, useState } from "react";

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
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    const components = useMemo(() => ({
        dataValueCellRenderer: DataValueCellRenderer,
        timestampCellRenderer: TimestampCellRenderer,
    }), []);

    useMemo(() => {
        console.log("useMemo ran");
        if (Object.keys(props.resultData).length !== 0) {
            setColDefs(getColDefs(props.resultData))
            setRowData(props.resultData.tableResult.rowMapTable.rows.map(row => row.columnValues))
        }
    }, [props.resultData]);


    return (
        <div className="ag-theme-quartz h-full pb-4 flex-grow">
            <AgGridReact
                components={components}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
};

QueryResults.propTypes = propTypes;
export default QueryResults;