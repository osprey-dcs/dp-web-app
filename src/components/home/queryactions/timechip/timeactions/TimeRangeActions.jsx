import PropTypes from "prop-types";
import { useState } from "react";

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
    setTimeRangeString: PropTypes.func,
    setIsOpen: PropTypes.func,
}

function formatDate(date) {
    // Extract year, month, and day components
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed
    var day = ('0' + date.getDate()).slice(-2);

    // Extract hour and minute components
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    // Construct the formatted date string
    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
}

function TimeRangeActions(props) {
    const [startDateErrClass, setStartDateErrClass] = useState('');
    const [endDateErrClass, setEndDateErrClass] = useState('');
    const [startNanosErrClass, setStartNanosErrClass] = useState('');
    const [endNanosErrClass, setEndNanosErrClass] = useState('');
    const [errText, setErrText] = useState('');
    const maxDate = formatDate(new Date());

    function validateDate(startDateString, endDateString) {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            setErrText("Invalid Date");
            isNaN(startDate.getTime()) ? setStartDateErrClass("border-red-500") : null;
            isNaN(endDate.getTime()) ? setEndDateErrClass("border-red-500") : null;
            return false;
        }

        if (startDate > endDate) {
            setErrText("Start time is greater than end time");
            return false
        }

        const now = new Date()
        if (endDate > now) {
            setErrText("Time range exceeds current date and time");
            setEndDateErrClass("border-red-500");
            startDate > now ? setStartDateErrClass("border-red-500") : null;
            return false;
        }

        return true;
    }

    function validateNanos(startNanos, endNanos) {
        let startNanosValid = true;
        let endNanosValid = true;
        const startNumber = Number(startNanos);
        const endNumber = Number(endNanos);

        if (startNumber > 999999999 || startNumber < 0) {
            setErrText("Invalid Nanosecond Value");
            setStartNanosErrClass("border-red-500");
            startNanosValid = false;
        }

        if (endNumber > 999999999 || endNumber < 0) {
            setErrText("Invalid Nanosecond Value");
            setEndNanosErrClass("border-red-500");
            endNanosValid = false;
        }

        return startNanosValid && endNanosValid;
    }

    function handleApply() {
        const validDate = validateDate(props.startDatetime, props.endDatetime);
        const validNanos = validateNanos(props.startNanos, props.endNanos)

        if (!(validDate && validNanos)) return;

        setErrText("");
        const startEpoch = 2 + Math.floor(new Date(props.startDatetime).getTime() / 1000);
        const endEpoch = 2 + Math.floor(new Date(props.endDatetime).getTime() / 1000);

        props.setTimeRange({ start: startEpoch, end: endEpoch });
        props.setTimeRangeString(props.startDatetime + " - " + props.endDatetime);
        props.setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 flex flex-row items-center">
                <div className="flex flex-col">
                    <input aria-label="Date and time" name="start-time" type="datetime-local" value={props.startDatetime} max={maxDate} step="1" onChange={e => props.setStartDatetime(e.target.value)} onFocus={() => setStartDateErrClass('')} className={"input-std mb-2 " + startDateErrClass} />
                    <input type="number" placeholder=" Nanoseconds" onChange={e => props.setStartNanos(e.target.value)} onFocus={() => setStartNanosErrClass('')} className={"input-std " + startNanosErrClass} />
                </div>
                <span className="px-4">to</span>
                <div className="flex flex-col">
                    <input aria-label="Date and time" name="end-time" type="datetime-local" value={props.endDatetime} max={maxDate} step="1" onChange={e => props.setEndDatetime(e.target.value)} onFocus={() => setEndDateErrClass('')} className={"input-std mb-2 " + endDateErrClass} />
                    <input type="number" placeholder="Nanoseconds" onChange={e => props.setEndNanos(e.target.value)} onFocus={() => setEndNanosErrClass('')} className={"input-std " + endNanosErrClass} />
                </div>
            </div>
            <div className={errText !== "" ? "mb-2 font-medium text-red-500" : ""}>{errText}</div>
            <button onClick={handleApply} className="btn-std w-1/2 py-2">
                Apply
            </button>
        </div>
    )
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;