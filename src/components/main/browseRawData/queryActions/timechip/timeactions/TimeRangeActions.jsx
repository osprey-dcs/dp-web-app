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
import { useState } from "react";
import AbsoluteRange from "./absoluteRange/AbsoluteRange";
import EndAnchorRange from "./endAnchorRange/EndAnchorRange";
import StartAnchorRange from "./startAnchorRange/StartAnchorRange";

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
        value: "milliseconds",
        label: "Milliseconds",
    },
    {
        value: "microseconds",
        label: "Microseconds",
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
    milliseconds: 0,
    microseconds: 0,
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
            } else if (props.timeUnitsType === "microseconds") {
                endNanos = startNanos + Number(props.timeUnits) * 1000;
            } else if (props.timeUnitsType === "milliseconds") {
                endNanos = startNanos + Number(props.timeUnits) * 1000000;
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
            } else if (props.timeUnitsType === "microseconds") {
                startNanos = endNanos - Number(props.timeUnits) * 1000;
            } else if (props.timeUnitsType === "milliseconds") {
                startNanos = endNanos - Number(props.timeUnits) * 1000000;
            }

            if (startNanos < 0) {
                startNanos = startNanos + 999000000;
                startEpochs = startEpochs - 1;
            }

            props.setTimeRange({
                startEpochs: startEpochs,
                endEpochs: endEpochs,
                startNanos: startNanos,
                endNanos: endNanos,
            });
        }

        props.setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className={cn(
                    "w-full",
                    props.rangeType !== "" && "pb-4 mb-4 border-b"
                )}
            >
                <Combobox
                    options={rangeTypeOptions}
                    optionsName="Select Time Range Type"
                    search={false}
                    valueState={props.rangeType}
                    setValueState={props.setRangeType}
                    buttonClassName="w-full"
                    className="w-60"
                />
            </div>
            <div className="flex flex-row items-start gap-4">
                {props.rangeType === "absolute" && (
                    <AbsoluteRange
                        {...props}
                        startDateErrClass={startDateErrClass}
                        setStartDateErrClass={setStartDateErrClass}
                        startNanosErrClass={startNanosErrClass}
                        setStartNanosErrClass={setStartNanosErrClass}
                        endDateErrClass={endDateErrClass}
                        setEndDateErrClass={setEndDateErrClass}
                        endNanosErrClass={endNanosErrClass}
                        setEndNanosErrClass={setEndNanosErrClass}
                        maxDate={maxDate}
                    />
                )}
                {props.rangeType === "relativeStart" && (
                    <StartAnchorRange
                        {...props}
                        startDateErrClass={startDateErrClass}
                        setStartDateErrClass={setStartDateErrClass}
                        startNanosErrClass={startNanosErrClass}
                        setStartNanosErrClass={setStartNanosErrClass}
                        timeUnitsTypeOptions={timeUnitsTypeOptions}
                        timeUnitsErrClass={timeUnitsErrClass}
                        setTimeUnitsErrClass={setTimeUnitsErrClass}
                        timeUnitsTypeErrClass={timeUnitsTypeErrClass}
                        setTimeUnitsTypeErrClass={setTimeUnitsTypeErrClass}
                        maxDate={maxDate}
                    />
                )}
                {props.rangeType === "relativeEnd" && (
                    <EndAnchorRange
                        {...props}
                        endDateErrClass={endDateErrClass}
                        setEndDateErrClass={setEndDateErrClass}
                        endNanosErrClass={endNanosErrClass}
                        setEndNanosErrClass={setEndNanosErrClass}
                        timeUnitsTypeOptions={timeUnitsTypeOptions}
                        timeUnitsErrClass={timeUnitsErrClass}
                        setTimeUnitsErrClass={setTimeUnitsErrClass}
                        timeUnitsTypeErrClass={timeUnitsTypeErrClass}
                        setTimeUnitsTypeErrClass={setTimeUnitsTypeErrClass}
                        maxDate={maxDate}
                    />
                )}
            </div>
            <FilterErrorMessage className="">{errText}</FilterErrorMessage>
            {(props.rangeType === "absolute" ||
                props.rangeType === "relativeStart" ||
                props.rangeType === "relativeEnd") && (
                <button onClick={handleApply} className="btn-std w-60 mt-4">
                    Apply
                </button>
            )}
        </div>
    );
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;
