import { cn } from "@/lib/utils";
import { AddFilled, CloseFilled } from "@carbon/icons-react";
import {
    FloatingFocusManager,
    offset,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStyles,
} from "@floating-ui/react";
import { Fragment, memo, useState } from "react";
import IdActions from "./idActions/IdActions";

const IdChip = memo(function IdChip({ queryParams, setQueryParams }) {
    const [ownerId, setOwnerId] = useState("");

    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        middleware: [offset(4)],
    });
    const { isMounted, styles: transitionStyles } =
        useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    function handleClear() {
        setQueryParams({
            ...queryParams,
            ownerId: "",
        });
        setOwnerId("");
    }

    return (
        <Fragment>
            <div
                ref={refs.setPositionReference}
                className={cn(
                    "mr-4 chip-input",
                    ownerId === "" && "border-dashed"
                )}
            >
                <button className="text-muted-foreground hover:text-muted-foreground/80">
                    {isOpen || ownerId !== "" ? (
                        <CloseFilled onClick={handleClear} />
                    ) : (
                        <AddFilled onClick={() => setIsOpen(true)} />
                    )}
                </button>
                <button
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    className="pl-1 max-w-xs sm:max-w-none text-sm text-muted-foreground font-medium"
                >
                    {ownerId === "" ? (
                        "Owner ID"
                    ) : (
                        <Fragment>
                            <span className=" mr-1 pr-1 border-r border-muted-foreground text-nowrap">
                                Owner ID
                            </span>
                            <span className="text-foreground text-nowrap">
                                {ownerId}
                            </span>
                        </Fragment>
                    )}
                </button>
            </div>
            {isMounted && (
                <FloatingFocusManager context={context} modal={true}>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <div
                            style={transitionStyles}
                            className="p-5 w-64 border rounded bg-background shadow-md"
                        >
                            <IdActions
                                ownerId={ownerId}
                                setOwnerId={setOwnerId}
                                setIsOpen={setIsOpen}
                                queryParams={queryParams}
                                setQueryParams={setQueryParams}
                            />
                        </div>
                    </div>
                </FloatingFocusManager>
            )}
        </Fragment>
    );
});

export default IdChip;
