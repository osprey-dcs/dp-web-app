import NavLink from "@/components/main/header/navlink/NavLink";
import { cn } from "@/lib/utils";
import {
    FloatingFocusManager,
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
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import { useRoute } from "wouter";

function BrowseMenu() {
    const [isMetadataActive] = useRoute("metadata");
    const [isRawDataActive] = useRoute("/");
    const [isAnnotationsActive] = useRoute("annotations");

    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        middleware: [
            offset({ mainAxis: 4, crossAxis: -1 }),
            flip(),
            shift(),
            size(),
        ],
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

    return (
        <Fragment>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={cn(
                    "flex justify-center items-center hover:text-foreground",
                    isMetadataActive || isRawDataActive || isAnnotationsActive
                        ? "text-foreground"
                        : "text-muted-foreground"
                )}
            >
                Browse &nbsp;
                <ChevronDownIcon
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 translate-y-px"
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
                            className="py-3 px-3 flex flex-col items-start border rounded bg-background shadow-md"
                        >
                            <NavLink
                                href="metadata"
                                onClick={() => setIsOpen(false)}
                                className="mb-1"
                            >
                                Metadata
                            </NavLink>
                            <NavLink
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="mb-1"
                            >
                                Raw Data
                            </NavLink>
                            <NavLink
                                href="annotations"
                                onClick={() => setIsOpen(false)}
                            >
                                Annotations
                            </NavLink>
                        </div>
                    </div>
                </FloatingFocusManager>
            )}
        </Fragment>
    );
}

export default BrowseMenu;
