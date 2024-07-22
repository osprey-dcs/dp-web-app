import { cn } from "@/lib/utils";
import {
    FloatingFocusManager,
    autoUpdate,
    flip,
    offset,
    shift,
    size,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStyles,
} from "@floating-ui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import AddAnnotationActions from "./addAnnotationActions/AddAnnotationActions";

function AddAnnotationControl() {
    const [isOpen, setIsOpen] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "left-end",
        middleware: [offset(6), flip(), shift(), size()],
        whileElementsMounted: autoUpdate,
    });
    const { isMounted, styles: transitionStyles } =
        useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context, {
        outsidePress: false,
    });
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    return (
        <Fragment>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="fixed bottom-10 right-[6.15%] w-14 h-14 flex justify-center items-center rounded-full z-20 bg-primary hover:bg-primary/90 shadow-md"
            >
                <PlusIcon
                    className={cn(
                        "w-7 h-7 text-primary-foreground transition-transform duration-200",
                        isOpen && "rotate-45"
                    )}
                />
            </button>
            {isMounted && (
                <FloatingFocusManager context={context} modal={true}>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <div
                            style={transitionStyles}
                            className="w-64 border rounded bg-background shadow-md"
                        >
                            <AddAnnotationActions setIsOpen={setIsOpen} />
                        </div>
                    </div>
                </FloatingFocusManager>
            )}
        </Fragment>
    );
}

export default AddAnnotationControl;
