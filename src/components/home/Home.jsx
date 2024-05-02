import { useState } from "react";
import AddDatasetControl from "./addDatasetControl/AddDatasetControl";
import QueryActions from "@/components/home/queryActions/QueryActions";
import QueryResults from "@/components/home/queryResults/QueryResults";

function Home() {
    const [resultData, setResultData] = useState({})

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <QueryActions setResultData={setResultData} />
            <QueryResults resultData={resultData} />
            <AddDatasetControl resultData={resultData} />
        </div>
    );
}

export default Home;