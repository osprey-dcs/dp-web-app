import { useState } from "react";
import PropTypes from "prop-types";

import DataSourcesChip from "./datasourceschip/DataSourcesChip";
import TimeRangeChip from "./timechip/TimeRangeChip";
import DataPlatformApi from "../../../domain/grpc-client/DataPlatformApi";

const propTypes = {
    setResultData: PropTypes.func,
}

function QueryActions(props) {
    const [timeRange, setTimeRange] = useState({});
    const [dataSources, setDataSources] = useState([]);
    const api = new DataPlatformApi();

    async function queryDataTable() {
        const queryParams = {
            startEpochs: timeRange.startEpochs,
            endEpochs: timeRange.endEpochs,
            startNanos: timeRange.startNanos,
            endNanos: timeRange.endNanos,
            dataSources: dataSources,
        }

        console.log(queryParams);
        const result = await api.queryDataTable(queryParams);
        props.setResultData(result);
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row z-10">
                <TimeRangeChip setTimeRange={setTimeRange} />
                <DataSourcesChip dataSources={dataSources} setDataSources={setDataSources} />
                <div>Attributes</div>
            </div>
            <button className="btn-std px-5 py-2" onClick={queryDataTable}>Run Query</button>
        </div>
    )
}

export default QueryActions;