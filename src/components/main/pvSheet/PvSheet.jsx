import { usePVs, usePVsDispatch } from "@/components/main/PVsContext";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
    ChevronLeftIcon,
    MinusCircledIcon,
    PlusIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useResultData } from "../ResultDataContext";
import AddDatasetActions from "./addDatasetActions/AddDatasetActions";

function PvSheet() {
    const [newPV, setNewPV] = useState("");
    const [newPVErrClass, setNewPVErrClass] = useState("");
    const dispatch = usePVsDispatch();
    const pvs = usePVs();
    const resultData = useResultData();
    const [showDataSetActions, setShowDataSetActions] = useState(false);
    const [dataBlocks, setDataBlocks] = useState([]);
    const [dataSetName, setDataSetName] = useState("");
    const [dataSetDescription, setDataSetDescription] = useState("");

    function onAddPV() {
        if (newPV === "") {
            setNewPVErrClass("border-destructive");
        } else {
            dispatch({
                type: "added",
                pvName: newPV,
            });
            setNewPV("");
            setNewPVErrClass("");
        }
    }

    return (
        <Sheet>
            <SheetTrigger className="fixed top-1/4 right-0 bg-primary hover:bg-primary/90 rounded-l shadow-sm">
                <ChevronLeftIcon className="w-5 h-10 text-primary-foreground" />
            </SheetTrigger>
            <SheetContent className="bg-background">
                <SheetHeader>
                    <SheetTitle>PV List</SheetTitle>
                    <SheetDescription>
                        Add or remove PVs from your running list.
                    </SheetDescription>
                </SheetHeader>
                <div className="w-full mt-4 mb-4 flex flex-col items-start justify-center text-sm">
                    {pvs.size === 0 ? (
                        <span>No PVs to show.</span>
                    ) : (
                        <div className="w-full max-h-72 overflow-scroll p-2 flex flex-col items-start justify-center gap-1 rounded border">
                            {[...pvs].map((pv) => (
                                <div
                                    key={pv}
                                    className="w-full flex flex-row items-center text-foreground"
                                >
                                    <button
                                        className="hover:text-foreground/70"
                                        onClick={() =>
                                            dispatch({
                                                type: "removed",
                                                pvName: pv,
                                            })
                                        }
                                    >
                                        <MinusCircledIcon />
                                    </button>
                                    &nbsp;
                                    {pv}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-row">
                    <input
                        value={newPV}
                        onChange={(e) => setNewPV(e.target.value)}
                        placeholder="PV Name"
                        className={cn(newPVErrClass, "input-std")}
                    />
                    &nbsp;
                    <button onClick={() => onAddPV()}>
                        <PlusIcon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </button>
                </div>
                <div className="w-full mt-4 border-b" />
                <div className="w-64 bg-background">
                    {showDataSetActions ? (
                        <AddDatasetActions
                            setIsOpen={null}
                            resultData={resultData}
                            dataBlocks={dataBlocks}
                            setDataBlocks={setDataBlocks}
                            name={dataSetName}
                            setName={setDataSetName}
                            description={dataSetDescription}
                            setDescription={setDataSetDescription}
                            setShowDataSetActions={setShowDataSetActions}
                        />
                    ) : (
                        <button
                            className="btn-std w-3/4 mt-4"
                            onClick={() => setShowDataSetActions(true)}
                        >
                            Create Data Set
                        </button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default PvSheet;
