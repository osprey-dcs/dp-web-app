import { Route, Switch } from "wouter";
import Header from "./components/header";
import Home from "./components/home";
import { useEffect } from "react";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { DpQueryServiceClient } from "./domain/grpc-client/proto-ts/query.client";



function App() {
    // let isConnecting = false;
    // useEffect(() => {

    //     const connectClient = async () => {
    //         const transport = new GrpcWebFetchTransport({
    //             baseUrl: `http://localhost:8080`
    //         })

    //         let client = new DpQueryServiceClient(transport);

    //         const query = {
    //             QuerySpec: {
    //                 PvNameList: ["dpTest_401"]
    //             }
    //         }

    //         let { response } = client.queryMetadata(query, {});
    //         console.log("response: " + response);
    //     }

    //     if (isConnecting) return;
    //     isConnecting = true;
    //     connectClient().catch(console.error);
    // }, [])

    return (
        <div className="w-screen h-screen bg-[#FEFFFE] flex flex-col items-center" data-testid="app">
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
