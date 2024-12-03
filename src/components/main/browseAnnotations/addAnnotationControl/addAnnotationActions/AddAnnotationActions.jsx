import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import { cn } from "@/lib/utils";
import { Fragment, useMemo, useState } from "react";

function AddAnnotationActions({ setIsOpen }) {
    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    const [dataSetId, setDataSetId] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [comment, setComment] = useState("");

    const [dataSetIdErrClass, setDataSetIdErrClass] = useState("");
    const [ownerIdErrClass, setOwnerIdErrClass] = useState("");
    const [commentErrClass, setCommentErrClass] = useState("");

    function validInput(input, setInputErrClass) {
        if (input === "") {
            setInputErrClass("border-destructive");
            return false;
        }
        return true;
    }

    function showResultToast(result) {
        let toastTitle = "";
        let toastDescription = "";
        let toastVariant = "default";

        switch (typeof result) {
            case "object":
                if (result.oneofKind === "createAnnotationResult") {
                    setIsOpen(false);
                    toastTitle = "Annotation Successfully Created";
                    toastDescription = `Comment '${comment}' added to data set with id ${dataSetId}`;
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
                    "An error occured while creating the annotation";
                toastVariant = "destructive";
                break;
        }

        console.log(typeof result);

        toast({
            title: toastTitle,
            description: toastDescription,
            variant: toastVariant,
        });
    }

    async function handleSubmit() {
        if (
            !validInput(dataSetId, setDataSetIdErrClass) ||
            !validInput(ownerId, setOwnerIdErrClass) ||
            !validInput(comment, setCommentErrClass)
        ) {
            return;
        }

        const queryParams = {
            dataSetId: dataSetId,
            ownerId: ownerId,
            comment: comment,
        };
        const result = await api.createAnnotation(queryParams);
        showResultToast(result);
    }

    return (
        <Fragment>
            <div className=" w-full mb-4 px-5 pt-5 pb-2 border-b">
                <h1 className="font-semibold">Create Annotation</h1>
            </div>
            <div className="mx-5 mb-5 flex flex-col">
                <input
                    value={dataSetId}
                    placeholder="Data Set ID"
                    onChange={(e) => setDataSetId(e.target.value)}
                    onFocus={() => setDataSetIdErrClass("")}
                    className={cn("input-std mb-2", dataSetIdErrClass)}
                />
                <input
                    value={ownerId}
                    placeholder="Owner ID"
                    onChange={(e) => setOwnerId(e.target.value)}
                    onFocus={() => setOwnerIdErrClass("")}
                    className={cn("input-std mb-2", ownerIdErrClass)}
                />
                <textarea
                    value={comment}
                    placeholder="Comment"
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={() => setCommentErrClass("")}
                    className={cn("input-std mb-4", commentErrClass)}
                />
                <button onClick={handleSubmit} className="btn-std w-full">
                    Create Annotation
                </button>
            </div>
        </Fragment>
    );
}

export default AddAnnotationActions;
