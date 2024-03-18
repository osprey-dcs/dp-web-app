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
                    oneofKind: "pvNameList",
                    pvNameList: {
                        pvNames: ["dpTest_601", "dpTest_602"]
                    }
                }
            }
        }
        // new QueryMetadataRequest();
        // QueryMetadataRequest.QuerySpec = QueryMetadataRequest_QuerySpec;
        // QueryMetadataRequest.QuerySpec.PvNameList = ["dpTest_401"];
        const { status, response } = await this.client.queryMetadata(queryMetadataRequest, {});
        const result = response.result;

        if (status.code !== 200 && status.code !== "OK") {
            console.log("===================== error thrown =====================")
            console.error("Error Code: " + status.code);
            return;
        }
        console.log(result);
        if (result.exceptionalResult) {
            console.error("Exceptional Result: " + response.result.exceptionalResult.message);
        }
    }
}

// const testApi = new DataPlatformApi();
// testApi.queryMetadata();