import { FilterErrorMessage } from "@/components/ui/FilterErrorMessage";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import {
    cn,
    formatDate,
    validateDateRange,
    validateNanosRange,
} from "@/lib/utils";
import { MinusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { Fragment, useMemo, useState } from "react";
import DatasetPicker from "./datasetPicker/DatasetPicker";

const propTypes = {
    setIsOpen: PropTypes.func,
};

function AddDatasetActions({ setIsOpen, customSelection }) {
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();
    const maxDate = formatDate(new Date());
    const [showAddBlockActions, setShowAddBlockActions] = useState(false);
    const [dataBlocks, setDataBlocks] = useState([]);
    const [errText, setErrText] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDatetime, setStartDatetime] = useState("");
    const [startNanos, setStartNanos] = useState("");
    const [endDatetime, setEndDatetime] = useState("");
    const [endNanos, setEndNanos] = useState("");
    const [dataSourcesString, setDataSourcesString] = useState("");

    const [nameErrClass, setNameErrClass] = useState("");
    const [descriptionErrClass, setDescriptionErrClass] = useState("");
    const [addDbErrClass, setAddDbErrClass] = useState("");
    const [startDateErrClass, setStartDateErrClass] = useState("");
    const [startNanosErrClass, setStartNanosErrClass] = useState("");
    const [endDateErrClass, setEndDateErrClass] = useState("");
    const [endNanosErrClass, setEndNanosErrClass] = useState("");
    const [dataSourcesErrClass, setDataSourcesErrClass] = useState("");
    const [dataSources, setDataSources] = useState(new Set());

    function handleAddBlock() {
        const validDate = validateDateRange(
            startDatetime,
            endDatetime,
            startNanos,
            endNanos,
            setStartDateErrClass,
            setEndDateErrClass,
            setStartNanosErrClass,
            setEndNanosErrClass
        );
        const validNanos = validateNanosRange(
            startNanos,
            endNanos,
            setStartNanosErrClass,
            setEndNanosErrClass
        );

        if (!(validDate && validNanos) || dataSources.size === 0) {
            console.log("err");
            // dataSourcesString === "" &&
            console.log(dataSources.size);
            dataSources.size === 0 &&
                setDataSourcesErrClass("border-destructive");
            setErrText("Error in Highlighted Fields");
            return;
        }

        setErrText("");

        const ptToGMT = 25200;

        const startEpochs =
            Math.floor(new Date(startDatetime).getTime() / 1000) - ptToGMT;
        const endEpochs =
            Math.floor(new Date(endDatetime).getTime() / 1000) - ptToGMT;
        setDataBlocks([
            ...dataBlocks,
            {
                startEpochs: startEpochs,
                startDatetime: startDatetime,
                endEpochs: endEpochs,
                endDatetime: endDatetime,
                startNanos: Number(startNanos),
                endNanos: Number(endNanos),
                pvNames: [...dataSources],
                // pvNames: dataSourcesString.split(", "),
            },
        ]);
        handleCancel();
    }

    function handleCancel() {
        setShowAddBlockActions(false);
        setStartDatetime("");
        setStartNanos("");
        setEndDatetime("");
        setEndNanos("");
        setDataSources(new Set());
        setDataSourcesString("");
    }

    function handleDeleteBlock(index) {
        console.log("delete block " + index);
        setDataBlocks(dataBlocks.filter((db, i) => i !== index));
    }

    async function handleAddSet() {
        if (name === "" || description === "" || dataBlocks.length === 0) {
            if (name === "") setNameErrClass("border-destructive");
            if (description === "")
                setDescriptionErrClass("border-destructive");
            if (dataBlocks.length === 0) setAddDbErrClass("text-destructive");
            return;
        }

        const queryParams = {
            name: name,
            description: description,
            dataBlocks: dataBlocks,
        };
        const result = await api.createDataSet(queryParams);

        let toastTitle = "";
        let toastDescription = "";
        let toastVariant = "default";
        let toastActions = null;

        const FileFormats = Object.freeze({
            HDF5: 1,
            CSV: 2,
            XLSX: 3,
        });

        switch (typeof result) {
            case "object":
                if (result.oneofKind === "createDataSetResult") {
                    setIsOpen(false);
                    const dataSetId = result.createDataSetResult?.dataSetId;
                    navigator.clipboard.writeText(dataSetId);
                    toastTitle = "Data Set Successfully Created";
                    toastDescription = `Copied data set id ${dataSetId} to clipboard. Export this data set?`;
                    toastActions = [
                        <ToastAction
                            onClick={() =>
                                exportDataSet(dataSetId, FileFormats.HDF5)
                            }
                            altText="HDF5"
                        >
                            HDF5
                        </ToastAction>,
                        <ToastAction
                            onClick={() =>
                                exportDataSet(dataSetId, FileFormats.CSV)
                            }
                            altText="CSV"
                        >
                            CSV
                        </ToastAction>,
                        <ToastAction
                            onClick={() =>
                                exportDataSet(dataSetId, FileFormats.XLSX)
                            }
                            altText="XLSX"
                        >
                            XLSX
                        </ToastAction>,
                    ];
                }
                break;
            case "string":
                toastTitle = "Error";
                toastDescription = result;
                toastVariant = "destructive";
                break;
            default:
                toastTitle = "Error";
                toastDescription =
                    "An error occured while creating the basis set";
                toastVariant = "destructive";
                break;
        }

        toast({
            title: toastTitle,
            description: toastDescription,
            variant: toastVariant,
            actions: toastActions,
            newlineActions: true,
        });

        async function exportDataSet(dataSetId, outputFormat) {
            const result = await api.exportDataSet({
                dataSetId: dataSetId,
                outputFormat: outputFormat,
            });
            window.open(result.exportDataSetResult?.fileUrl, "_blank");
            console.log(result);
        }
    }

    // useEffect(() => {
    //     // TODO: Maybe PT to GMT?
    //     const startEpochsNum = parseInt(
    //         customSelection.timeRange.startTime.epochSeconds,
    //         10
    //     );
    //     const endEpochsNum = parseInt(
    //         customSelection.timeRange.endTime.epochSeconds,
    //         10
    //     );
    //     const startDatetime = new Date(startEpochsNum * 1000);
    //     const endDatetime = new Date(endEpochsNum * 1000);
    //     console.log(typeof customSelection.timeRange.startTime.nanoseconds);
    //     console.log(customSelection.timeRange.startTime.nanoseconds);
    //     setDataBlocks([
    //         ...dataBlocks,
    //         {
    //             startEpochs: customSelection.timeRange.startTime.epochSeconds,
    //             startDatetime: formatDate(startDatetime),
    //             endEpochs: customSelection.timeRange.endTime.epochSeconds,
    //             endDatetime: formatDate(endDatetime),
    //             startNanos: customSelection.timeRange.startTime.nanoseconds,
    //             endNanos: customSelection.timeRange.endTime.nanoseconds,
    //             pvNames: customSelection.dataSources,
    //         },
    //     ]);
    // }, [customSelection]);

    return (
        <Fragment>
            <div className=" w-full mb-4 px-5 pt-5 pb-2 border-b">
                <h1 className="font-semibold">Create Data Set</h1>
            </div>
            {showAddBlockActions ? (
                <div className="px-5 pb-5 flex flex-col items-center">
                    <input
                        aria-label="Date and time"
                        name="start-time"
                        type="datetime-local"
                        value={startDatetime}
                        max={maxDate}
                        step="1"
                        onChange={(e) => setStartDatetime(e.target.value)}
                        onFocus={() => setStartDateErrClass("")}
                        className={cn(
                            "input-std w-full mb-2",
                            startDateErrClass
                        )}
                    />
                    <input
                        type="number"
                        name="start-nanos"
                        placeholder="Nanoseconds"
                        value={startNanos}
                        onChange={(e) => setStartNanos(e.target.value)}
                        onFocus={() => setStartNanosErrClass("")}
                        className={cn(
                            "input-std w-full mb-2",
                            startNanosErrClass
                        )}
                    />
                    <span className="mb-2 font-medium">to</span>
                    <input
                        aria-label="Date and time"
                        name="start-time"
                        type="datetime-local"
                        value={endDatetime}
                        max={maxDate}
                        step="1"
                        onChange={(e) => setEndDatetime(e.target.value)}
                        onFocus={() => setEndDateErrClass("")}
                        className={cn("input-std w-full mb-2", endDateErrClass)}
                    />
                    <input
                        type="number"
                        name="start-nanos"
                        placeholder="Nanoseconds"
                        value={endNanos}
                        onChange={(e) => setEndNanos(e.target.value)}
                        onFocus={() => setEndNanosErrClass("")}
                        className={cn(
                            "input-std w-full mb-2",
                            endNanosErrClass
                        )}
                    />
                    <div className="w-full mt-2 mb-2 border-b"></div>
                    {/* <span className="mb-2 font-medium">--</span> */}
                    {/* <input
                        placeholder="Data Sources"
                        name="pv-name"
                        value={dataSourcesString}
                        onChange={(e) => setDataSourcesString(e.target.value)}
                        onFocus={() => setDataSourcesErrClass("")}
                        className={cn("input-std w-full", dataSourcesErrClass)}
                    /> */}
                    <div className="w-full mb-2 flex flex-col items-start justify-center max-h-24 overflow-scroll">
                        {[...dataSources].map((dataSource) => (
                            <div
                                key={dataSource}
                                className="w-full px-2 flex flex-row items-center justify-between text-foreground"
                            >
                                <span className="text-sm">{dataSource}</span>
                                <MinusCircledIcon
                                    className="hover:text-foreground/70 hover:cursor-pointer"
                                    onClick={() => {
                                        let newDataset = new Set(dataSources);
                                        newDataset.delete(dataSource);
                                        setDataSources(newDataset);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <DatasetPicker
                        dataSources={dataSources}
                        setDataSources={setDataSources}
                        className="mb-2"
                    />
                    <FilterErrorMessage>{errText}</FilterErrorMessage>
                    <button
                        onClick={handleAddBlock}
                        className="btn-std w-full mb-2"
                    >
                        Add Block
                    </button>
                    <button onClick={handleCancel} className="btn-alt w-full">
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="mx-5 mb-5 flex flex-col">
                    <input
                        className={cn("input-std w-full mb-2", nameErrClass)}
                        placeholder="Data Set Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setNameErrClass("")}
                    />
                    <textarea
                        className={cn(
                            "input-std w-full max-h-40",
                            !(dataBlocks.length > 0) && "mb-2",
                            descriptionErrClass
                        )}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setDescriptionErrClass("")}
                    />
                    <Accordion
                        type="single"
                        collapsible
                        className={dataBlocks.length > 0 && "mb-2"}
                    >
                        {dataBlocks.map((block, i) => (
                            <AccordionItem value={`item-${i + 1}`} key={i}>
                                <AccordionTrigger
                                    props={{
                                        handleDeleteBlock: handleDeleteBlock,
                                        index: i,
                                    }}
                                >
                                    Block {i + 1}
                                </AccordionTrigger>
                                <AccordionContent className="mb-2 px-2 flex flex-col text-sm rounded bg-muted">
                                    <span className="text-xs font-semibold">
                                        Start Time
                                    </span>
                                    <span>{block.startDatetime}</span>
                                    <span>{block.startNanos}ns</span>
                                    <span className="mt-1 text-xs font-semibold">
                                        End Time
                                    </span>
                                    <span>{block.endDatetime}</span>
                                    <span>{block.endNanos}ns</span>
                                    <div className="mt-1">
                                        <span className="text-xs font-semibold">
                                            Data Sources
                                        </span>
                                        {block.pvNames.map((pv, j) => (
                                            <div key={j}>{pv}</div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <button
                        onClick={() => setShowAddBlockActions(true)}
                        onFocus={() => setAddDbErrClass("")}
                        className={cn(
                            "mb-4 flex flew row items-center rounded text-sm text-muted-foreground hover:text-foreground",
                            addDbErrClass
                        )}
                    >
                        <PlusIcon />
                        &nbsp; Add Data Block
                    </button>
                    <button onClick={handleAddSet} className="btn-std w-full">
                        Create Set
                    </button>
                </div>
            )}
        </Fragment>
    );
}

AddDatasetActions.propTypes = propTypes;
export default AddDatasetActions;
