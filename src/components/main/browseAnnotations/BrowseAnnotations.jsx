import { useState } from "react";
import AddAnnotationControl from "./addAnnotationControl/AddAnnotationControl";
import AnnotationActions from "./annotationActions/AnnotationActions";
import AnnotationResults from "./annotationResults/AnnotationResults";

function BrowseAnnotations() {
    const [resultData, setResultData] = useState();

    return (
        <div className="h-full flex flex-col">
            <AnnotationActions setResultData={setResultData} />
            <AnnotationResults resultData={resultData} />
            <AddAnnotationControl />
        </div>
    );
}

export default BrowseAnnotations;
