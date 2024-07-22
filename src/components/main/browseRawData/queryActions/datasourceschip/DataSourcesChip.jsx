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
import PropTypes from "prop-types";
import { Fragment, memo, useState } from "react";
import DataSourcesActions from "./datasourcesactions/DataSourcesActions";

const propTypes = {
    dataSources: PropTypes.object,
    setDataSources: PropTypes.func,
};

const DataSourcesChip = memo(function DataSourcesChip(props) {
    const [dataSourcesString, setDataSourcesString] = useState("");
    const [dataSourcesRegex, setDataSourcesRegex] = useState("");
    const [useRegex, setUseRegex] = useState(false);

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
        props.setDataSources({});
        setDataSourcesString("");
        setDataSourcesRegex("");
    }

    return (
        <Fragment>
            <div
                ref={refs.setPositionReference}
                className={cn(
                    "mr-4 chip-input",
                    dataSourcesString === "" &&
                        dataSourcesRegex === "" &&
                        "border-dashed"
                )}
            >
                <button className="text-muted-foreground hover:text-muted-foreground/80">
                    {isOpen ||
                    dataSourcesString !== "" ||
                    dataSourcesRegex !== "" ? (
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
                    {dataSourcesString !== "" || dataSourcesRegex !== "" ? (
                        <Fragment>
                            <span className=" mr-1 pr-1 border-r border-muted-foreground text-nowrap">
                                Data Sources
                            </span>
                            {useRegex ? (
                                <span className="text-foreground text-nowrap">
                                    Pattern: {dataSourcesRegex}
                                </span>
                            ) : (
                                <span className="text-foreground text-nowrap">
                                    {props.dataSources.pvNames?.length >= 4
                                        ? props.dataSources.pvNames.length +
                                          " Items"
                                        : dataSourcesString}
                                </span>
                            )}
                        </Fragment>
                    ) : (
                        "Data Sources"
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
                            <DataSourcesActions
                                setDataSources={props.setDataSources}
                                dataSourcesString={dataSourcesString}
                                setDataSourcesString={setDataSourcesString}
                                dataSourcesRegex={dataSourcesRegex}
                                setDataSourcesRegex={setDataSourcesRegex}
                                useRegex={useRegex}
                                setUseRegex={setUseRegex}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>
                </FloatingFocusManager>
            )}
        </Fragment>
    );
});

DataSourcesChip.propTypes = propTypes;
export default DataSourcesChip;
