import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { DpQueryServiceClient } from "./proto-ts/query.client";

const hostname = import.meta.env.VITE_QUERY_HOSTNAME;
const transport = new GrpcWebFetchTransport({
    baseUrl: `http://localhost:${hostname}`
})

const nano = 999000000

export default class DataPlatformApi {

    constructor() {
        console.log("DataPlatform(): hostname: " + hostname);
        this.client = new DpQueryServiceClient(transport);
    }

    handleStatus = (statusObj) => {
        if (statusObj.code !== 200 && statusObj.code !== "OK") {
            console.log("===================== error thrown =====================")
            console.error("Error Code: " + statusObj.code);
            return false;
        }
        return true;
    }

    handleExceptionalResult = (result) => {
        if (result.exceptionalResult) {
            console.error("Exceptional Result: " + response.result.exceptionalResult.message);
            return false;
        }
        return true;
    }

    queryData = async () => {
        const query = {
            request: {
                oneofKind: "querySpec",
                querySpec: {
                    beginTime: {
                        epochSeconds: 1698767462,
                        nanoseconds: 0
                    },
                    endTime: {
                        epochSeconds: 1698767462,
                        nanoseconds: 999000000
                    },
                    pvNames: ["dpTest_602"]
                }
            }
        }

        const { status, response } = await this.client.queryData(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        if (!this.handleExceptionalResult(result)) return;

        console.log(result.queryData);
    }

    queryMetadata = async () => {
        const pvNamesQuery = {
            querySpec: {
                pvNameSpec: {
                    oneofKind: "pvNameList",
                    pvNameList: {
                        pvNames: ["dpTest_601", "dpTest_602"]
                    }
                }
            }
        }

        const pvPatternQuery = {
            querySpec: {
                pvNameSpec: {
                    oneofKind: "pvNamePattern",
                    pvNamePattern: {
                        pattern: "^dpTest_"
                    }
                }
            }
        }

        const { status, response } = await this.client.queryMetadata(pvPatternQuery);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        if (!this.handleExceptionalResult(result)) return;

        console.log(result.metadataResult);
    }
}