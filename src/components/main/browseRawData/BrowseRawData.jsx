import QueryActions from "@/components/main/browseRawData/queryActions/QueryActions";
import QueryResults from "@/components/main/browseRawData/queryResults/QueryResults";
import { useState } from "react";
import AddDatasetControl from "./addDatasetControl/AddDatasetControl";

function BrowseRawData() {
    const [resultData, setResultData] = useState({});
    const [customSelection, setCustomSelection] = useState({});

    return (
        <div className="h-full flex flex-col" data-testid="browseRawData">
            <QueryActions setResultData={setResultData} useTimeRange={true} />
            <QueryResults
                resultData={resultData}
                setCustomSelection={setCustomSelection}
            />
            <AddDatasetControl
                resultData={resultData}
                customSelection={customSelection}
            />
        </div>
    );
}

export default BrowseRawData;
