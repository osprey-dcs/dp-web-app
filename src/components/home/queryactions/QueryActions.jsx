import TimeRangeChip from "./timechip/TimeRangeChip";

import DataPlatformApi from "../../../domain/grpc-client/DataPlatformApi";
import { useEffect, useState } from "react";

function QueryActions() {
    const [timeRange, setTimeRange] = useState({});

    useEffect(() => {
        console.log(timeRange);
    }, [timeRange])

    function testApi() {
        const test = new DataPlatformApi();
        test.queryDataTable(timeRange.start, timeRange.end);
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row">
                <TimeRangeChip setTimeRange={setTimeRange} />
                <div className="mr-4">Data Sources</div>
                <div>Attributes</div>
            </div>
            <button className="btn-std px-5 py-2" onClick={testApi}>Run Query</button>
        </div>
    )
}

export default QueryActions;