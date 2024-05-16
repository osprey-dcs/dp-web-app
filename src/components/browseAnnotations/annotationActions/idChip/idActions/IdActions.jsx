import { cn } from "@/lib/utils";
import { useState } from "react";

function IdActions({
    ownerId,
    setOwnerId,
    setIsOpen,
    queryParams,
    setQueryParams,
}) {
    const [errClass, setErrClass] = useState();

    function handleApply() {
        if (ownerId === "") {
            setErrClass("border-destructive");
            return;
        }
        setQueryParams({
            ...queryParams,
            ownerId: ownerId,
        });
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <input
                placeholder="Owner Id"
                value={ownerId}
                onFocus={() => setErrClass("")}
                onChange={(e) => setOwnerId(e.target.value)}
                className={cn("input-std w-full mb-2", errClass)}
            />
            <button onClick={handleApply} className="btn-std w-full">
                Apply
            </button>
        </div>
    );
}

export default IdActions;
