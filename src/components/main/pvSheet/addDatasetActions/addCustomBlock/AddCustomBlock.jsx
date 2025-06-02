import { FilterErrorMessage } from "@/components/ui/FilterErrorMessage";
import {
    cn,
    formatDate,
    validateDateRange,
    validateNanosRange,
} from "@/lib/utils";
import { ArrowLeftIcon, MinusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import DatasetPicker from "./datasetPicker";

function AddCustomBlock(props) {
    const [errText, setErrText] = useState("");

    const [dataSourcesString, setDataSourcesString] = useState("");
    const [dataSources, setDataSources] = useState(new Set());
    const [dataSourcesErrClass, setDataSourcesErrClass] = useState("");

    const [startDateErrClass, setStartDateErrClass] = useState("");
    const [startNanosErrClass, setStartNanosErrClass] = useState("");
    const [endDateErrClass, setEndDateErrClass] = useState("");
    const [endNanosErrClass, setEndNanosErrClass] = useState("");
    const maxDate = formatDate(new Date());

    function handleAddBlock() {
        const validDate = validateDateRange(
            props.startDatetime,
            props.endDatetime,
            props.startNanos,
            props.endNanos,
            setStartDateErrClass,
            setEndDateErrClass,
            setStartNanosErrClass,
            setEndNanosErrClass
        );
        const validNanos = validateNanosRange(
            props.startNanos,
            props.endNanos,
            setStartNanosErrClass,
            setEndNanosErrClass
        );

        if (!(validDate && validNanos) || dataSources.size === 0) {
            console.log("err");
            console.log(dataSources.size);
            dataSources.size === 0 &&
                setDataSourcesErrClass("border-destructive");
            setErrText("Error in Highlighted Fields");
            return;
        }

        setErrText("");

        const timezoneOffset = (new Date().getTimezoneOffset() / 60) * 3600;
        const wrongTimezoneOffset =
            (new Date().getTimezoneOffset() / 60 - 1) * 3600;

        const startEpochs = Math.floor(
            new Date(props.startDatetime).getTime() / 1000
        );
        const endEpochs =
            Math.floor(new Date(props.endDatetime).getTime() / 1000) -
            wrongTimezoneOffset;

        props.setDataBlocks([
            ...props.dataBlocks,
            {
                startEpochs: parseInt(startEpochs),
                endEpochs: parseInt(endEpochs),
                startNanos: Number(props.startNanos),
                endNanos: Number(props.endNanos),
                pvNames: [...dataSources],
                // pvNames: dataSourcesString.split(", "),
            },
        ]);
        handleCancel();
    }

    function handleCancel() {
        props.handleChangePage(props.pages.CREATE_SET);
        props.setStartDatetime("");
        props.setStartNanos("");
        props.setEndDatetime("");
        props.setEndNanos("");
        setDataSources(new Set());
        setDataSourcesString("");
    }

    return (
        <>
            <ArrowLeftIcon
                onClick={() =>
                    props.handleChangePage(props.pages.SELECT_BLOCK_TYPE)
                }
                className="mx-2 -mt-2 mb-2 hover:cursor-pointer hover:text-foreground"
            />
            <div className="px-5 pb-5 flex flex-col items-center">
                <input
                    aria-label="Date and time"
                    name="start-time"
                    type="datetime-local"
                    value={props.startDatetime}
                    max={maxDate}
                    step="1"
                    onChange={(e) => props.setStartDatetime(e.target.value)}
                    onFocus={() => setStartDateErrClass("")}
                    className={cn("input-std w-full mb-2", startDateErrClass)}
                />
                <input
                    type="number"
                    name="start-nanos"
                    placeholder="Nanoseconds"
                    value={props.startNanos}
                    onChange={(e) => props.setStartNanos(e.target.value)}
                    onFocus={() => setStartNanosErrClass("")}
                    className={cn("input-std w-full mb-2", startNanosErrClass)}
                />
                <span className="mb-2 font-medium">to</span>
                <input
                    aria-label="Date and time"
                    name="start-time"
                    type="datetime-local"
                    value={props.endDatetime}
                    max={maxDate}
                    step="1"
                    onChange={(e) => props.setEndDatetime(e.target.value)}
                    onFocus={() => setEndDateErrClass("")}
                    className={cn("input-std w-full mb-2", endDateErrClass)}
                />
                <input
                    type="number"
                    name="start-nanos"
                    placeholder="Nanoseconds"
                    value={props.endNanos}
                    onChange={(e) => props.setEndNanos(e.target.value)}
                    onFocus={() => setEndNanosErrClass("")}
                    className={cn("input-std w-full mb-2", endNanosErrClass)}
                />
                <div className="w-full mt-2 mb-2 border-b"></div>
                {/* <span className="mb-2 font-medium">--</span> */}
                {/* <input
                        placeholder="Data Sources"
                        name="pv-name"
                        value={dataSourcesString}
                        onChange={(e) => setDataSourcesString(e.target.value)}
                        onFocus={() => setDataSourcesErrClass("")}
                        className={cn("input-std w-full", dataSourcesErrClass)}
                    /> */}
                <div className="w-full mb-2 flex flex-col items-start justify-center max-h-24 overflow-scroll">
                    {[...dataSources].map((dataSource) => (
                        <div
                            key={dataSource}
                            className="w-full px-2 flex flex-row items-center justify-between text-foreground"
                        >
                            <span className="text-sm">{dataSource}</span>
                            <MinusCircledIcon
                                className="hover:text-foreground/70 hover:cursor-pointer"
                                onClick={() => {
                                    let newDataset = new Set(dataSources);
                                    newDataset.delete(dataSource);
                                    setDataSources(newDataset);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <DatasetPicker
                    dataSources={dataSources}
                    setDataSources={setDataSources}
                    className="mb-2"
                />
                <FilterErrorMessage>{errText}</FilterErrorMessage>
                <button
                    onClick={handleAddBlock}
                    className="btn-std w-full mb-2"
                >
                    Add Block
                </button>
                <button onClick={handleCancel} className="btn-alt w-full">
                    Cancel
                </button>
            </div>
        </>
    );
}

export default AddCustomBlock;
