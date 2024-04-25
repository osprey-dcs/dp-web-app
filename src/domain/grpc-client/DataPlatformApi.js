import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
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
            console.error("ERROR: Exceptional Result. " + result.exceptionalResult.message);
            return false;
        }
        return true;
    }

    queryDataTable = async (queryParams) => {
        const query = {
            format: 0,
            beginTime: {
                epochSeconds: queryParams.startEpochs,
                nanoseconds: queryParams.startNanos
            },
            endTime: {
                epochSeconds: queryParams.endEpochs,
                nanoseconds: queryParams.endNanos
            },
            // pvNameSpec: {
            // oneofKind: "pvNameList",
            // pvNameList: {
            //     pvNames: queryParams.pvNames
            // }
            // }

        }

        if (queryParams.useRegex) {
            query.pvNameSpec = {
                oneofKind: "pvNamePattern",
                pvNamePattern: {
                    pattern: queryParams.regexPattern
                }
            }
        } else {
            query.pvNameSpec = {
                oneofKind: "pvNameList",
                pvNameList: {
                    pvNames: queryParams.pvNames
                }
            }
        }
        console.log(query)

        const oldQuery = {
            request: {
                oneofKind: "querySpec",
                querySpec: {
                    beginTime: {
                        epochSeconds: queryParams.startEpochs,
                        nanoseconds: queryParams.startNanos
                    },
                    endTime: {
                        epochSeconds: queryParams.endEpochs,
                        nanoseconds: queryParams.endNanos
                    },
                    pvNames: queryParams.pvNames
                }
            }
        }

        const { status, response } = await this.client.queryTable(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        if (!this.handleExceptionalResult(result)) return;

        console.log(result.tableResult);
        return result.tableResult;
    }

    queryMetadata = async (queryParams) => {
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