import OwnerIdChip from "@/components/main/browseAnnotations/annotationActions/ownerIdChip";
import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import { memo, useMemo, useState } from "react";
import NameChip from "./nameChip/NameChip";

const DataSetActions = memo(function DataSetActions({ setResultData }) {
    const [queryParams, setQueryParams] = useState({});
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    async function handleSubmit() {
        if (queryParams.ownerId === "" && queryParams.dataSetName === "") {
            toast({
                title: "Error: Invalid Query",
                description:
                    "Specify an owner ID or data set name to run a query.",
                variant: "destructive",
            });
            return;
        }

        setResultData(undefined);
        const result = await api.queryDataSets(queryParams);
        if (typeof result !== "object") {
            setResultData({});
            toast({
                title: "Error: Exceptional Result",
                description: result,
                variant: "destructive",
            });
        } else if (result instanceof Error) {
            setResultData({});
            toast({
                title: `Error: ${result.constructor.name}`,
                description: result.message,
                variant: "destructive",
            });
        } else {
            setResultData(result);
        }
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row z-10">
                <OwnerIdChip
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />
                <NameChip
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />
            </div>
            <button className="btn-std px-5" onClick={handleSubmit}>
                Run Query
            </button>
        </div>
    );
});

export default DataSetActions;
