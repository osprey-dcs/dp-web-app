import BrowseAnnotations from "@/components/main/browseAnnotations";
import BrowseMetadata from "@/components/main/browseMetadata";
import BrowseRawData from "@/components/main/browseRawData";
import Header from "@/components/main/header";
import PvSheet from "@/components/main/pvSheet";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import { PVsProvider } from "./PVsContext";

function Main() {
    // const pvs = usePVs();
    // console.log(pvs);

    return (
        <PVsProvider>
            <div
                className="w-screen h-screen flex flex-col items-center bg-muted/40 text-foreground"
                data-testid="app"
                id="app"
            >
                <Header />
                <div className="w-11/12 h-full">
                    <Switch>
                        <Route path="/metadata" component={BrowseMetadata} />
                        <Route
                            path="/annotations"
                            component={BrowseAnnotations}
                        />
                        <Route path="/saved-sets">sets</Route>
                        <Route path="/account">account</Route>
                        <Route path="/" component={BrowseRawData} />
                    </Switch>
                </div>
                <PvSheet />
                <Toaster />
            </div>
        </PVsProvider>
    );
}

let nextId = 0;

export default Main;
