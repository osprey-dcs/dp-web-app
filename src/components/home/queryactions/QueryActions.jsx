import DataSourcesChip from "./datasourceschip/DataSourcesChip";
import TimeRangeChip from "./timechip/TimeRangeChip";

import DataPlatformApi from "../../../domain/grpc-client/DataPlatformApi";
import { useEffect, useState } from "react";

function QueryActions() {
    const [timeRange, setTimeRange] = useState({});
    const api = new DataPlatformApi();

    useEffect(() => {
        console.log(timeRange);
    }, [timeRange])

    function queryDataTable() {
        const queryParams = {
            startEpochs: timeRange.startEpochs,
            endEpochs: timeRange.endEpochs,
            startNanos: timeRange.startNanos,
            endNanos: timeRange.endNanos
        }

        api.queryDataTable(timeRange);
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row">
                <TimeRangeChip setTimeRange={setTimeRange} />
                <DataSourcesChip />
                <div>Attributes</div>
            </div>
            <button className="btn-std px-5 py-2" onClick={queryDataTable}>Run Query</button>
        </div>
    )
}

export default QueryActions;