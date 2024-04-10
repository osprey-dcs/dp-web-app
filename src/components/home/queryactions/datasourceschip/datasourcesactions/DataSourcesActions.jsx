import PropTypes from "prop-types";
import { useState } from "react";

const propTypes = {
    handleApply: PropTypes.func,
}

function DataSourcesActions(props) {
    const [dataSourcesString, setDataSourcesString] = useState("");

    return (
        <div className="flex flex-col items-center">
            <input placeholder="Data Sources" value={dataSourcesString} onChange={e => setDataSourcesString(e.target.value)} className="input-std mb-4"></input>
            <button onClick={() => props.handleApply(dataSourcesString)} className="btn-std w-full py-2">Apply</button>
        </div>
    )
}

DataSourcesActions.propTypes = propTypes;
export default DataSourcesActions;