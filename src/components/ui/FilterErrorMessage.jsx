import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const errMsgVariants = cva(
    "mt-2 mb-2 text-sm font-medium text-destructive"
)

function FilterErrorMessage({ children, className, ...props }) {
    return (
        <div className={children !== "" ? cn(errMsgVariants(), className) : "mb-4"} {...props}>{children}</div>
    )
}

export { FilterErrorMessage }