import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import DataSourcesChip from "./datasourceschip/DataSourcesChip";
import TimeRangeChip from "./timechip/TimeRangeChip";

const propTypes = {
    setResultData: PropTypes.func,
};

const QueryActions = memo(function QueryActions({
    setResultData,
    useTimeRange,
}) {
    const [timeRange, setTimeRange] = useState({});
    const [dataSources, setDataSources] = useState({});
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    async function runQuery(queryParams) {
        setResultData(undefined);
        const result = useTimeRange
            ? await api.queryDataTable(queryParams)
            : await api.queryMetadata(queryParams);
        if (typeof result !== "object") {
            setResultData({});
            toast({
                title: "Error: Exceptional Result",
                description: result,
                variant: "destructive",
            });
        } else {
            setResultData(result);
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
            regexPattern: dataSources.regexPattern,
        };
        if (
            ((!queryParams.startEpochs || !queryParams.endEpochs) &&
                useTimeRange) ||
            !(queryParams.pvNames || queryParams.regexPattern)
        ) {
            const specTimeRange = useTimeRange ? "a time range and " : "";
            toast({
                title: "Error: Invalid Query",
                description: `Specify ${specTimeRange}data sources to run a query`,
                variant: "destructive",
            });
            return;
        }

        runQuery(queryParams);
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row z-10">
                {useTimeRange && <TimeRangeChip setTimeRange={setTimeRange} />}
                <DataSourcesChip
                    dataSources={dataSources}
                    setDataSources={setDataSources}
                />
            </div>
            <button className="btn-std px-5" onClick={handleSubmit}>
                Run Query
            </button>
        </div>
    );
});

QueryActions.propTypes = propTypes;
export default QueryActions;
