// @generated by protobuf-ts 2.9.3 with parameter output_javascript_es2020
// @generated from protobuf file "query.proto" (package "dp.service.query", syntax proto3)
// tslint:disable
//
//
// query.proto
//
// Contains RPC messages and interface specific to the Query Service.
//
// since: February, 2024
// version: 1.2.0
//
//
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { SamplingClock } from "./common";
import { DataValue } from "./common";
import { DataColumn } from "./common";
import { EventMetadata } from "./common";
import { Attribute } from "./common";
import { DataTimestamps } from "./common";
import { ExceptionalResult } from "./common";
import { Timestamp } from "./common";
/**
 *
 * Time Series Data Query Request.
 *
 * Describes the parameters for a time series data query.
 *
 * @generated from protobuf message dp.service.query.QueryDataRequest
 */
export interface QueryDataRequest {
    /**
     * @generated from protobuf oneof: request
     */
    request: {
        oneofKind: "querySpec";
        /**
         * @generated from protobuf field: dp.service.query.QueryDataRequest.QuerySpec querySpec = 1;
         */
        querySpec: QueryDataRequest_QuerySpec;
    } | {
        oneofKind: "cursorOp";
        /**
         * @generated from protobuf field: dp.service.query.QueryDataRequest.CursorOperation cursorOp = 2;
         */
        cursorOp: QueryDataRequest_CursorOperation;
    } | {
        oneofKind: undefined;
    };
}
/**
 *
 * Time Series Data Query Spec
 *
 * Payload used to specify query parameters for all time series data query RPC methods.
 *
 * @generated from protobuf message dp.service.query.QueryDataRequest.QuerySpec
 */
export interface QueryDataRequest_QuerySpec {
    /**
     * @generated from protobuf field: Timestamp beginTime = 1;
     */
    beginTime?: Timestamp;
    /**
     * @generated from protobuf field: Timestamp endTime = 2;
     */
    endTime?: Timestamp;
    /**
     * @generated from protobuf field: repeated string pvNames = 3;
     */
    pvNames: string[];
}
/**
 *
 * Cursor Operation used as payload in subsequent requests in queryDataBidiStream() after initial request containing
 * QuerySpec to request additional results beyond initial response.
 *
 * @generated from protobuf message dp.service.query.QueryDataRequest.CursorOperation
 */
export interface QueryDataRequest_CursorOperation {
    /**
     * @generated from protobuf field: dp.service.query.QueryDataRequest.CursorOperation.CursorOperationType cursorOperationType = 1;
     */
    cursorOperationType: QueryDataRequest_CursorOperation_CursorOperationType;
}
/**
 * @generated from protobuf enum dp.service.query.QueryDataRequest.CursorOperation.CursorOperationType
 */
export declare enum QueryDataRequest_CursorOperation_CursorOperationType {
    /**
     * Specifies that the next query response message should be sent.
     *
     * @generated from protobuf enum value: CURSOR_OP_NEXT = 0;
     */
    CURSOR_OP_NEXT = 0
}
/**
 *
 * Time Series Data Query Response.
 *
 * Contains results from a time series data query.  Used as single response to unary RPC methods, or as a stream in the
 * streaming RPC methods. Contains either ExceptionalResult indicating a problem handling the request, or the
 * data returned by the query.
 *
 * @generated from protobuf message dp.service.query.QueryDataResponse
 */
export interface QueryDataResponse {
    /**
     * @generated from protobuf field: Timestamp responseTime = 1;
     */
    responseTime?: Timestamp;
    /**
     * @generated from protobuf oneof: result
     */
    result: {
        oneofKind: "exceptionalResult";
        /**
         * @generated from protobuf field: ExceptionalResult exceptionalResult = 10;
         */
        exceptionalResult: ExceptionalResult;
    } | {
        oneofKind: "queryData";
        /**
         * @generated from protobuf field: dp.service.query.QueryDataResponse.QueryData queryData = 11;
         */
        queryData: QueryDataResponse_QueryData;
    } | {
        oneofKind: undefined;
    };
}
/**
 *
 * Time Series Query Result Data.
 *
 * Contains the data for a time series data query result, as a list of DataBucket objects.
 *
 * @generated from protobuf message dp.service.query.QueryDataResponse.QueryData
 */
export interface QueryDataResponse_QueryData {
    /**
     * @generated from protobuf field: repeated dp.service.query.QueryDataResponse.QueryData.DataBucket dataBuckets = 1;
     */
    dataBuckets: QueryDataResponse_QueryData_DataBucket[];
}
/**
 * @generated from protobuf message dp.service.query.QueryDataResponse.QueryData.DataBucket
 */
