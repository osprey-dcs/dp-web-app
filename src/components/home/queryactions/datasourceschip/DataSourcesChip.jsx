import PropTypes from "prop-types";
import DataSourcesActions from "./datasourcesactions/DataSourcesActions";
import { Fragment, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { AddFilled, CloseFilled } from "@carbon/icons-react";

const propTypes = {
    dataSources: PropTypes.array,
    setDataSources: PropTypes.func
}

function DataSourcesChip(props) {
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

    function handleClear() {
        setDataSources([]);
        props.setDataSources([]);
    }

    function handleApply(dataSourcesString) {
        setDataSources(dataSourcesString.split(", "))
        props.setDataSources(dataSourcesString.split(", "));

        setIsOpen(false);
    }

    return (
        <Fragment>
            <div ref={refs.setPositionReference} className={"mr-4 px-2 max-w-sm overflow-hidden sm:max-w-none flex items-center border border-muted-foreground rounded-full hover:cursor-pointer" + (dataSources.length > 0 ? '' : ' border-dashed')}>
                <button className="text-muted-foreground">
                    {
                        isOpen || dataSources.length > 0 ?
                            <CloseFilled onClick={handleClear} /> :
                            <AddFilled onClick={() => setIsOpen(true)} />
                    }
                </button>
                <button ref={refs.setReference} {...getReferenceProps()} className="pl-1 text-sm text-muted-foreground font-medium">
                    {
                        dataSources.length > 0 ?
                            <Fragment>
                                <span className=" mr-1 pr-1 border-r border-muted-foreground text-nowrap">Data Sources</span>
                                <span className="text-foreground text-nowrap">{dataSources.length} Items</span>
                            </Fragment> :
                            "Data Sources"
                    }
                </button>
            </div>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={true}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-5 border rounded bg-white shadow-md">
                                <DataSourcesActions handleApply={handleApply} />
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </Fragment>
    )
}

DataSourcesChip.propTypes = propTypes;
export default DataSourcesChip;