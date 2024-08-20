import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatDate(date) {
    // Extract year, month, and day components
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero indexed
    var day = ("0" + date.getDate()).slice(-2);

    // Extract hour and minute components
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);

    // Construct the formatted date string
    return (
        year +
        "-" +
        month +
        "-" +
        day +
        "T" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
    );
}

export function validateDateRange(
    startDateString,
    endDateString,
    startNanos,
    endNanos,
    setStartDateErrClass,
    setEndDateErrClass,
    setStartNanosErrClass,
    setEndNanosErrClass
) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        isNaN(startDate.getTime()) &&
            setStartDateErrClass("border-destructive");
        isNaN(endDate.getTime()) && setEndDateErrClass("border-destructive");
        return false;
    }

    if (startDate > endDate) {
        setStartDateErrClass("border-destructive");
        setEndDateErrClass("border-destructive");
        return false;
    }

    if (
        startDate.getTime() === endDate.getTime() &&
        Number(startNanos) > Number(endNanos)
    ) {
        setStartNanosErrClass("border-destructive");
        setEndNanosErrClass("border-destructive");
        return false;
    }

    const now = new Date();
    let startValid = true;
    let endValid = true;
    if (startDate > now) {
        setStartDateErrClass("border-destructive");
        startValid = false;
    }

    if (endDate > now) {
        setEndDateErrClass("border-destructive");
        endValid = false;
    }

    return startValid && endValid;
}

export function validateNanosRange(
    startNanos,
    endNanos,
    setStartNanosErrClass,
    setEndNanosErrClass
) {
    let startNanosValid = true;
    let endNanosValid = true;
    const startNumber = Number(startNanos);
    const endNumber = Number(endNanos);

    if (startNumber > 999999999 || startNumber < 0) {
        setStartNanosErrClass("border-destructive");
        startNanosValid = false;
    }

    if (endNumber > 999999999 || endNumber < 0) {
        setEndNanosErrClass("border-destructive");
        endNanosValid = false;
    }

    const rejex = /^[0-9]*$/;

    if (!rejex.test(startNanos)) {
        setStartNanosErrClass("border-destructive");
        startNanosValid = false;
    }

    if (!rejex.test(endNanos)) {
        setEndNanosErrClass("border-destructive");
        endNanosValid = false;
    }

    return startNanosValid && endNanosValid;
}

export function validateDate(
    dateString,
    nanosString,
    setDateErrClass,
    setNanosErrClass
) {
    let dateValid = true;
    let nanosValid = true;
    const date = new Date(dateString);
    const nanos = Number(nanosString);

    if (isNaN(date.getTime())) {
        setDateErrClass("border-destructive");
        dateValid = false;
    }
    if (nanos < 0) {
        setNanosErrClass("border-destructive");
        nanosValid = false;
    }

    return dateValid && nanosValid;
}

export function getDataColDefs(resultData) {
    let colDefs = [];

    const rowMapTable = resultData.tableResult.rowMapTable;
    for (let i = 0; i < rowMapTable.columnNames.length; ++i) {
        if (i === 0) {
            colDefs.push({
                field: rowMapTable.columnNames[i],
                pinned: "left",
                sortable: false,
                valueFormatter: (p) =>
                    p.value.value.timestampValue.epochSeconds.toString() +
                    ":" +
                    p.value.value.timestampValue.nanoseconds.toString(),
                // cellRenderer: "timestampCellRenderer",
            });
        } else {
            colDefs.push({
                field: rowMapTable.columnNames[i],
                sortable: false,
                cellRenderer: "dataValueCellRenderer",
                cellClassRules: {
                    "bg-blue-200/40": (p) => p.value.value.selected,
                },
            });
        }
    }
    return colDefs;
}

export function getMetadataColDefs(pv) {
    let colDefs = [];
    for (let attribute in pv) {
        switch (attribute) {
            case "pvName":
                colDefs.push({
                    field: "pvName",
                    headerName: "PV Name",
                    flex: 1,
                    cellClass: "hover:cursor-pointer hover:bg-primary/5",
                });
                break;
            case "firstDataTimestamp":
                colDefs.push({
                    field: "firstDataTimestamp",
                    headerName: "First Timestamp",
                    sortable: false,
                    flex: 1,
                    valueFormatter: (p) =>
                        p.value.epochSeconds + ":" + p.value.nanoseconds,
                });
                break;
            case "lastDataTimestamp":
                colDefs.push({
                    field: "lastDataTimestamp",
                    headerName: "Last Timestamp",
                    sortable: false,
                    flex: 1,
                    valueFormatter: (p) =>
                        p.value.epochSeconds + ":" + p.value.nanoseconds,
                });
                break;
            // case "lastSamplingClock":
            //     colDefs.push({
            //         field: "lastSamplingClock",
            //         headerName: "Last Sampling Clock",
            //         sortable: false,
            //         flex: 1,
            //         valueFormatter: (p) => p.value.count,
            //     });
            //     break;
            default:
                // Convert camel case to regular string
                let headerWords = attribute.split(/(?=[A-Z])/);
                let headerName = headerWords
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                colDefs.push({
                    field: attribute,
                    headerName: headerName,
                    sortable: false,
                    flex: 1,
                });
                break;
        }
    }
    return colDefs;
}

export function getAnnotationColDefs(annotation) {
    let colDefs = [];
    for (let attribute in annotation) {
        switch (attribute) {
            case "annotation":
                switch (annotation[attribute].oneofKind) {
                    case "commentAnnotation":
                        colDefs.push({
                            field: "annotation",
                            headerName: "Annotation",
                            sortable: false,
                            valueFormatter: (p) =>
                                p.value.commentAnnotation.comment,
                        });
                        break;
                    default:
                        break;
                }
            case "dataSet":
                break;
            default:
                let headerWords = attribute.split(/(?=[A-Z])/);
                let headerName = headerWords
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                colDefs.push({
                    field: attribute,
                    headerName: headerName,
                    flex: 1,
                });
                break;
        }
    }

    return colDefs;
}

export function onPVSelected(pvName, pvs, dispatch, ToastAction, toast) {
    let toastDescription = "";
    let toastActionText = "";

    if (!pvs.has(pvName)) {
        dispatch({
            type: "added",
            pvName: pvName,
        });
        toastDescription = `${pvName} added to PV list`;
        toastActionText = "Undo";
    } else {
        toastDescription = `${pvName} already exists in PV list`;
        toastActionText = "Remove";
    }

    const toastAction = (
        <ToastAction
            onClick={() =>
                dispatch({
                    type: "removed",
                    pvName: pvName,
                })
            }
            altText={toastActionText}
        >
            {toastActionText}
        </ToastAction>
    );
    toast({
        description: toastDescription,
        action: toastAction,
    });
}
