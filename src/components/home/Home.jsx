import { useState } from "react";

import QueryActions from "./queryactions/QueryActions";
import QueryResults from "./queryresults/QueryResults";

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