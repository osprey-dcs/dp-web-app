import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { FloatingFocusManager, autoUpdate, flip, shift, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import AddDatasetActions from "./addDatasetActions/AddDatasetActions";

const propTypes = {
    resultData: PropTypes.object
}

function AddDatasetControl(props) {
    const [isOpen, setIsOpen] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "left-end",
        middleware: [offset(6), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    return (
        (props.resultData !== undefined && Object.keys(props.resultData).length !== 0) && (
            <Fragment>
                <button ref={refs.setReference} {...getReferenceProps()} className="fixed bottom-10 right-[6.15%] w-14 h-14 flex justify-center items-center rounded-full z-20 bg-primary hover:bg-primary/90 shadow-md">
                    {
                        isOpen ?
                            <Cross1Icon className="w-5 h-5 text-primary-foreground" /> :
                            <PlusIcon className="w-6 h-6 text-primary-foreground" />
                    }
                </button>
                {
                    isMounted && (
                        <FloatingFocusManager context={context} modal={true}>
                            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                                <div style={transitionStyles} className="w-64 border rounded bg-background shadow-md">
                                    <AddDatasetActions setIsOpen={setIsOpen} />
                                </div>
                            </div>
                        </FloatingFocusManager>
                    )
                }
            </Fragment>
        )
    )
}

AddDatasetControl.propTypes = propTypes;
export default AddDatasetControl;