import BrowseAnnotations from "@/components/main/browseAnnotations";
import BrowseDataSets from "@/components/main/browseDataSets";
import DataSetPage from "@/components/main/browseDataSets/dataSetResults/dataSetPage/DataSetPage";
import BrowseMetadata from "@/components/main/browseMetadata";
import BrowseRawData from "@/components/main/browseRawData";
import Header from "@/components/main/header";
import PvSheet from "@/components/main/pvSheet";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import { GlobalStateProvider } from "./GlobalState";
import { PVsProvider } from "./PVsContext";
import { ResultDataProvider } from "./ResultDataContext";

function Main() {
    return (
        <GlobalStateProvider>
            <ResultDataProvider>
                <PVsProvider>
                    <div
                        className="w-screen h-screen flex flex-col items-center bg-muted/40 text-foreground"
                        data-testid="app"
                        id="app"
                    >
                        <Header />
                        <div className="w-11/12 h-full">
                            <Switch>
                                <Route
                                    path="/browse/metadata"
                                    component={BrowseMetadata}
                                />
                                <Route
                                    path="/browse/annotations"
                                    component={BrowseAnnotations}
                                />
                                <Route path="/browse/saved-sets">sets</Route>
                                <Route
                                    path="/browse/data-sets"
                                    component={BrowseDataSets}
                                />
                                <Route path="/account">account</Route>
                                <Route path="/" component={BrowseRawData} />
                                <Route
                                    path="/view/data-set/:id"
                                    component={DataSetPage}
                                />
                            </Switch>
                        </div>
                        <PvSheet />
                        <Toaster />
                    </div>
                </PVsProvider>
            </ResultDataProvider>
        </GlobalStateProvider>
    );
}

let nextId = 0;

export default Main;
