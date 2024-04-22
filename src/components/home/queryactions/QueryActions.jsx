import { memo, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import PropTypes from "prop-types";

import DataSourcesChip from "./datasourceschip/DataSourcesChip";
import TimeRangeChip from "./timechip/TimeRangeChip";
import DataPlatformApi from "../../../domain/grpc-client/DataPlatformApi";

const propTypes = {
    setResultData: PropTypes.func,
}

const QueryActions = memo(function QueryActions(props) {
    const [timeRange, setTimeRange] = useState({});
    const [dataSources, setDataSources] = useState({});
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    async function queryDataTable() {
        const result = await api.queryDataTable(queryParams);
        props.setResultData(result);
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

        queryDataTable();
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row z-10">
                <TimeRangeChip setTimeRange={setTimeRange} />
                <DataSourcesChip dataSources={dataSources} setDataSources={setDataSources} />
                <div>Attributes</div>
            </div>
            <button className="btn-std px-5 py-2" onClick={handleSubmit}>Run Query</button>
        </div>
    )
});

QueryActions.propTypes = propTypes;
export default QueryActions;