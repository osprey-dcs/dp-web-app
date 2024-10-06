import { Combobox } from "@/components/ui/combobox";
import { FilterErrorMessage } from "@/components/ui/FilterErrorMessage";
import {
    cn,
    formatDate,
    validateDate,
    validateDateRange,
    validateNanosRange,
} from "@/lib/utils";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";

const propTypes = {
    rangeType: PropTypes.string,
    setRangeType: PropTypes.func,
    setTimeRange: PropTypes.func,
    startDatetime: PropTypes.string,
    setStartDatetime: PropTypes.func,
    endDatetime: PropTypes.string,
    setEndDatetime: PropTypes.func,
    startNanos: PropTypes.string,
    setStartNanos: PropTypes.func,
    endNanos: PropTypes.string,
    setEndNanos: PropTypes.func,
    timeUnits: PropTypes.string,
    setTimeUnits: PropTypes.func,
    timeUnitsType: PropTypes.string,
    setTimeUnitsType: PropTypes.func,
    setIsOpen: PropTypes.func,
};

const rangeTypeOptions = [
    {
        value: "absolute",
        label: "Absolute",
    },
    {
        value: "relativeStart",
        label: "Relative from Start",
    },
    {
        value: "relativeEnd",
        label: "Relative from End",
    },
];

const timeUnitsTypeOptions = [
    {
        value: "hours",
        label: "Hours",
    },
    {
        value: "minutes",
        label: "Minutes",
    },
    {
        value: "seconds",
        label: "Seconds",
    },
    {
        value: "nanoseconds",
        label: "Nanoseconds",
    },
];

const epochsOffset = {
    hours: 3600,
    minutes: 60,
    seconds: 1,
    nanoseconds: 0,
};

