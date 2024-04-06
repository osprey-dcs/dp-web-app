import PropTypes from "prop-types";
import { useState } from "react";

const propTypes = {
    setIsOpen: PropTypes.func,
    setTimeRange: PropTypes.func,
    setTimeRangeSet: PropTypes.func,
    setTimeRangeString: PropTypes.func,
}

const formatDate = () => {
    // Create a new Date object
    var date = new Date();

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
    const [startDatetime, setStartDatetime] = useState(new Date());
    const [endDatetime, setEndDatetime] = useState(new Date());
    const [startPlaceholder, setStartPlaceholder] = useState(formatDate(new Date()));
    const [endPlaceholder, setEndPlaceholder] = useState(formatDate(new Date()));

    function handleApply() {
        const startEpoch = 2 + Math.floor(new Date(startDatetime).getTime() / 1000);
        const endEpoch = 2 + Math.floor(new Date(endDatetime).getTime() / 1000);

        props.setTimeRange({ start: startEpoch, end: endEpoch })
        props.setIsOpen(false);
        props.setTimeRangeSet(true);
        const startFormatted = formatDate(startDatetime)
        const endFormatted = formatDate(endDatetime)
        props.setTimeRangeString(startFormatted + " - " + endFormatted)
        setStartPlaceholder(startFormatted);
        setEndDatetime(endFormatted);
    }

    const myDate = formatDate()
    // console.log(myDate);

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 flex flex-row items-center">
                <div className="flex flex-col">
                    <input aria-label="Date and time" name="start-time" type="datetime-local" value={startPlaceholder} onChange={e => setStartDatetime(e.target.value)} max={myDate} step="1" className="input-std mb-2" />
                    <input type="number" placeholder=" Nanoseconds" className="input-std" />
                </div>
                <span className="px-4">to</span>
                <div className="flex flex-col">
                    <input aria-label="Date and time" name="end-time" type="datetime-local" value={endPlaceholder} onChange={e => setEndDatetime(e.target.value)} max={myDate} step="1" className="input-std mb-2" />
                    <input type="number" placeholder="Nanoseconds" className="input-std" />
                </div>
            </div>
            <button onClick={handleApply} className="btn-std w-1/2 py-2">
                Apply
            </button>
        </div>
    )
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;