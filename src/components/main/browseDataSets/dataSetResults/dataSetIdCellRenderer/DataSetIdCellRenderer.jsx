import { useGlobalState } from "@/components/main/GlobalState.jsx";
import { Link } from "wouter";

function DataSetIdCellRenderer(params) {
    const { setRowData } = useGlobalState();

    function handleClick() {
        setRowData(params.data);
    }

    return (
        <Link
            href={`/view/data-set/${params.data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={"text-foreground hover:text-muted-foreground"}
        >
            {params.cellType === "ID" && <span>{params.value}</span>}
            {params.cellType === "dataBlocks" && (
                <span>{params.value.length}</span>
            )}
        </Link>
    );
}

export default DataSetIdCellRenderer;
