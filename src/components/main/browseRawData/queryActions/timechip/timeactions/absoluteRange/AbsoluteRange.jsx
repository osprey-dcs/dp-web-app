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
    endDatetime: PropTypes.string,
    setEndDatetime: PropTypes.func,
    endNanos: PropTypes.string,
    setEndNanos: PropTypes.func,
    endDateErrClass: PropTypes.string,
    setEndDateErrClass: PropTypes.func,
    endNanosErrClass: PropTypes.string,
    setEndNanosErrClass: PropTypes.func,
    maxDate: PropTypes.string,
};

function AbsoluteRange(props) {
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

AbsoluteRange.propTypes = propTypes;
export default AbsoluteRange;
