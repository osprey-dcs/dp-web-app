import { useGlobalState } from "@/components/main/GlobalState.jsx";
import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import { useMemo } from "react";

function DataSetPage() {
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();
    const { rowData } = useGlobalState();

    async function handleExport(format) {
        const result = await api.exportDataSet({
            dataSetId: rowData.id,
            outputFormat: format,
        });
        if (result instanceof Error) {
            toast({
                title: result.constructor.name,
                description: result.message,
                variant: "destructive",
            });
        } else {
            console.log(result);
            window.open(result.exportDataResult?.fileUrl, "_blank");
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row" key="id">
                Set ID: &nbsp;
                {rowData.id}
            </div>
            <div className="flex flex-row" key="name">
                Name: &nbsp;
                {rowData.name}
            </div>
            <div className="flex flex-row" key="description">
                Description: &nbsp;
                {rowData.description}
            </div>
            <div className="flex flex-row" key="ownerId">
                Owner ID: &nbsp;
                {rowData.ownerId}
            </div>
            {rowData.dataBlocks.map((block, index) => (
                <div className="mt-2" key={index}>
                    <span className="font-medium">Data Block {index + 1}:</span>
                    <div className="flex flex-col" key={index}>
                        <span>
                            Start Time:{" "}
                            {block.beginTime.epochSeconds.toString()}.
                            {block.beginTime.nanoseconds.toString()}
                        </span>
                        <span>
                            End Time: {block.endTime.epochSeconds.toString()}.
                            {block.endTime.nanoseconds.toString()}
                        </span>
                        <span>PV Names: {block.pvNames.join(", ")}</span>
                    </div>
                </div>
            ))}
            <div className="mt-2 flex flex-row space-x-2 text-foreground">
                <button
                    onClick={() => handleExport(1)}
                    className="hover:text-muted-foreground"
                >
                    HDF5
                </button>
                <button
                    onClick={() => handleExport(2)}
                    className="hover:text-muted-foreground"
                >
                    CSV
                </button>
                <button
                    onClick={() => handleExport(3)}
                    className="hover:text-muted-foreground"
                >
                    XLSX
                </button>
            </div>
        </div>
    );
}

export default DataSetPage;
