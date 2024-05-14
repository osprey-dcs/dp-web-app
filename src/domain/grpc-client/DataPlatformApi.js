import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { DpAnnotationServiceClient } from './proto-ts/annotation.client';
import { DpQueryServiceClient } from "./proto-ts/query.client";

const hostname = import.meta.env.VITE_QUERY_HOSTNAME;
const transport = new GrpcWebFetchTransport({
    baseUrl: `http://localhost:${hostname}`
})

export default class DataPlatformApi {

    constructor() {
        console.log("DataPlatform(): hostname: " + hostname);
        this.queryClient = new DpQueryServiceClient(transport);
        this.annotationClient = new DpAnnotationServiceClient(transport);
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
            return { status: false, message: result.exceptionalResult.message };
        }
        return { status: true };
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

        const { status, response } = await this.queryClient.queryTable(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        return result.tableResult;
    }

    queryMetadata = async (queryParams) => {
        const query = {}
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

        const { status, response } = await this.queryClient.queryMetadata(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        console.log(result.metadataResult);

        return result.metadataResult;
    }

    createDataSet = async (queryParams) => {
        const query = {
            dataSet: {
                description: queryParams.description,
                dataBlocks: []
            }
        }

        for (let i = 0; i < queryParams.dataBlocks.length; ++i) {
            const inputBlock = queryParams.dataBlocks[i]
            const queryBlock = {
                beginTime: {
                    epochSeconds: inputBlock.startEpochs,
                    nanoseconds: inputBlock.startNanos
                },
                endTime: {
                    epochSeconds: inputBlock.endEpochs,
                    nanoseconds: inputBlock.endNanos
                },
                pvNames: inputBlock.pvNames
            }
            query.dataSet.dataBlocks.push(queryBlock);
        }
        console.log("QUERY");
        console.log(query);
        const { status, response } = await this.annotationClient.createDataSet(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        return result;
    }
}