function TimeRangeActions(props) {
    const [startDateErrClass, setStartDateErrClass] = useState("");
    const [endDateErrClass, setEndDateErrClass] = useState("");
    const [startNanosErrClass, setStartNanosErrClass] = useState("");
    const [endNanosErrClass, setEndNanosErrClass] = useState("");
    const [timeUnitsErrClass, setTimeUnitsErrClass] = useState("");
    const [timeUnitsTypeErrClass, setTimeUnitsTypeErrClass] = useState("");

    const [errText, setErrText] = useState("");
    const maxDate = formatDate(new Date());

    function handleApply() {
        if (props.rangeType === "absolute") {
            const validDateRange = validateDateRange(
                props.startDatetime,
                props.endDatetime,
                props.startNanos,
                props.endNanos,
                setStartDateErrClass,
                setEndDateErrClass,
                setStartNanosErrClass,
                setEndNanosErrClass
            );
            const validNanos = validateNanosRange(
                props.startNanos,
                props.endNanos,
                setStartNanosErrClass,
                setEndNanosErrClass
            );

            if (!(validDateRange && validNanos)) {
                setErrText("Error in Highlighted Fields");
                return;
            }

            setErrText("");

            const ptToGMT = 25200;
            const startEpochs =
                Math.floor(new Date(props.startDatetime).getTime() / 1000) -
                ptToGMT;
            const endEpochs =
                Math.floor(new Date(props.endDatetime).getTime() / 1000) -
                ptToGMT;

            props.setTimeRange({
                startEpochs: startEpochs,
                endEpochs: endEpochs,
                startNanos: Number(props.startNanos),
                endNanos: Number(props.endNanos),
            });
        }

        let validDate = true;
        let validUnits = true;
        let validUnitsType = true;

        if (props.rangeType === "relativeStart") {
            if (
                !validateDate(
                    props.startDatetime,
                    props.startNanos,
                    setStartDateErrClass,
                    setStartNanosErrClass
                )
            ) {
                setErrText("Error in Highlighted Fields");
                validDate = false;
            }
            if (props.timeUnits === "") {
                setTimeUnitsErrClass("border-red-500");
                setErrText("Error in Highlighted Fields");
                validUnits = false;
            }
            if (props.timeUnitsType === "") {
                setTimeUnitsTypeErrClass("border-red-500");
                setErrText("Error in Highlighted Fields");
                validUnitsType = false;
            }

            if (!(validDate && validUnits && validUnitsType)) {
                return;
            }

            setStartDateErrClass("");
            setStartNanosErrClass("");
            setTimeUnitsErrClass("");
            setTimeUnitsTypeErrClass("");
            setErrText("");

            const ptToGMT = 25200;
            const startEpochs =
                Math.floor(new Date(props.startDatetime).getTime() / 1000) -
                ptToGMT;
            const endEpochs =
                startEpochs +
                props.timeUnits * epochsOffset[props.timeUnitsType];
            const startNanos = Number(props.startNanos);
            let endNanos = 0;
            if (props.timeUnitsType === "nanoseconds") {
                endNanos = startNanos + Number(props.timeUnits);
            }

            props.setTimeRange({
                startEpochs: startEpochs,
                endEpochs: endEpochs,
                startNanos: startNanos,
                endNanos: endNanos,
            });
        }

        if (props.rangeType === "relativeEnd") {
            if (
                !validateDate(
                    props.endDatetime,
                    props.endNanos,
                    setEndDateErrClass,
                    setEndNanosErrClass
                )
            ) {
                setErrText("Error in Highlighted Fields");
                validDate = false;
            }
            if (props.timeUnits === "") {
                setTimeUnitsErrClass("border-red-500");
                setErrText("Error in Highlighted Fields");
                validUnits = false;
            }
            if (props.timeUnitsType === "") {
                setTimeUnitsTypeErrClass("border-red-500");
                setErrText("Error in Highlighted Fields");
                validUnitsType = false;
            }

            setEndDateErrClass("");
            setEndNanosErrClass("");
            setTimeUnitsErrClass("");
            setTimeUnitsTypeErrClass("");
            setErrText("");

            const ptToGMT = 25200;
            const endEpochs =
                Math.floor(new Date(props.endDatetime).getTime() / 1000) -
                ptToGMT;
            let startEpochs =
                endEpochs - props.timeUnits * epochsOffset[props.timeUnitsType];
            const endNanos = Number(props.endNanos);
            let startNanos = 0;
            if (props.timeUnitsType === "nanoseconds") {
                startNanos = endNanos - Number(props.timeUnits);
                if (startNanos < 0) {
                    startNanos = startNanos + 999000000;
                    startEpochs = startEpochs - 1;
                }
            }

            props.setTimeRange({
                startEpochs: startEpochs,
                endEpochs: endEpochs,
                startNanos: startNanos,
                endNanos: endNanos,
            });
        }

        // props.setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <Combobox
                options={rangeTypeOptions}
                optionsName="Select Time Range Type"
                search={false}
                valueState={props.rangeType}
                setValueState={props.setRangeType}
                buttonClassName="w-full"
                className="mb-2 w-60"
            />
            <div className="flex flex-row items-start gap-4">
                {props.rangeType === "absolute" && (
                    <Fragment>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">From</span>
                            <input
                                aria-label="Date and time"
                                name="start-time"
                                type="datetime-local"
                                value={props.startDatetime}
                                max={maxDate}
                                step="1"
                                onChange={(e) =>
                                    props.setStartDatetime(e.target.value)
                                }
                                onFocus={() => setStartDateErrClass("")}
                                className={cn(
                                    "input-std mt-2 mb-2",
                                    startDateErrClass
                                )}
                            />
                            <input
                                type="number"
                                name="start-nanos"
                                placeholder="Nanoseconds"
                                value={props.startNanos}
                                onChange={(e) =>
                                    props.setStartNanos(e.target.value)
                                }
                                onFocus={() => setStartNanosErrClass("")}
                                className={cn("input-std", startNanosErrClass)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">To</span>
                            <input
                                aria-label="Date and time"
                                name="end-time"
                                type="datetime-local"
                                value={props.endDatetime}
                                max={maxDate}
                                step="1"
                                onChange={(e) =>
                                    props.setEndDatetime(e.target.value)
                                }
                                onFocus={() => setEndDateErrClass("")}
                                className={cn(
                                    "input-std mt-2 mb-2",
                                    endDateErrClass
                                )}
                            />
                            <input
                                type="number"
                                name="end-nanos"
                                placeholder="Nanoseconds"
                                step="1"
                                value={props.endNanos}
                                onChange={(e) =>
                                    props.setEndNanos(e.target.value)
                                }
                                onFocus={() => setEndNanosErrClass("")}
                                className={cn("input-std", endNanosErrClass)}
                            />
                        </div>
                    </Fragment>
                )}
                {props.rangeType === "relativeStart" && (
                    <Fragment>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">From</span>
                            <input
                                aria-label="Date and time"
                                name="start-time"
                                type="datetime-local"
                                value={props.startDatetime}
                                max={maxDate}
                                step="1"
                                onChange={(e) =>
                                    props.setStartDatetime(e.target.value)
                                }
                                onFocus={() => setStartDateErrClass("")}
                                className={cn(
                                    "input-std mt-2 mb-2",
                                    startDateErrClass
                                )}
                            />
                            <input
                                type="number"
                                name="start-nanos"
                                placeholder="Nanoseconds"
                                value={props.startNanos}
                                onChange={(e) =>
                                    props.setStartNanos(e.target.value)
                                }
                                onFocus={() => setStartNanosErrClass("")}
                                className={cn("input-std", startNanosErrClass)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">To</span>
                            <span className="mt-2 h-9 flex items-center text-sm text-muted-foreground">
                                {props.startDatetime !== "" ? (
                                    <Fragment>
                                        {props.startDatetime}
                                        {props.startNanos !== "" && (
                                            <Fragment>
                                                , {props.startNanos}ns
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ) : (
                                    "Start Time"
                                )}
                            </span>
                            <div className="w-full mt-2 flex flex-row items-center gap-2">
                                <span className="text-sm font-medium">
                                    Plus
                                </span>
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="123..."
                                    className={cn(
                                        "input-std w-32",
                                        timeUnitsErrClass
                                    )}
                                    value={props.timeUnits}
                                    onChange={(e) =>
                                        props.setTimeUnits(e.target.value)
                                    }
                                    onFocus={() => setTimeUnitsErrClass("")}
                                />
                                <Combobox
                                    options={timeUnitsTypeOptions}
                                    optionsName="Select Units"
                                    search={false}
                                    valueState={props.timeUnitsType}
                                    setValueState={props.setTimeUnitsType}
                                    buttonClassName={cn(
                                        "w-40",
                                        timeUnitsTypeErrClass
                                    )}
                                    onFocus={() => setTimeUnitsTypeErrClass("")}
                                />
                            </div>
                        </div>
                    </Fragment>
                )}
                {props.rangeType === "relativeEnd" && (
                    <Fragment>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">From</span>
                            <span className="mt-2 h-9 flex items-center text-sm text-muted-foreground">
                                {props.endDatetime !== "" ? (
                                    <Fragment>
                                        {props.endDatetime}
                                        {props.endNanos !== "" && (
                                            <Fragment>
                                                , {props.endNanos}ns
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ) : (
                                    "End Time"
                                )}
                            </span>
                            <div className="w-full mt-2 flex flex-row items-center gap-2">
                                <span className="text-sm font-medium">
                                    Minus
                                </span>
                                <input
                                    type="number"
                                    step="1"
                                    placeholder="123..."
                                    className={cn(
                                        "input-std w-32",
                                        timeUnitsErrClass
                                    )}
                                    value={props.timeUnits}
                                    onChange={(e) =>
                                        props.setTimeUnits(e.target.value)
                                    }
                                    onFocus={() => setTimeUnitsErrClass("")}
                                />
                                <Combobox
                                    options={timeUnitsTypeOptions}
                                    optionsName="Select Units"
                                    search={false}
                                    valueState={props.timeUnitsType}
                                    setValueState={props.setTimeUnitsType}
                                    buttonClassName={cn(
                                        "w-40",
                                        timeUnitsTypeErrClass
                                    )}
                                    onFocus={() => setTimeUnitsTypeErrClass("")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">To</span>
                            <input
                                aria-label="Date and time"
                                name="end-time"
                                type="datetime-local"
                                value={props.endDatetime}
                                max={maxDate}
                                step="1"
                                onChange={(e) =>
                                    props.setEndDatetime(e.target.value)
                                }
                                onFocus={() => setEndDateErrClass("")}
                                className={cn(
                                    "input-std mt-2 mb-2",
                                    endDateErrClass
                                )}
                            />
                            <input
                                type="number"
                                name="end-nanos"
                                placeholder="Nanoseconds"
                                step="1"
                                value={props.endNanos}
                                onChange={(e) =>
                                    props.setEndNanos(e.target.value)
                                }
                                onFocus={() => setEndNanosErrClass("")}
                                className={cn("input-std", endNanosErrClass)}
                            />
                        </div>
                    </Fragment>
                )}
            </div>
            <FilterErrorMessage>{errText}</FilterErrorMessage>
            {(props.rangeType === "absolute" ||
                props.rangeType === "relativeStart" ||
                props.rangeType === "relativeEnd") && (
                <button onClick={handleApply} className="btn-std w-60">
                    Apply
                </button>
            )}
        </div>
    );
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;
