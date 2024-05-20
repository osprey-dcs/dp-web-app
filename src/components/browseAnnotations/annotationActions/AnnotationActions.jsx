import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import { memo, useMemo, useState } from "react";
import CommentChip from "./commentChip/CommentChip";
import IdChip from "./idChip/IdChip";

const AnnotationActions = memo(function AnnotationActions({ setResultData }) {
    const [queryParams, setQueryParams] = useState({});
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    async function handleSubmit() {
        if (
            (queryParams.ownerId === "" || queryParams.ownerId === undefined) &&
            (queryParams.comment === "" || queryParams.comment === undefined)
        ) {
            toast({
                title: "Error: Invalid Query",
                description:
                    "Specify an owner id or comment string to run a query",
                variant: "destructive",
            });
            return;
        }

        setResultData(undefined);
        const result = await api.queryAnnotations(queryParams);
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

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex flex-row z-10">
                <IdChip
                    queryParams={queryParams}
                    setQueryParams={setQueryParams}
                />
                <CommentChip
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

export default AnnotationActions;
