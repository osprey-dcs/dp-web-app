import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";

function CreateDataSet(props) {
    function handleDeleteBlock(index) {
        console.log("delete block " + index);
        props.setDataBlocks(props.dataBlocks.filter((db, i) => i !== index));
    }

    return (
        <>
            <div className="mx-5 mb-5 flex flex-col">
                <input
                    className={cn("input-std w-full mb-3", props.nameErrClass)}
                    placeholder="Data Set Name"
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                    onFocus={() => props.setNameErrClass("")}
                />
                <textarea
                    className={cn(
                        "input-std w-full max-h-40",
                        !(props.dataBlocks.length > 0) && "mb-3",
                        props.descriptionErrClass
                    )}
                    placeholder="Description"
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                    onFocus={() => props.setDescriptionErrClass("")}
                />
                <Accordion
                    type="single"
                    collapsible
                    className={props.dataBlocks.length > 0 && "mb-2"}
                >
                    {props.dataBlocks.map((block, i) => (
                        <AccordionItem value={`item-${i + 1}`} key={i}>
                            <AccordionTrigger
                                props={{
                                    handleDeleteBlock: handleDeleteBlock,
                                    index: i,
                                }}
                            >
                                Block {i + 1}
                            </AccordionTrigger>
                            <AccordionContent className="mb-2 px-2 flex flex-col max-h-48 overflow-scroll text-sm rounded bg-muted">
                                <span className="text-xs font-semibold">
                                    Start Time
                                </span>
                                <span>
                                    {new Date(
                                        block.startEpochs * 1000
                                    ).toLocaleString("en-US")}
                                </span>
                                <span>{block.startNanos.toString()}ns</span>
                                <span className="mt-1 text-xs font-semibold">
                                    End Time
                                </span>
                                <span>
                                    {new Date(
                                        block.endEpochs * 1000
                                    ).toLocaleString("en-US")}
                                </span>
                                <span>{block.endNanos.toString()}ns</span>
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
                    onClick={() =>
                        props.setCurrentPage(props.pages.SELECT_BLOCK_TYPE)
                    }
                    onFocus={() => props.setAddDbErrClass("")}
                    className={cn(
                        "mb-4 flex flew row items-center rounded text-sm text-muted-foreground hover:text-foreground",
                        props.addDbErrClass
                    )}
                >
                    <PlusIcon />
                    &nbsp; Add Data Block
                </button>
                <button
                    onClick={props.handleAddSet}
                    className="btn-std w-full mb-2"
                >
                    Create Set
                </button>
                <button
                    onClick={() => props.setShowDataSetActions(false)}
                    className="btn-alt w-full"
                >
                    Cancel
                </button>
            </div>
        </>
    );
}

export default CreateDataSet;
