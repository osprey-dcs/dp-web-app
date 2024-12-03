import { cn } from "@/lib/utils";
import { useState } from "react";

function CommentActions({
    comment,
    setComment,
    setIsOpen,
    queryParams,
    setQueryParams,
}) {
    const [errClass, setErrClass] = useState("");

    function handleApply() {
        if (comment === "") {
            setErrClass("border-destructive");
            return;
        }
        setQueryParams({
            ...queryParams,
            comment: comment,
        });
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <textarea
                placeholder="Comment"
                value={comment}
                onFocus={() => setErrClass("")}
                onChange={(e) => setComment(e.target.value)}
                className={cn("input-std w-full mb-2", errClass)}
            />
            <button onClick={handleApply} className="btn-std w-full">
                Apply
            </button>
        </div>
    );
}

export default CommentActions;
