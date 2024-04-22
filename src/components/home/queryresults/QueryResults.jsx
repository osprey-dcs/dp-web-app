import { Profiler, memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
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

    useEffect(() => {
        if (Object.keys(props.resultData).length !== 0) {
            console.log("setting col defs")
            setColDefs(getColDefs(props.resultData))
        }
    }, [props.resultData])

    return (
        <div className="ag-theme-quartz h-full pb-4 flex-grow">
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
};

QueryResults.propTypes = propTypes;
export default QueryResults;