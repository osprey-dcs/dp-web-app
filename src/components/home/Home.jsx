import QueryActions from "@/components/home/queryActions/QueryActions";
import QueryResults from "@/components/home/queryResults/QueryResults";
import { useState } from "react";
import AddDatasetControl from "./addDatasetControl/AddDatasetControl";

function Home() {
    const [resultData, setResultData] = useState({});
    const [customSelection, setCustomSelection] = useState({});

    return (
        <div className="h-full flex flex-col" data-testid="home">
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

export default Home;
