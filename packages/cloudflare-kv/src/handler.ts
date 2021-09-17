import { encode } from 'cborg'

declare const RECORDS: KVNamespace

const MAX_RECORDS = 3

function toPathComponents(path = ''): string[] {
  // split on / unless escaped with \
  return (path.trim().match(/([^\\^/]|\\\/)+/g) || []).filter(Boolean)
}

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)

  const segs = toPathComponents(url.pathname)

  // anything after the next / should be ignored
  const key = segs[0]
  if (!key) {
    return fetch(request)
  }

  switch (request.method) {
    case 'PUT':
      if (request.body) {
        return putRecord(key, request.body)
      }
      return fetch(request)
    case 'GET':
      return findRecord(key)
    case 'DELETE':
      return deleteRecord(key)
    default:
      return fetch(request)
  }
}

export async function putRecord(
  key: string,
  data: ReadableStream,
): Promise<Response> {
  await RECORDS.put(key, data)
  return new Response(key)
}

export async function findRecord(key: string): Promise<Response> {
  const { keys } = await RECORDS.list({ prefix: key })
  const results: ArrayBuffer[] = []
  for (const k of keys) {
    const rec = await RECORDS.get(k.name, { type: 'arrayBuffer' })
    if (rec && results.length <= MAX_RECORDS) {
      results.push(rec)
    }
  }
  return new Response(encode(results))
}

export async function deleteRecord(key: string): Promise<Response> {
  // TODO: verify signature
  await RECORDS.delete(key)
  return new Response(key)
}
