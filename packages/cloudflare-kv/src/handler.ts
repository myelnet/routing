import { encode } from "cborg";

declare const RECORDS: KVNamespace;

const MAX_RECORDS = 3;

function toPathComponents(path = ""): string[] {
  // split on / unless escaped with \
  return (path.trim().match(/([^\\^/]|\\\/)+/g) || []).filter(Boolean);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    return new Response(null, {
      headers: corsHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const segs = toPathComponents(url.pathname);

  // anything after the next / should be ignored
  const key = segs[0];
  if (!key) {
    return fetch(request);
  }

  switch (request.method) {
    case "PUT":
      if (request.body) {
        return putRecord(key, request.body);
      }
      return fetch(request);
    case "GET":
      return findRecord(key);
    case "DELETE":
      return deleteRecord(key);
    case "OPTIONS":
      return handleOptions(request);
    default:
      return fetch(request);
  }
}

export async function putRecord(
  key: string,
  data: ReadableStream
): Promise<Response> {
  await RECORDS.put(key, data);
  return new Response(key);
}

export async function findRecord(key: string): Promise<Response> {
  const { keys } = await RECORDS.list({ prefix: key });
  const results: ArrayBuffer[] = [];
  for (const k of keys) {
    const rec = await RECORDS.get(k.name, { type: "arrayBuffer" });
    if (rec && results.length <= MAX_RECORDS) {
      results.push(rec);
    }
  }
  return new Response(encode(results), {
    headers: corsHeaders,
  });
}

export async function deleteRecord(key: string): Promise<Response> {
  // TODO: verify signature
  await RECORDS.delete(key);
  return new Response(key);
}
