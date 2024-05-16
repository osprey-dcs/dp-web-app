import { useState } from "react";
import AnnotationActions from "./annotationActions/AnnotationActions";
import AnnotationResults from "./annotationResults/AnnotationResults";

function BrowseAnnotations() {
    const [resultData, setResultData] = useState();

    return (
        <div className="h-full flex flex-col" data-testid="home">
            <AnnotationActions setResultData={setResultData} />
            <AnnotationResults resultData={resultData} />
        </div>
    );
}

export default BrowseAnnotations;
