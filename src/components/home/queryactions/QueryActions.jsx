import { memo, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import PropTypes from "prop-types";

import TimeRangeChip from "./timechip/TimeRangeChip";
import DataSourcesChip from "./datasourceschip/DataSourcesChip";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";

const propTypes = {
    setResultData: PropTypes.func,
}

const QueryActions = memo(function QueryActions(props) {
    const [timeRange, setTimeRange] = useState({});
    const [dataSources, setDataSources] = useState({});
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    async function runQuery(queryParams) {
        props.setResultData(undefined);
        const result = await api.queryDataTable(queryParams);
        if (typeof result !== 'object') {
            props.setResultData({});
            toast({
                title: "Error: Query Too Large",
                description: result,
                variant: "destructive"
            })
        } else {
            props.setResultData(result);
        }
    }

    function handleSubmit() {
        const queryParams = {
            startEpochs: timeRange.startEpochs,
            endEpochs: timeRange.endEpochs,
            startNanos: timeRange.startNanos,
            endNanos: timeRange.endNanos,
            pvNames: dataSources.pvNames,
            useRegex: dataSources.useRegex,
            regexPattern: dataSources.regexPattern
        }
        if (!queryParams.startEpochs || !queryParams.endEpochs || !(queryParams.pvNames || queryParams.regexPattern)) {
            toast({
                title: "Error: Invalid Query",
                description: "Specify a time range and data sources to run a query",
                variant: "destructive"
            })
            return;
        }

        runQuery(queryParams)
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row z-10">
                <TimeRangeChip setTimeRange={setTimeRange} />
                <DataSourcesChip dataSources={dataSources} setDataSources={setDataSources} />
            </div>
            <button className="btn-std px-5" onClick={handleSubmit}>Run Query</button>
        </div>
    )
});

QueryActions.propTypes = propTypes;
export default QueryActions;