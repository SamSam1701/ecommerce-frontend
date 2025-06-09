/**
 * description: GraphQL client example with request and response middleware
 */

import {
  GraphQLClient,
  RequestMiddleware,
  ResponseMiddleware,
} from "graphql-request";

import Cookies from "js-cookie";

// This middleware adds an authentication token to the request headers
const requestMiddleware: RequestMiddleware = async (request) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: "Bearer " + Cookies.get("token") || "",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };
};

// This middleware adds an authentication token to the request headers
const responseMiddleware: ResponseMiddleware = (response) => {
  if (!(response instanceof Error) && response.errors) {
    const traceId = response.headers.get(`x-b3-trace-id`) || `unknown`;
    console.error(
      `[${traceId}] Request error:
      status ${String(response.status)}
      details: ${response.errors.map((_) => _.message).join(`, `)}`
    );
  }
};

const graphQLClient = new GraphQLClient(`${process.env.PUBLIC_API_GRAPHQL}`, {
  requestMiddleware,
  responseMiddleware,
  errorPolicy: "all",
});

export default graphQLClient; // GraphQL client with request and response middleware
