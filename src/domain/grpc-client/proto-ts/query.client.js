// @generated by protobuf-ts 2.9.4 with parameter output_javascript_es2020
// @generated from protobuf file "query.proto" (package "dp.service.query", syntax proto3)
// tslint:disable
//
//
// query.proto
//
// Contains RPC messages and interface specific to the Query Service.
//
import { DpQueryService } from "./query";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
// 
// ------------------- RPC Interfaces ---------------------------
// 
/**
 *
 * The Query Service Interface
 *
 * Defines RPC operations for data and metadata queries.
 *
 * @generated from protobuf service dp.service.query.DpQueryService
 */
export class DpQueryServiceClient {
    constructor(_transport) {
        this._transport = _transport;
        this.typeName = DpQueryService.typeName;
        this.methods = DpQueryService.methods;
        this.options = DpQueryService.options;
    }
    /**
     *
     * queryData: Unary (non-streaming) time series data query.
     *
     * Client sends a single QueryDataRequest with the query parameters, and receives a single QueryDataResponse with the
     * query results. The response may indicate rejection, error in handling, no data matching query, or otherwise
     * contains the data matching the query specification.
     *
     * @generated from protobuf rpc: queryData(dp.service.query.QueryDataRequest) returns (dp.service.query.QueryDataResponse);
     */
    queryData(input, options) {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept("unary", this._transport, method, opt, input);
    }
    /**
     *
     * queryDataStream: Server-side streaming time series data query.
     *
     * Client sends a single QueryDataRequest with the query parameters, and receives a stream of QueryDataResponse
     * messages with the query results. The response may indicate rejection, error in handling, no data matching query,
     * or otherwise contains the data matching the query specification.  Results are sent in the response stream until
     * the MongoDB cursor for the query is exhausted, or an error is encountered in processing.
     *
     * The response stream is closed by the server in case of rejection, if there is an error in processing, or the
     * result cursor is exhausted.
     *
     * We expect this to be the best performing RPC for time series data query.
     *
     * @generated from protobuf rpc: queryDataStream(dp.service.query.QueryDataRequest) returns (stream dp.service.query.QueryDataResponse);
     */
    queryDataStream(input, options) {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept("serverStreaming", this._transport, method, opt, input);
    }
    /**
     *
     * queryDataBidiStream: Bidirectional streaming time series data query.
     *
     * Client sends a QueryDataRequest with the query parameters, and receives an initial QueryDataResponse message
     * with the query results.
     *
     * While the MongoDB cursor for the query result contains additional details, the client sends a QueryDataRequest
     * message with a CursorOperation payload to receive the next QueryDataResponse message in the stream.  This should
     * continue in a loop until the query result is exhausted.
     *
     * The server closes the response stream if a request is rejected, or when the result is exhausted or an error
     * is encountered.
     *
     * Each individual response may indicate rejection, error in handling, no data matching query, or otherwise
     * contains the data matching the query specification.
     *
     * @generated from protobuf rpc: queryDataBidiStream(stream dp.service.query.QueryDataRequest) returns (stream dp.service.query.QueryDataResponse);
     */
    queryDataBidiStream(options) {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept("duplex", this._transport, method, opt);
    }
    /**
     *
     * queryTable: Unary (non-streaming) time series data query with tabular result.
     *
     * This time series data query returns its result in a tabular format, for use by the Data Platform web application.
     * The client sends a single QueryTableRequest with the query parameters and receives a single QueryTableResponse.
     * The response content may indicate an exception in handling such as rejection, database error, no data matching
     * query, or otherwise contains the tabular data matching the query specification.
     *
     * @generated from protobuf rpc: queryTable(dp.service.query.QueryTableRequest) returns (dp.service.query.QueryTableResponse);
     */
    queryTable(input, options) {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept("unary", this._transport, method, opt, input);
    }
    /**
     *
     * queryMetadata: Unary (non-streaming) metadata query.
     *
     * This RPC is used by clients to learn about data sources (PVs/columns) available in the archive.  Client sends
     * a single QueryMetadataRequest with the query parameters, and receives a single QueryMetadataResponse
     * with the query results. The response may indicate rejection, error in handling, no data matching query, or
     * otherwise contains the data matching the query specification.
     *
     * @generated from protobuf rpc: queryMetadata(dp.service.query.QueryMetadataRequest) returns (dp.service.query.QueryMetadataResponse);
     */
    queryMetadata(input, options) {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept("unary", this._transport, method, opt, input);
    }
}
