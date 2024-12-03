import { Combobox } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const propTypes = {
    endDatetime: PropTypes.string,
    setEndDatetime: PropTypes.func,
    endNanos: PropTypes.string,
    setEndNanos: PropTypes.func,
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

function EndAnchorRange(props) {
    return (
        <>
            <div className="flex flex-col">
                <span className="text-sm font-medium">From</span>
                <span className="mt-2 h-9 flex items-center text-sm text-muted-foreground">
                    {props.endDatetime !== "" ? (
                        <>
                            {props.endDatetime}
                            {props.endNanos !== "" && <>, {props.endNanos}ns</>}
                        </>
                    ) : (
                        "End Time"
                    )}
                </span>
                <div className="w-full mt-2 flex flex-row items-center gap-2">
                    <span className="text-sm font-medium">Minus</span>
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
            <div className="flex flex-col">
                <span className="text-sm font-medium">To</span>
                <input
                    aria-label="Date and time"
                    name="end-time"
                    type="datetime-local"
                    value={props.endDatetime}
                    max={props.maxDate}
                    step="1"
                    onChange={(e) => props.setEndDatetime(e.target.value)}
                    onFocus={() => props.setEndDateErrClass("")}
                    className={cn("input-std mt-2 mb-2", props.endDateErrClass)}
                />
                <input
                    type="number"
                    name="end-nanos"
                    placeholder="Nanoseconds"
                    step="1"
                    value={props.endNanos}
                    onChange={(e) => props.setEndNanos(e.target.value)}
                    onFocus={() => props.setEndNanosErrClass("")}
                    className={cn("input-std", props.endNanosErrClass)}
                />
            </div>
        </>
    );
}

export default EndAnchorRange;
