import PropTypes from "prop-types";
import { Fragment, useMemo, useState } from "react";
import { formatDate } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons";
import { cn, validateDate, validateNanos } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FilterErrorMessage } from "@/components/ui/FilterErrorMessage";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";

const propTypes = {
    setIsOpen: PropTypes.func,
}

function AddDatasetActions(props) {
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();
    const maxDate = formatDate(new Date());
    const [showAddBlockActions, setShowAddBlockActions] = useState(false);
    const [dataBlocks, setDataBlocks] = useState([]);
    const [errText, setErrText] = useState("");

    const [description, setDescription] = useState("");
    const [startDatetime, setStartDatetime] = useState("");
    const [startNanos, setStartNanos] = useState("");
    const [endDatetime, setEndDatetime] = useState("")
    const [endNanos, setEndNanos] = useState("")
    const [dataSourcesString, setDataSourcesString] = useState("");

    const [startDateErrClass, setStartDateErrClass] = useState("");
    const [startNanosErrClass, setStartNanosErrClass] = useState("");
    const [endDateErrClass, setEndDateErrClass] = useState("");
    const [endNanosErrClass, setEndNanosErrClass] = useState("");
    const [dataSourcesErrClass, setDataSourcesErrClass] = useState("")

    function handleAddBlock() {
        const validDate = validateDate(startDatetime, endDatetime, startNanos, endNanos, setStartDateErrClass, setEndDateErrClass, setStartNanosErrClass, setEndNanosErrClass);
        const validNanos = validateNanos(startNanos, endNanos, setStartNanosErrClass, setEndNanosErrClass);

        if (!(validDate && validNanos) || dataSourcesString === "") {
            console.log("err")
            dataSourcesString === "" && setDataSourcesErrClass("border-destructive");
            setErrText("Error in Highlighted Fields");
            return;
        }

        setErrText("");

        const ptToGMT = 25200

        const startEpochs = Math.floor(new Date(startDatetime).getTime() / 1000) - ptToGMT;
        const endEpochs = Math.floor(new Date(endDatetime).getTime() / 1000) - ptToGMT;

        setDataBlocks([
            ...dataBlocks,
            {
                startEpochs: startEpochs,
                endEpochs: endEpochs,
                startNanos: Number(startNanos),
                endNanos: Number(endNanos),
                pvNames: dataSourcesString.split(", ")
            }
        ])
        handleCancel();
    }

    function handleCancel() {
        setShowAddBlockActions(false)
        setStartDatetime("");
        setStartNanos("");
        setEndDatetime("");
        setEndNanos("");
        setDataSourcesString("");
    }

    async function handleAddSet() {
        const queryParams = {
            description: description,
            dataBlocks: dataBlocks
        }
        const result = await api.createDataSet(queryParams);

        if (result.oneofKind === "createDataSetResult") {
            props.setIsOpen(false)
            toast({
                title: "Data Set Successfully Created",
                description: "Add an annotation?",
                action: <ToastAction onClick={() => console.log("annotated")} altText="Annotate">Annotate</ToastAction>,
            })
        }
    }

    return (
        <Fragment>
            <div className=" w-full mb-4 px-5 pt-5 pb-2 border-b">
                <h1 className="font-semibold">Create Data Set</h1>
            </div>
            {
                showAddBlockActions ? (
                    <div className="px-5 pb-5 flex flex-col items-center">
                        <input
                            aria-label="Date and time" name="start-time" type="datetime-local"
                            value={startDatetime}
                            max={maxDate} step="1"
                            onChange={e => setStartDatetime(e.target.value)}
                            onFocus={() => setStartDateErrClass("")}
                            className={cn("input-std mb-2", startDateErrClass)}
                        />
                        <input
                            type="number" name="start-nanos" placeholder="Nanoseconds"
                            value={startNanos}
                            onChange={e => setStartNanos(e.target.value)}
                            onFocus={() => setStartNanosErrClass("")}
                            className={cn("input-std w-full mb-2", startNanosErrClass)}
                        />
                        <span className="mb-2 font-medium">to</span>
                        <input
                            aria-label="Date and time" name="start-time" type="datetime-local"
                            value={endDatetime}
                            max={maxDate} step="1"
                            onChange={e => setEndDatetime(e.target.value)}
                            onFocus={() => setEndDateErrClass("")}
                            className={cn("input-std mb-2", endDateErrClass)}
                        />
                        <input
                            type="number" name="start-nanos" placeholder="Nanoseconds"
                            value={endNanos}
                            onChange={e => setEndNanos(e.target.value)}
                            onFocus={() => setEndNanosErrClass("")}
                            className={cn("input-std w-full mb-2", endNanosErrClass)}
                        />
                        <span className="mb-2 font-medium">--</span>
                        <input
                            placeholder="Data Sources" name="pv-name" value={dataSourcesString}
                            onChange={e => setDataSourcesString(e.target.value)}
                            onFocus={() => setDataSourcesErrClass("")}
                            className={cn("input-std w-full", dataSourcesErrClass)}
                        ></input>
                        <FilterErrorMessage>{errText}</FilterErrorMessage>
                        <button
                            onClick={handleAddBlock}
                            className="btn-std w-full mb-2"
                        >
                            Add Block
                        </button>
                        <button
                            onClick={handleCancel}
                            className="btn-alt w-full"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="mx-5 mb-5 flex flex-col">
                        <textarea className={cn("input-std w-full max-h-40", !(dataBlocks.length > 0) && "mb-2")} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                        <Accordion type="single" collapsible className={dataBlocks.length > 0 && "mb-2"}>
                            {
                                dataBlocks.map((block, i) => (
                                    <AccordionItem value={`item-${i + 1}`}>
                                        <AccordionTrigger>Block {i + 1}</AccordionTrigger>
                                        <AccordionContent>
                                            {block.pvNames.map((pv, j) => (
                                                <div key={j}>{pv}</div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                        <button
                            onClick={() => setShowAddBlockActions(true)}
                            className="mb-4 flex flew row items-center rounded text-sm text-muted-foreground hover:text-foreground"
                        >
                            <PlusIcon />&nbsp;
                            Add Data Block
                        </button>
                        <button onClick={handleAddSet} className="btn-std w-full">
                            Create Set
                        </button>
                    </div>
                )
            }
        </Fragment>
    )
}

AddDatasetActions.propTypes = propTypes;
export default AddDatasetActions;