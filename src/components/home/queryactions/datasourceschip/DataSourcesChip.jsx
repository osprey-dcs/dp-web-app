import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { AddFilled, CloseFilled } from "@carbon/icons-react";

function DataSourcesChip() {
    const [dataSources, setDataSources] = useState([]);

    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start',
        middleware: [offset(4)]
    });
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    return (
        <Fragment>
            <div ref={refs.setPositionReference} className={"mr-4 px-2 max-w-sm overflow-hidden sm:max-w-none flex items-center border border-sub-text rounded-full hover:cursor-pointer" + (dataSources.length > 0 ? '' : ' border-dashed')}>
                <button className="text-sub-text">
                    {
                        isOpen || dataSources > 0 ?
                            <CloseFilled /> :
                            <AddFilled onClick={() => setIsOpen(true)} />
                    }
                </button>
                <button ref={refs.setReference} {...getReferenceProps()} className="pl-1 text-sm text-sub-text font-medium">
                    {
                        dataSources > 0 ?
                            <Fragment>
                                <span className=" mr-1 pr-1 border-r border-sub-text text-nowrap">Data Sources</span>
                                <span className="text-main-text text-nowrap">{dataSources.length} Items</span>
                            </Fragment> :
                            "Data Sources"
                    }
                </button>
            </div>
        </Fragment>
    )
}

export default DataSourcesChip;