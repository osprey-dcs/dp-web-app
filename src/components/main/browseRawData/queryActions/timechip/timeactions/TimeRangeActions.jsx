import PropTypes from "prop-types";
import { useState } from "react";
import { FilterErrorMessage } from "@/components/ui/FilterErrorMessage";
import { cn, formatDate, validateDate, validateNanos } from "@/lib/utils"

const propTypes = {
    setTimeRange: PropTypes.func,
    startDatetime: PropTypes.string,
    setStartDatetime: PropTypes.func,
    endDatetime: PropTypes.string,
    setEndDatetime: PropTypes.func,
    startNanos: PropTypes.string,
    setStartNanos: PropTypes.func,
    endNanos: PropTypes.string,
    setEndNanos: PropTypes.func,
    setIsOpen: PropTypes.func,
}

function TimeRangeActions(props) {
    const [startDateErrClass, setStartDateErrClass] = useState("");
    const [endDateErrClass, setEndDateErrClass] = useState("");
    const [startNanosErrClass, setStartNanosErrClass] = useState("");
    const [endNanosErrClass, setEndNanosErrClass] = useState("");
    const [errText, setErrText] = useState("");
    const maxDate = formatDate(new Date());

    function handleApply() {
        const validDate = validateDate(props.startDatetime, props.endDatetime, props.startNanos, props.endNanos, setStartDateErrClass, setEndDateErrClass, setStartNanosErrClass, setEndNanosErrClass);
        const validNanos = validateNanos(props.startNanos, props.endNanos, setStartNanosErrClass, setEndNanosErrClass)

        if (!(validDate && validNanos)) {
            setErrText("Error in Highlighted Fields")
            return;
        }

        setErrText("");

        const ptToGMT = 25200

        const startEpochs = Math.floor(new Date(props.startDatetime).getTime() / 1000) - ptToGMT;
        const endEpochs = Math.floor(new Date(props.endDatetime).getTime() / 1000) - ptToGMT;

        props.setTimeRange({
            startEpochs: startEpochs,
            endEpochs: endEpochs,
            startNanos: Number(props.startNanos),
            endNanos: Number(props.endNanos)
        });
        props.setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <input
                        aria-label="Date and time" name="start-time" type="datetime-local" value={props.startDatetime}
                        max={maxDate} step="1"
                        onChange={e => props.setStartDatetime(e.target.value)} onFocus={() => setStartDateErrClass("")}
                        className={cn("input-std mb-2", startDateErrClass)}
                    />
                    <input
                        type="number" name="start-nanos" placeholder="Nanoseconds" value={props.startNanos}
                        onChange={e => props.setStartNanos(e.target.value)} onFocus={() => setStartNanosErrClass("")}
                        className={cn("input-std", startNanosErrClass)}
                    />
                </div>
                <span className="px-4 font-medium text-sm">to</span>
                <div className="flex flex-col">
                    <input aria-label="Date and time" name="end-time" type="datetime-local" value={props.endDatetime}
                        max={maxDate} step="1"
                        onChange={e => props.setEndDatetime(e.target.value)} onFocus={() => setEndDateErrClass("")}
                        className={cn("input-std mb-2", endDateErrClass)}
                    />
                    <input type="number" name="end-nanos" placeholder="Nanoseconds" step="1" value={props.endNanos}
                        onChange={e => props.setEndNanos(e.target.value)} onFocus={() => setEndNanosErrClass("")}
                        className={cn("input-std", endNanosErrClass)}
                    />
                </div>
            </div>
            <FilterErrorMessage>{errText}</FilterErrorMessage>
            <button onClick={handleApply} className="btn-std w-1/2">
                Apply
            </button>
        </div>
    )
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;