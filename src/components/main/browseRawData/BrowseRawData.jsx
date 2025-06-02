import QueryActions from "@/components/main/browseRawData/queryActions/QueryActions";
import QueryResults from "@/components/main/browseRawData/queryResults/QueryResults";
import { useState } from "react";

function BrowseRawData() {
    const [resultData, setResultData] = useState({});

    return (
        <div className="h-full flex flex-col" data-testid="browseRawData">
            <QueryActions setResultData={setResultData} useTimeRange={true} />
            <QueryResults resultData={resultData} />
            {/* <AddDatasetControl resultData={resultData} /> */}
        </div>
    );
}

export default BrowseRawData;
