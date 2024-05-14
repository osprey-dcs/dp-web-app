import QueryActions from "@/components/home/queryActions/QueryActions";
import { useState } from "react";

function BrowseMetadata() {
    const [resultData, setResultData] = useState({});

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <QueryActions setResultData={setResultData} useTimeRange={false} />
        </div>
    );
}

export default BrowseMetadata;
