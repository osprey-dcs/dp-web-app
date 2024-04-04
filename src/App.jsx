import { Route, Switch } from "wouter";
import Header from "./components/header";
import Home from "./components/home";
import { useEffect } from "react";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { DpQueryServiceClient } from "./domain/grpc-client/proto-ts/query.client";



function App() {

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-snow-bg text-main-text" data-testid="app">
            <Header />
            <div className="w-11/12 h-full g-red-200">
                <Switch>
                    <Route path="/saved-sets">sets</Route>
                    <Route path="/account">account</Route>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
