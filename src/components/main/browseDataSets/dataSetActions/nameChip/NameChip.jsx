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
import NameActions from "./nameActions/NameActions";

const NameChip = memo(function NameChip({ queryParams, setQueryParams }) {
    const [dataSetName, setDataSetName] = useState("");

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
        setQueryParams((prevQueryParams) => ({
            ...prevQueryParams,
            dataSetName: "",
        }));
        setDataSetName("");
    }

    return (
        <Fragment>
            <div
                ref={refs.setPositionReference}
                className={cn(
                    "mr-4 chip-input",
                    dataSetName === "" && "border-dashed"
                )}
            >
                <button className="text-muted-foreground hover:text-muted-foreground/80">
                    {isOpen || dataSetName !== "" ? (
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
                    {dataSetName === "" ? (
                        "Name"
                    ) : (
                        <Fragment>
                            <span className="mr-1 pr-1 border-r border-muted-foreground text-nowrap">
                                Name
                            </span>
                            <span className="text-foreground text-nowrap">
                                {dataSetName}
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
                            <NameActions
                                dataSetName={dataSetName}
                                setDataSetName={setDataSetName}
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

export default NameChip;
