function TimestampCellRenderer(props) {
    const epochs = props.value.value.timestampValue.epochSeconds.toString();
    const nanos = props.value.value.timestampValue.nanoseconds.toString();
    return (
        <span>
            {epochs}:{nanos}
        </span>
    )
}

export default TimestampCellRenderer;