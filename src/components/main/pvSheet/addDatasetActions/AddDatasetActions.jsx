import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import DataPlatformApi from "@/domain/grpc-client/DataPlatformApi";
import PropTypes from "prop-types";
import { Fragment, useMemo, useState } from "react";

import AddCustomBlock from "./addCustomBlock";
import CreateDataSet from "./createDataSet";
import CurrentQueryDataSet from "./currentQueryDataSet";
import SelectBlockType from "./selectBlockType";

const propTypes = {
    setIsOpen: PropTypes.func,
};

function AddDatasetActions({
    resultData,
    dataBlocks,
    setDataBlocks,
    setShowDataSetActions,
    name,
    setName,
    description,
    setDescription,
}) {
    const pages = Object.freeze({
        SELECT_BLOCK_TYPE: "Select Block Type",
        SET_FROM_QUERY: "setFromQuery",
        CREATE_SET: "Create Data Set",
        CREATE_BLOCK: "Add Data Block",
    });

    const api = useMemo(() => new DataPlatformApi(), []);
    const { toast } = useToast();

    const [currentPage, setCurrentPage] = useState(pages.CREATE_SET);
    // const [dataBlocks, setDataBlocks] = useState([]);

    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    const [startDatetime, setStartDatetime] = useState("");
    const [startNanos, setStartNanos] = useState("");
    const [endDatetime, setEndDatetime] = useState("");
    const [endNanos, setEndNanos] = useState("");

    const [nameErrClass, setNameErrClass] = useState("");
    const [descriptionErrClass, setDescriptionErrClass] = useState("");
    const [addDbErrClass, setAddDbErrClass] = useState("");

    function handleChangePage(newPage) {
        setNameErrClass("");
        setDescriptionErrClass("");
        setAddDbErrClass("");
        setCurrentPage(newPage);
    }

    async function handleAddSet() {
        if (name === "" || description === "" || dataBlocks.length === 0) {
            if (name === "") setNameErrClass("border-destructive");
            if (description === "")
                setDescriptionErrClass("border-destructive");
            if (dataBlocks.length === 0) setAddDbErrClass("text-destructive");
            return;
        }

        const queryParams = {
            name: name,
            description: description,
            dataBlocks: dataBlocks,
        };

        setDataBlocks([]);
        setName("");
        setDescription("");
        const result = await api.createDataSet(queryParams);

        let toastTitle = "";
        let toastDescription = "";
        let toastVariant = "default";
        let toastActions = null;

        const FileFormats = Object.freeze({
            HDF5: 1,
            CSV: 2,
            XLSX: 3,
        });

        switch (typeof result) {
            case "object":
                if (result.oneofKind === "createDataSetResult") {
                    const dataSetId = result.createDataSetResult?.dataSetId;
                    navigator.clipboard.writeText(dataSetId);
                    toastTitle = "Data Set Successfully Created";
                    toastDescription = `Copied data set id ${dataSetId} to clipboard. Export this data set?`;
                    toastActions = [
                        <ToastAction
                            onClick={() =>
                                exportDataSet(dataSetId, FileFormats.HDF5)
                            }
                            altText="HDF5"
                        >
                            HDF5
                        </ToastAction>,
                        <ToastAction
                            onClick={() =>
                                exportDataSet(dataSetId, FileFormats.CSV)
                            }
                            altText="CSV"
                        >
                            CSV
                        </ToastAction>,
                        <ToastAction
                            onClick={() =>
                                exportDataSet(dataSetId, FileFormats.XLSX)
                            }
                            altText="XLSX"
                        >
                            XLSX
                        </ToastAction>,
                    ];
                }
                break;
            case "string":
                toastTitle = "Error";
                toastDescription = result;
                toastVariant = "destructive";
                break;
            default:
                toastTitle = "Error";
                toastDescription =
                    "An error occured while creating the basis set";
                toastVariant = "destructive";
                break;
        }

        toast({
            title: toastTitle,
            description: toastDescription,
            variant: toastVariant,
            actions: toastActions,
            newLineActions: true,
        });

        async function exportDataSet(dataSetId, outputFormat) {
            const result = await api.exportDataSet({
                dataSetId: dataSetId,
                outputFormat: outputFormat,
            });
            if (result instanceof Error) {
                toast({
                    title: result.constructor.name,
                    description: result.message,
                    variant: "destructive",
                });
            } else {
                window.open(result.exportDataResult?.fileUrl, "_blank");
            }
        }
    }

    return (
        <Fragment>
            <div className=" w-full mb-4 px-5 pt-4 pb-2 border-b">
                <h1 className="font-semibold">{currentPage}</h1>
            </div>
            {currentPage === pages.SELECT_BLOCK_TYPE ? (
                <SelectBlockType
                    pages={pages}
                    handleChangePage={handleChangePage}
                    resultData={resultData}
                    dataBlocks={dataBlocks}
                    setDataBlocks={setDataBlocks}
                />
            ) : currentPage === pages.SET_FROM_QUERY ? (
                <CurrentQueryDataSet
                    name={name}
                    setName={setName}
                    nameErrClass={nameErrClass}
                    setNameErrClass={setNameErrClass}
                    description={description}
                    setDescription={setDescription}
                    descriptionErrClass={descriptionErrClass}
                    setDescriptionErrClass={setDescriptionErrClass}
                    setDataBlocks={setDataBlocks}
                    handleChangePage={handleChangePage}
                    handleAddSet={handleAddSet}
                    pages={pages}
                    resultData={resultData}
                />
            ) : currentPage === pages.CREATE_SET ? (
                <CreateDataSet
                    name={name}
                    setName={setName}
                    nameErrClass={nameErrClass}
                    setNameErrClass={setNameErrClass}
                    description={description}
                    setDescription={setDescription}
                    descriptionErrClass={descriptionErrClass}
                    setDescriptionErrClass={setDescriptionErrClass}
                    dataBlocks={dataBlocks}
                    setDataBlocks={setDataBlocks}
                    addDbErrClass={addDbErrClass}
                    setAddDbErrClass={setAddDbErrClass}
                    setCurrentPage={setCurrentPage}
                    handleChangePage={handleChangePage}
                    handleAddSet={handleAddSet}
                    pages={pages}
                    setShowDataSetActions={setShowDataSetActions}
                />
            ) : currentPage === pages.CREATE_BLOCK ? (
                <AddCustomBlock
                    startDatetime={startDatetime}
                    setStartDatetime={setStartDatetime}
                    endDatetime={endDatetime}
                    setEndDatetime={setEndDatetime}
                    startNanos={startNanos}
                    setStartNanos={setStartNanos}
                    endNanos={endNanos}
                    setEndNanos={setEndNanos}
                    dataBlocks={dataBlocks}
                    setDataBlocks={setDataBlocks}
                    pages={pages}
                    handleChangePage={handleChangePage}
                />
            ) : null}
        </Fragment>
    );
}

AddDatasetActions.propTypes = propTypes;
export default AddDatasetActions;
