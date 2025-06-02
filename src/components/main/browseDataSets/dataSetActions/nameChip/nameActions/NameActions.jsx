import { cn } from "@/lib/utils";
import { useState } from "react";

function NameActions({
    dataSetName,
    setDataSetName,
    setIsOpen,
    queryParams,
    setQueryParams,
}) {
    const [errClass, setErrClass] = useState();

    function handleApply() {
        if (dataSetName === "") {
            setErrClass("border-destructive");
            return;
        }
        setQueryParams({
            ...queryParams,
            dataSetName: dataSetName,
        });
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <input
                placeholder="Data Set Name"
                value={dataSetName}
                onFocus={() => setErrClass("")}
                onChange={(e) => setDataSetName(e.target.value)}
                className={cn("input-std w-full mb-2", errClass)}
            />
            <button className="btn-std w-full" onClick={handleApply}>
                Apply
            </button>
        </div>
    );
}

export default NameActions;
