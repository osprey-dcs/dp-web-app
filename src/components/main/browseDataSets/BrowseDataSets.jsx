import { useState } from "react";
import DataSetActions from "./dataSetActions";
import DataSetResults from "./dataSetResults/DataSetResults";

function BrowseDataSets() {
    const [resultData, setResultData] = useState({});

    return (
        <div className="h-full flex flex-col" data-testid="browseDataSets">
            <DataSetActions setResultData={setResultData} />
            <DataSetResults resultData={resultData} />
        </div>
    );
}

export default BrowseDataSets;
