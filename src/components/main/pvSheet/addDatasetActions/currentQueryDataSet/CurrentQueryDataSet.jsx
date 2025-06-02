import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

function CurrentQueryDataSet(props) {
    function handleSubmit() {
        const firstTimestamp =
            props.resultData.tableResult.rowMapTable.rows[0].columnValues
                .timestamp.value.timestampValue;
        const lastTimestamp =
            props.resultData.tableResult.rowMapTable.rows[
                props.resultData.tableResult.rowMapTable.rows.length - 1
            ].columnValues.timestamp.value.timestampValue;

        props.setDataBlocks([
            {
                startEpochs: firstTimestamp.epochSeconds,
                endEpochs: lastTimestamp.epochSeconds,
                startNanos: firstTimestamp.nanoseconds,
                endNanos: lastTimestamp.nanoseconds,
                pvNames:
                    props.resultData.tableResult.rowMapTable.columnNames.slice(
                        1
                    ),
            },
        ]);

        props.handleAddSet();
    }

    return (
        <>
            <ArrowLeftIcon
                onClick={() =>
                    props.handleChangePage(props.pages.SELECT_SET_TYPE)
                }
                className="mx-2 -mt-2 mb-2 hover:cursor-pointer hover:text-foreground"
            />
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
                        "input-std w-full max-h-40 mb-3",
                        props.descriptionErrClass
                    )}
                    placeholder="Description"
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                    onFocus={() => props.setDescriptionErrClass("")}
                />
                <button onClick={handleSubmit} className="btn-std w-full">
                    Create Set
                </button>
            </div>
        </>
    );
}

export default CurrentQueryDataSet;
