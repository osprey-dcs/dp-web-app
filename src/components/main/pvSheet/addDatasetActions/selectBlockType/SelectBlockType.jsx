import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

function SelectBlockType(props) {
    function handleFromCurrentQuery() {
        const firstTimestamp =
            props.resultData.tableResult.rowMapTable.rows[0].columnValues
                .timestamp.value.timestampValue;
        const lastTimestamp =
            props.resultData.tableResult.rowMapTable.rows[
                props.resultData.tableResult.rowMapTable.rows.length - 1
            ].columnValues.timestamp.value.timestampValue;

        props.setDataBlocks([
            ...props.dataBlocks,
            {
                startEpochs: parseInt(firstTimestamp.epochSeconds),
                endEpochs: parseInt(lastTimestamp.epochSeconds),
                startNanos: firstTimestamp.nanoseconds,
                endNanos: lastTimestamp.nanoseconds,
                pvNames:
                    props.resultData.tableResult.rowMapTable.columnNames.slice(
                        1
                    ),
            },
        ]);

        props.handleChangePage(props.pages.CREATE_SET);
    }

    return (
        <>
            <ArrowLeftIcon
                onClick={() => props.handleChangePage(props.pages.CREATE_SET)}
                className="mx-2 -mt-2 mb-2 hover:cursor-pointer hover:text-foreground"
            />
            <div className="mx-5 mb-5 flex flex-col">
                <button
                    onClick={handleFromCurrentQuery}
                    className={cn(
                        "w-full mb-3",
                        Object.keys(props.resultData ?? {}).length === 0
                            ? "btn-disabled"
                            : "btn-alt"
                    )}
                >
                    From Current Query
                </button>
                <button
                    onClick={() =>
                        props.handleChangePage(props.pages.CREATE_BLOCK)
                    }
                    className="btn-alt w-full"
                >
                    From Custom Parameters
                </button>
            </div>
        </>
    );
}

export default SelectBlockType;