export interface QueryDataResponse_QueryData_DataBucket {
    /**
     * @generated from protobuf field: DataTimestamps dataTimestamps = 1;
     */
    dataTimestamps?: DataTimestamps;
    /**
     * @generated from protobuf field: repeated Attribute attributes = 2;
     */
    attributes: Attribute[];
    /**
     * @generated from protobuf field: EventMetadata eventMetadata = 3;
     */
    eventMetadata?: EventMetadata;
    /**
     * @generated from protobuf field: DataColumn dataColumn = 4;
     */
    dataColumn?: DataColumn;
}
/**
 *
 * Time Series Data Query With Tabular Result Format.
 *
 * Describes the parameters for a time series data query that returns data in a tabular format.
 *
 * @generated from protobuf message dp.service.query.QueryTableRequest
 */
export interface QueryTableRequest {
    /**
     * @generated from protobuf field: dp.service.query.QueryTableRequest.TableResultFormat format = 1;
     */
    format: QueryTableRequest_TableResultFormat;
    /**
     * @generated from protobuf field: Timestamp beginTime = 2;
     */
    beginTime?: Timestamp;
    /**
     * @generated from protobuf field: Timestamp endTime = 3;
     */
    endTime?: Timestamp;
    /**
     * @generated from protobuf oneof: pvNameSpec
     */
    pvNameSpec: {
        oneofKind: "pvNameList";
        /**
         * @generated from protobuf field: dp.service.query.PvNameList pvNameList = 11;
         */
        pvNameList: PvNameList;
    } | {
        oneofKind: "pvNamePattern";
        /**
         * @generated from protobuf field: dp.service.query.PvNamePattern pvNamePattern = 12;
         */
        pvNamePattern: PvNamePattern;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf enum dp.service.query.QueryTableRequest.TableResultFormat
 */
export declare enum QueryTableRequest_TableResultFormat {
    /**
     * default value if not explicitly set
     *
     * @generated from protobuf enum value: TABLE_FORMAT_ROW_MAP = 0;
     */
    TABLE_FORMAT_ROW_MAP = 0,
    /**
     * @generated from protobuf enum value: TABLE_FORMAT_COLUMN = 1;
     */
    TABLE_FORMAT_COLUMN = 1
}
/**
 *
 * Tabular Time Series Data Query Response.
 *
 * Contains results from a time series data query in a tabular format for use by the DP web application (and other similar
 * uses. Types of response and corresponding message payloads include:
 *
 * @generated from protobuf message dp.service.query.QueryTableResponse
 */
export interface QueryTableResponse {
    /**
     * @generated from protobuf field: Timestamp responseTime = 1;
     */
    responseTime?: Timestamp;
    /**
     * @generated from protobuf oneof: result
     */
    result: {
        oneofKind: "exceptionalResult";
        /**
         * @generated from protobuf field: ExceptionalResult exceptionalResult = 10;
         */
        exceptionalResult: ExceptionalResult;
    } | {
        oneofKind: "tableResult";
        /**
         * @generated from protobuf field: dp.service.query.QueryTableResponse.TableResult tableResult = 11;
         */
        tableResult: QueryTableResponse_TableResult;
    } | {
        oneofKind: undefined;
    };
}
/**
 *
 * Tabular Time Series Query Result Content.
 *
 * Contains the data for a time series data query result, in a tabular format.
 *
 * @generated from protobuf message dp.service.query.QueryTableResponse.TableResult
 */
export interface QueryTableResponse_TableResult {
    /**
     * @generated from protobuf oneof: tableResult
     */
    tableResult: {
        oneofKind: "columnTable";
        /**
         * @generated from protobuf field: dp.service.query.QueryTableResponse.ColumnTable columnTable = 1;
         */
        columnTable: QueryTableResponse_ColumnTable;
    } | {
        oneofKind: "rowMapTable";
        /**
         * @generated from protobuf field: dp.service.query.QueryTableResponse.RowMapTable rowMapTable = 2;
         */
        rowMapTable: QueryTableResponse_RowMapTable;
    } | {
        oneofKind: undefined;
    };
}
/**
 *
 * Column-oriented table result with list of columns.
 *
 * @generated from protobuf message dp.service.query.QueryTableResponse.ColumnTable
 */
export interface QueryTableResponse_ColumnTable {
    /**
     * @generated from protobuf field: DataTimestamps dataTimestamps = 1;
     */
    dataTimestamps?: DataTimestamps;
    /**
     * @generated from protobuf field: repeated DataColumn dataColumns = 2;
     */
    dataColumns: DataColumn[];
}
/**
 *
 * Row-oriented table result where each row is a map whose keys are the column names and values are the column values
 * for that row.
 *
 * @generated from protobuf message dp.service.query.QueryTableResponse.RowMapTable
 */
export interface QueryTableResponse_RowMapTable {
    /**
     * @generated from protobuf field: repeated string columnNames = 1;
     */
    columnNames: string[];
    /**
     * @generated from protobuf field: repeated dp.service.query.QueryTableResponse.RowMapTable.DataRow rows = 2;
     */
    rows: QueryTableResponse_RowMapTable_DataRow[];
}
/**
 * @generated from protobuf message dp.service.query.QueryTableResponse.RowMapTable.DataRow
 */
export interface QueryTableResponse_RowMapTable_DataRow {
    /**
     * @generated from protobuf field: map<string, DataValue> columnValues = 1;
     */
    columnValues: {
        [key: string]: DataValue;
    };
}
/**
 *
 * Metadata Query Request.
 *
 * Describes the parameters for a metadata query over available data sources in the archive.
 *
 * A request may contain one of two payloads, either a PvNameList with an explicit list of
 * column/PV names, or a regular expression pattern used to match against column/PV names.
 *
 * @generated from protobuf message dp.service.query.QueryMetadataRequest
 */
export interface QueryMetadataRequest {
    /**
     * @generated from protobuf oneof: pvNameSpec
     */
    pvNameSpec: {
        oneofKind: "pvNameList";
        /**
         * @generated from protobuf field: dp.service.query.PvNameList pvNameList = 1;
         */
        pvNameList: PvNameList;
    } | {
        oneofKind: "pvNamePattern";
        /**
         * @generated from protobuf field: dp.service.query.PvNamePattern pvNamePattern = 2;
         */
        pvNamePattern: PvNamePattern;
    } | {
        oneofKind: undefined;
    };
}
/**
 *
 * Metadata Query Response.
 *
 * Contains results from a metadata query. Types of response and corresponding message payloads include:
 *
 * @generated from protobuf message dp.service.query.QueryMetadataResponse
 */
export interface QueryMetadataResponse {
    /**
     * @generated from protobuf field: Timestamp responseTime = 1;
     */
    responseTime?: Timestamp;
    /**
     * @generated from protobuf oneof: result
     */
    result: {
        oneofKind: "exceptionalResult";
        /**
         * @generated from protobuf field: ExceptionalResult exceptionalResult = 10;
         */
        exceptionalResult: ExceptionalResult;
    } | {
        oneofKind: "metadataResult";
        /**
         * @generated from protobuf field: dp.service.query.QueryMetadataResponse.MetadataResult metadataResult = 11;
         */
        metadataResult: QueryMetadataResponse_MetadataResult;
    } | {
        oneofKind: undefined;
    };
}
/**
 *
 * Metadata Query Result Content.
 *
 * Contains a list of PvInfo metadata objects, one for each column/PV name matching the query specification.
 *
 * @generated from protobuf message dp.service.query.QueryMetadataResponse.MetadataResult
 */
export interface QueryMetadataResponse_MetadataResult {
    /**
     * @generated from protobuf field: repeated dp.service.query.QueryMetadataResponse.MetadataResult.PvInfo pvInfos = 1;
     */
    pvInfos: QueryMetadataResponse_MetadataResult_PvInfo[];
}
/**
 * @generated from protobuf message dp.service.query.QueryMetadataResponse.MetadataResult.PvInfo
 */
export interface QueryMetadataResponse_MetadataResult_PvInfo {
    /**
     * @generated from protobuf field: string pvName = 1;
     */
    pvName: string;
    /**
     * @generated from protobuf field: string lastBucketDataType = 2;
     */
    lastBucketDataType: string;
    /**
     * @generated from protobuf field: SamplingClock lastSamplingClock = 3;
     */
    lastSamplingClock?: SamplingClock;
    /**
     * @generated from protobuf field: Timestamp firstTimestamp = 4;
     */
    firstTimestamp?: Timestamp;
    /**
     * @generated from protobuf field: Timestamp lastTimestamp = 5;
     */
    lastTimestamp?: Timestamp;
}
/**
 * @generated from protobuf message dp.service.query.PvNameList
 */
export interface PvNameList {
    /**
     * @generated from protobuf field: repeated string pvNames = 1;
     */
    pvNames: string[];
}
/**
 * @generated from protobuf message dp.service.query.PvNamePattern
 */
export interface PvNamePattern {
    /**
     * @generated from protobuf field: string pattern = 1;
     */
    pattern: string;
}
declare class QueryDataRequest$Type extends MessageType<QueryDataRequest> {
    constructor();
    create(value?: PartialMessage<QueryDataRequest>): QueryDataRequest;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryDataRequest): QueryDataRequest;
    internalBinaryWrite(message: QueryDataRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryDataRequest
 */
export declare const QueryDataRequest: QueryDataRequest$Type;
declare class QueryDataRequest_QuerySpec$Type extends MessageType<QueryDataRequest_QuerySpec> {
    constructor();
    create(value?: PartialMessage<QueryDataRequest_QuerySpec>): QueryDataRequest_QuerySpec;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryDataRequest_QuerySpec): QueryDataRequest_QuerySpec;
    internalBinaryWrite(message: QueryDataRequest_QuerySpec, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryDataRequest.QuerySpec
 */
export declare const QueryDataRequest_QuerySpec: QueryDataRequest_QuerySpec$Type;
declare class QueryDataRequest_CursorOperation$Type extends MessageType<QueryDataRequest_CursorOperation> {
    constructor();
    create(value?: PartialMessage<QueryDataRequest_CursorOperation>): QueryDataRequest_CursorOperation;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryDataRequest_CursorOperation): QueryDataRequest_CursorOperation;
    internalBinaryWrite(message: QueryDataRequest_CursorOperation, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryDataRequest.CursorOperation
 */
export declare const QueryDataRequest_CursorOperation: QueryDataRequest_CursorOperation$Type;
declare class QueryDataResponse$Type extends MessageType<QueryDataResponse> {
    constructor();
    create(value?: PartialMessage<QueryDataResponse>): QueryDataResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryDataResponse): QueryDataResponse;
    internalBinaryWrite(message: QueryDataResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryDataResponse
 */
export declare const QueryDataResponse: QueryDataResponse$Type;
declare class QueryDataResponse_QueryData$Type extends MessageType<QueryDataResponse_QueryData> {
    constructor();
    create(value?: PartialMessage<QueryDataResponse_QueryData>): QueryDataResponse_QueryData;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryDataResponse_QueryData): QueryDataResponse_QueryData;
    internalBinaryWrite(message: QueryDataResponse_QueryData, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryDataResponse.QueryData
 */
export declare const QueryDataResponse_QueryData: QueryDataResponse_QueryData$Type;
declare class QueryDataResponse_QueryData_DataBucket$Type extends MessageType<QueryDataResponse_QueryData_DataBucket> {
    constructor();
    create(value?: PartialMessage<QueryDataResponse_QueryData_DataBucket>): QueryDataResponse_QueryData_DataBucket;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryDataResponse_QueryData_DataBucket): QueryDataResponse_QueryData_DataBucket;
    internalBinaryWrite(message: QueryDataResponse_QueryData_DataBucket, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryDataResponse.QueryData.DataBucket
 */
export declare const QueryDataResponse_QueryData_DataBucket: QueryDataResponse_QueryData_DataBucket$Type;
declare class QueryTableRequest$Type extends MessageType<QueryTableRequest> {
    constructor();
    create(value?: PartialMessage<QueryTableRequest>): QueryTableRequest;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryTableRequest): QueryTableRequest;
    internalBinaryWrite(message: QueryTableRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryTableRequest
 */
export declare const QueryTableRequest: QueryTableRequest$Type;
declare class QueryTableResponse$Type extends MessageType<QueryTableResponse> {
    constructor();
    create(value?: PartialMessage<QueryTableResponse>): QueryTableResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryTableResponse): QueryTableResponse;
    internalBinaryWrite(message: QueryTableResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryTableResponse
 */
export declare const QueryTableResponse: QueryTableResponse$Type;
declare class QueryTableResponse_TableResult$Type extends MessageType<QueryTableResponse_TableResult> {
    constructor();
    create(value?: PartialMessage<QueryTableResponse_TableResult>): QueryTableResponse_TableResult;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryTableResponse_TableResult): QueryTableResponse_TableResult;
    internalBinaryWrite(message: QueryTableResponse_TableResult, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryTableResponse.TableResult
 */
export declare const QueryTableResponse_TableResult: QueryTableResponse_TableResult$Type;
declare class QueryTableResponse_ColumnTable$Type extends MessageType<QueryTableResponse_ColumnTable> {
    constructor();
    create(value?: PartialMessage<QueryTableResponse_ColumnTable>): QueryTableResponse_ColumnTable;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryTableResponse_ColumnTable): QueryTableResponse_ColumnTable;
    internalBinaryWrite(message: QueryTableResponse_ColumnTable, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryTableResponse.ColumnTable
 */
export declare const QueryTableResponse_ColumnTable: QueryTableResponse_ColumnTable$Type;
declare class QueryTableResponse_RowMapTable$Type extends MessageType<QueryTableResponse_RowMapTable> {
    constructor();
    create(value?: PartialMessage<QueryTableResponse_RowMapTable>): QueryTableResponse_RowMapTable;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryTableResponse_RowMapTable): QueryTableResponse_RowMapTable;
    internalBinaryWrite(message: QueryTableResponse_RowMapTable, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryTableResponse.RowMapTable
 */
export declare const QueryTableResponse_RowMapTable: QueryTableResponse_RowMapTable$Type;
declare class QueryTableResponse_RowMapTable_DataRow$Type extends MessageType<QueryTableResponse_RowMapTable_DataRow> {
    constructor();
    create(value?: PartialMessage<QueryTableResponse_RowMapTable_DataRow>): QueryTableResponse_RowMapTable_DataRow;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryTableResponse_RowMapTable_DataRow): QueryTableResponse_RowMapTable_DataRow;
    private binaryReadMap1;
    internalBinaryWrite(message: QueryTableResponse_RowMapTable_DataRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryTableResponse.RowMapTable.DataRow
 */
export declare const QueryTableResponse_RowMapTable_DataRow: QueryTableResponse_RowMapTable_DataRow$Type;
declare class QueryMetadataRequest$Type extends MessageType<QueryMetadataRequest> {
    constructor();
    create(value?: PartialMessage<QueryMetadataRequest>): QueryMetadataRequest;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryMetadataRequest): QueryMetadataRequest;
    internalBinaryWrite(message: QueryMetadataRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryMetadataRequest
 */
export declare const QueryMetadataRequest: QueryMetadataRequest$Type;
declare class QueryMetadataResponse$Type extends MessageType<QueryMetadataResponse> {
    constructor();
    create(value?: PartialMessage<QueryMetadataResponse>): QueryMetadataResponse;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryMetadataResponse): QueryMetadataResponse;
    internalBinaryWrite(message: QueryMetadataResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryMetadataResponse
 */
export declare const QueryMetadataResponse: QueryMetadataResponse$Type;
declare class QueryMetadataResponse_MetadataResult$Type extends MessageType<QueryMetadataResponse_MetadataResult> {
    constructor();
    create(value?: PartialMessage<QueryMetadataResponse_MetadataResult>): QueryMetadataResponse_MetadataResult;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryMetadataResponse_MetadataResult): QueryMetadataResponse_MetadataResult;
    internalBinaryWrite(message: QueryMetadataResponse_MetadataResult, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryMetadataResponse.MetadataResult
 */
export declare const QueryMetadataResponse_MetadataResult: QueryMetadataResponse_MetadataResult$Type;
declare class QueryMetadataResponse_MetadataResult_PvInfo$Type extends MessageType<QueryMetadataResponse_MetadataResult_PvInfo> {
    constructor();
    create(value?: PartialMessage<QueryMetadataResponse_MetadataResult_PvInfo>): QueryMetadataResponse_MetadataResult_PvInfo;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: QueryMetadataResponse_MetadataResult_PvInfo): QueryMetadataResponse_MetadataResult_PvInfo;
    internalBinaryWrite(message: QueryMetadataResponse_MetadataResult_PvInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.QueryMetadataResponse.MetadataResult.PvInfo
 */
export declare const QueryMetadataResponse_MetadataResult_PvInfo: QueryMetadataResponse_MetadataResult_PvInfo$Type;
declare class PvNameList$Type extends MessageType<PvNameList> {
    constructor();
    create(value?: PartialMessage<PvNameList>): PvNameList;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PvNameList): PvNameList;
    internalBinaryWrite(message: PvNameList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.PvNameList
 */
export declare const PvNameList: PvNameList$Type;
declare class PvNamePattern$Type extends MessageType<PvNamePattern> {
    constructor();
    create(value?: PartialMessage<PvNamePattern>): PvNamePattern;
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PvNamePattern): PvNamePattern;
    internalBinaryWrite(message: PvNamePattern, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter;
}
/**
 * @generated MessageType for protobuf message dp.service.query.PvNamePattern
 */
export declare const PvNamePattern: PvNamePattern$Type;
/**
 * @generated ServiceType for protobuf service dp.service.query.DpQueryService
 */
export declare const DpQueryService: any;
export {};
