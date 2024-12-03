import { Combobox } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const propTypes = {
    startDatetime: PropTypes.string,
    setStartDatetime: PropTypes.func,
    startNanos: PropTypes.string,
    setStartNanos: PropTypes.func,
    startDateErrClass: PropTypes.string,
    setStartDateErrClass: PropTypes.func,
    startNanosErrClass: PropTypes.string,
    setStartNanosErrClass: PropTypes.func,
    timeUnitsTypeOptions: PropTypes.array,
    timeUnits: PropTypes.string,
    setTimeUnits: PropTypes.func,
    timeUnitsType: PropTypes.string,
    setTimeUnitsType: PropTypes.func,
    timeUnitsErrClass: PropTypes.string,
    setTimeUnitsErrClass: PropTypes.func,
    timeUnitsTypeErrClass: PropTypes.string,
    setTimeUnitsTypeErrClass: PropTypes.func,
    maxDate: PropTypes.string,
};

function StartAnchorRange(props) {
    return (
        <>
            <div className="flex flex-col">
                <span className="text-sm font-medium">From</span>
                <input
                    aria-label="Date and time"
                    name="start-time"
                    type="datetime-local"
                    value={props.startDatetime}
                    max={props.maxDate}
                    step="1"
                    onChange={(e) => props.setStartDatetime(e.target.value)}
                    onFocus={() => props.setStartDateErrClass("")}
                    className={cn(
                        "input-std mt-2 mb-2",
                        props.startDateErrClass
                    )}
                />
                <input
                    type="number"
                    name="start-nanos"
                    placeholder="Nanoseconds"
                    value={props.startNanos}
                    onChange={(e) => props.setStartNanos(e.target.value)}
                    onFocus={() => props.setStartNanosErrClass("")}
                    className={cn("input-std", props.startNanosErrClass)}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium">To</span>
                <span className="mt-2 h-9 flex items-center text-sm text-muted-foreground">
                    {props.startDatetime !== "" ? (
                        <>
                            {props.startDatetime}
                            {props.startNanos !== "" && (
                                <>, {props.startNanos}ns</>
                            )}
                        </>
                    ) : (
                        "Start Time"
                    )}
                </span>
                <div className="w-full mt-2 flex flex-row items-center gap-2">
                    <span className="text-sm font-medium">Plus</span>
                    <input
                        type="number"
                        step="1"
                        placeholder="123..."
                        className={cn(
                            "input-std w-32",
                            props.timeUnitsErrClass
                        )}
                        value={props.timeUnits}
                        onChange={(e) => props.setTimeUnits(e.target.value)}
                        onFocus={() => props.setTimeUnitsErrClass("")}
                    />
                    <Combobox
                        options={props.timeUnitsTypeOptions}
                        optionsName="Select Units"
                        search={false}
                        valueState={props.timeUnitsType}
                        setValueState={props.setTimeUnitsType}
                        buttonClassName={cn(
                            "w-40",
                            props.timeUnitsTypeErrClass
                        )}
                        onFocus={() => props.setTimeUnitsTypeErrClass("")}
                    />
                </div>
            </div>
        </>
    );
}

StartAnchorRange.propTypes = propTypes;
export default StartAnchorRange;
