import { DpQueryServiceClient } from "./proto/query_grpc_web_pb"
import { QueryMetadataRequest } from "./proto/query_pb"

export default class DataPlatformApi {

    constructor() {
        const hostname = import.meta.env.VITE_QUERY_HOSTNAME;
        console.log("DataPlatform(): hostname: " + hostname);
        this.client = new DpQueryServiceClient(hostname, null, null);
    }

    queryMetadata() {
        let queryMetadataRequest = new QueryMetadataRequest();
        queryMetadataRequest.QuerySpec.PvNameList = ["dpTest_401"];

        this.client.queryMetadata(queryMetadataRequest, {}, (err, response) => {
            if (err) {
                console.log("===================== error thrown =====================")
                console.log(err);
                return;
            } else {
                if (response === null) {
                    console.log("===================== no response =====================");
                    return;
                }
                console.log(response);
                return;
            }
        });
    }
}

// const testApi = new DataPlatformApi();
// testApi.queryMetadata();