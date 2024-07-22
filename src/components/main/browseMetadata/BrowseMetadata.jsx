import QueryActions from "@/components/main/browseRawData/queryActions/QueryActions";
import { useState } from "react";
import MetadataResults from "./metadataResults/MetadataResults";

function BrowseMetadata() {
    const [resultData, setResultData] = useState({});

    return (
        <div className="h-full flex flex-col">
            <QueryActions setResultData={setResultData} useTimeRange={false} />
            <MetadataResults resultData={resultData} />
        </div>
    );
}

export default BrowseMetadata;
