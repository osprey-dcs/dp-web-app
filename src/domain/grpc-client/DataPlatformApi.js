import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { QueryMetadataRequest, QueryMetadataRequest_QuerySpec } from "./proto-ts/query";
import { DpQueryServiceClient } from "./proto-ts/query.client";

const hostname = import.meta.env.VITE_QUERY_HOSTNAME;
const transport = new GrpcWebFetchTransport({
    baseUrl: `http://localhost:${hostname}`
})

export default class DataPlatformApi {

    constructor() {
        console.log("DataPlatform(): hostname: " + hostname);
        this.client = new DpQueryServiceClient(transport);
    }

    queryMetadata = async () => {
        const queryMetadataRequest = {
            querySpec: {
                pvNameSpec: {
                    pvNameList: {
                        pvNames: ["dpTest_401"]
                    }
                }
            }
        }
        // new QueryMetadataRequest();
        // QueryMetadataRequest.QuerySpec = QueryMetadataRequest_QuerySpec;
        // QueryMetadataRequest.QuerySpec.PvNameList = ["dpTest_401"];
        console.log("querying")
        const { err, response } = await this.client.queryMetadata(queryMetadataRequest, {}, (err, response) => {
            if (err) {
                console.log("===================== error thrown =====================")
                console.log(err);
                return;
            }
            if (response === null) {
                console.log("===================== no response =====================");
                return;
            }
            console.log("====================== response! =====================")
            if (response.hasMetadataResult()) console.log(response.getMetadataResult());
            return;

        });
        if (err) {
            console.log("===================== error thrown =====================")
            console.log(err);
            return;
        }
        console.log(response);
    }
}

// const testApi = new DataPlatformApi();
// testApi.queryMetadata();