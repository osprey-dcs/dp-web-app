import BrowseAnnotations from "@/components/browseAnnotations/BrowseAnnotations";
import BrowseMetadata from "@/components/browseMetadata/BrowseMetadata";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import Header from "./components/header";
import Home from "./components/home";

function App() {
    return (
        <div
            className="w-screen h-screen flex flex-col items-center bg-muted/40 text-foreground"
            data-testid="app"
            id="app"
        >
            <Header />
            <div className="w-11/12 h-full">
                <Switch>
                    <Route path="/metadata" component={BrowseMetadata} />
                    <Route path="/annotations" component={BrowseAnnotations} />
                    <Route path="/saved-sets">sets</Route>
                    <Route path="/account">account</Route>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
            <Toaster />
        </div>
    );
}

export default App;
