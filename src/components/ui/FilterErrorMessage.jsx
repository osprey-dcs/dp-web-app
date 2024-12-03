import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const errMsgVariants = cva("mt-2 mb-2 text-sm font-medium text-destructive");

function FilterErrorMessage({ children, className, ...props }) {
    return (
        <div
            className={
                children !== "" ? cn(errMsgVariants(), className) : undefined
            }
            {...props}
        >
            {children}
        </div>
    );
}

export { FilterErrorMessage };
