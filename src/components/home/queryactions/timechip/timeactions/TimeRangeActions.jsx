import PropTypes from "prop-types";

const propTypes = {
    setIsOpen: PropTypes.func,
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

    const myDate = formatDate()
    // console.log(myDate);

    return (
        <div className="flex flex-col">
            <input aria-label="Date and time" type="datetime-local" max={myDate} className="mb-2" />
            <button onClick={() => props.setIsOpen(false)} className="w-full py-2 rounded text-sm font-medium text-white bg-[#19191B]">
                Apply
            </button>
        </div>
    )
}

TimeRangeActions.propTypes = propTypes;
export default TimeRangeActions;