import { useState } from "react";

import QueryActions from "@/components/home/queryactions/QueryActions";
import QueryResults from "@/components/home/queryresults/QueryResults";

function Home() {
    const [resultData, setResultData] = useState({})

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <QueryActions setResultData={setResultData} />
            {/* <main className="flex-grow"> */}
            <QueryResults resultData={resultData} />
            {/* </main> */}
        </div>
    );
}

export default Home;