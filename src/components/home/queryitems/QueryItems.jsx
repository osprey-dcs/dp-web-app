import TimeRangeSelector from "./timeselector/TimeRangeSelector";

import DataPlatformApi from "../../../domain/grpc-client/DataPlatformApi";

function QueryItems() {

    function testApi() {
        const test = new DataPlatformApi();
        test.queryDataTable();
    }

    return (
        <div className="py-3 flex items-center justify-between bg-blue-200">
            <div className="flex flex-row">
                <TimeRangeSelector />
                <div className="mr-4">Data Sources</div>
                <div>Attributes</div>
            </div>
            <button className="btn-std px-5 py-2 rounded text-sm font-medium text-white bg-[#19191B]" onClick={testApi}>Run Query</button>
        </div>
    )
}

export default QueryItems;