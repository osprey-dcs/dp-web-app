import PropTypes from "prop-types";
import DataSourcesActions from "./datasourcesactions/DataSourcesActions";

import { Fragment, memo, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { AddFilled, CloseFilled } from "@carbon/icons-react";

const propTypes = {
    dataSources: PropTypes.object,
    setDataSources: PropTypes.func,
}

const DataSourcesChip = memo(function DataSourcesChip(props) {
    const [dataSourcesString, setDataSourcesString] = useState("");
    const [dataSourcesRegex, setDataSourcesRegex] = useState("");
    const [dataSourcesPopulated, setDataSourcesPopulated] = useState(Object.keys(props.dataSources).length !== 0);
    const [useRegex, setUseRegex] = useState(false);

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
        props.setDataSources({});
        setDataSourcesPopulated(false);
        setDataSourcesString("");
        setDataSourcesRegex("");
    }

    return (
        <Fragment>
            <div ref={refs.setPositionReference} className={"mr-4 px-2 max-w-sm overflow-hidden sm:max-w-none flex items-center border border-muted-foreground rounded-full hover:cursor-pointer" + (dataSourcesString !== "" || dataSourcesRegex !== "" ? '' : ' border-dashed')}>
                <button className="text-muted-foreground">
                    {
                        isOpen || dataSourcesString !== "" || dataSourcesRegex !== "" ?
                            <CloseFilled onClick={handleClear} /> :
                            <AddFilled onClick={() => setIsOpen(true)} />
                    }
                </button>
                <button ref={refs.setReference} {...getReferenceProps()} className="pl-1 text-sm text-muted-foreground font-medium">
                    {
                        dataSourcesString !== "" || dataSourcesRegex !== "" ?
                            <Fragment>
                                <span className=" mr-1 pr-1 border-r border-muted-foreground text-nowrap">Data Sources</span>
                                {
                                    useRegex ?
                                        <span className="text-foreground text-nowrap">Pattern: {dataSourcesRegex}</span> :
                                        <span className="text-foreground text-nowrap">{props.dataSources.pvNames?.length >= 4 ? props.dataSources.pvNames.length + " Items" : dataSourcesString}</span>
                                }
                            </Fragment> :
                            "Data Sources"
                    }
                </button>
            </div>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={true}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-5 w-64 border rounded bg-background shadow-md">
                                <DataSourcesActions
                                    setDataSources={props.setDataSources} setDataSourcesPopulated={setDataSourcesPopulated}
                                    dataSourcesString={dataSourcesString} setDataSourcesString={setDataSourcesString}
                                    dataSourcesRegex={dataSourcesRegex} setDataSourcesRegex={setDataSourcesRegex}
                                    useRegex={useRegex} setUseRegex={setUseRegex}
                                    setIsOpen={setIsOpen} />
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </Fragment>
    )
});

DataSourcesChip.propTypes = propTypes;
export default DataSourcesChip;