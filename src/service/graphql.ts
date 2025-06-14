/**
 * created by: @SamSam1701
 * description: GraphQL client example with request and response middleware
 */

import {
  GraphQLClient,
  RequestMiddleware,
  ResponseMiddleware,
} from "graphql-request";

const endpoint = `https://api.spacex.land/graphql/`;

const getAccessToken = () => Promise.resolve(`some special token here`);

{
  /**
   * Request middleware example (set actual auth token to each request):
   */

  const requestMiddleware: RequestMiddleware = async (request) => {
    return {
      ...request,
      headers: {
        ...request.headers,
        "x-auth-token": await getAccessToken(),
      },
    };
  };

  const _client = new GraphQLClient(endpoint, { requestMiddleware });
}
{
  /**
   * It's also possible to use an async function as a request middleware. The resolved data will be passed to the request:
   */

  const requestMiddleware: RequestMiddleware = async (request) => {
    const token = await getAccessToken();
    return {
      ...request,
      headers: { ...request.headers, "x-auth-token": token },
    };
  };

  const _client = new GraphQLClient(endpoint, { requestMiddleware });
}
{
  /**
   * Response middleware example (log request trace id if error caused):
   */

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

  const _client = new GraphQLClient(endpoint, { responseMiddleware });
}
