import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { DpAnnotationServiceClient } from './proto-ts/annotation.client';
import { DpQueryServiceClient } from "./proto-ts/query.client";

const hostname = import.meta.env.VITE_QUERY_HOSTNAME;
const transport = new GrpcWebFetchTransport({
    baseUrl: `http://localhost:${hostname}`
})

export default class DataPlatformApi {

    constructor() {
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

        return result.metadataResult;
    }

    queryAnnotations = async (queryParams) => {
        const query = {
            criteria: []
        }

        for (let key in queryParams) {
            switch (key) {
                case "ownerId":
                    if (queryParams.ownerId === "") break;
                    query.criteria.push({
                        criterion: {
                            oneofKind: "ownerCriterion",
                            ownerCriterion: {
                                ownerId: queryParams.ownerId
                            }
                        }
                    })
                    break;
                case "comment":
                    if (queryParams.comment === "") break;
                    query.criteria.push({
                        criterion: {
                            oneofKind: "commentCriterion",
                            commentCriterion: {
                                commentText: queryParams.comment
                            }
                        }
                    })
            }
        }

        const { status, response } = await this.annotationClient.queryAnnotations(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        return result;
    }

    createAnnotation = async (queryParams) => {
        const query = {
            ownerId: queryParams.ownerId,
            dataSetId: queryParams.dataSetId,
            annotation: {
                oneofKind: "commentAnnotation",
                commentAnnotation: {
                    comment: queryParams.comment
                }
            }
        }

        const { status, response } = await this.annotationClient.createAnnotation(query)
        const result = response.result

        console.log(result);

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        return result;
    }

    createDataSet = async (setParams) => {
        const query = {
            dataSet: {
                name: setParams.name,
                ownerId: 100,
                description: setParams.description,
                dataBlocks: []
            }
        }

        for (let i = 0; i < setParams.dataBlocks.length; ++i) {
            const inputBlock = setParams.dataBlocks[i]
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

        const { status, response } = await this.annotationClient.createDataSet(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        return result;
    }

    exportDataSet = async (exportParams) => {
        const query = {
            dataSetId: exportParams.dataSetId,
            outputFormat: exportParams.outputFormat
        }
        console.log("QUERY")
        console.log(query)
        const { status, response } = await this.annotationClient.exportDataSet(query);
        const result = response.result;

        if (!this.handleStatus(status)) return;
        const exceptionalResult = this.handleExceptionalResult(result);
        if (!exceptionalResult.status) return exceptionalResult.message;

        return result;
    }
}