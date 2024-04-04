import PropTypes from "prop-types";
import { useState } from "react";

const propTypes = {
    setIsOpen: PropTypes.func,
    setTimeRange: PropTypes.func,
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

    // Construct the formatted date string
    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
}

function TimeRangeActions(props) {
    const [startDatetime, setStartDatetime] = useState(new Date());
    const [endDatetime, setEndDatetime] = useState(new Date());

    function handleApply() {
        const startEpoch = 2 + Math.floor(new Date(startDatetime).getTime() / 1000);
        const endEpoch = 2 + Math.floor(new Date(endDatetime).getTime() / 1000);

        props.setTimeRange({ start: startEpoch, end: endEpoch })
        props.setIsOpen(false);
    }

    const myDate = formatDate()
    // console.log(myDate);

    return (
        <div className="flex flex-col">
            <label htmlFor="start-time" className="text-xs font-medium">Start Time</label>
            <input aria-label="Date and time" name="start-time" type="datetime-local" onChange={e => setStartDatetime(e.target.value)} max={myDate} className="mb-2 rounded input-std" />
            <label htmlFor="end-time" className="text-xs font-medium">End Time</label>
            <input aria-label="Date and time" name="end-time" type="datetime-local" onChange={e => setEndDatetime(e.target.value)} max={myDate} className="mb-4 rounded input-std" />
            {/* <input type="text" className="input-std mb-4 w-full"></input> */}
            <button onClick={handleApply} className="btn-std w-full py-2">
                Apply
            </button>
        </div>
    )
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;