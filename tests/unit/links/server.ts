/** Local HTTP server for link-check tests: no external network is touched. */
import { createServer, type Server, type ServerResponse } from 'node:http'
import type { AddressInfo } from 'node:net'

export interface TestServer {
  origin: string
  /** Requests seen, as "METHOD /path". */
  requests: string[]
  close: () => Promise<void>
}

/** Routes: /ok 200, /redirect 301 to /ok, /notfound 404, /gone 410, /forbidden 403, /linkedin 999, /boom 500, /nohead (HEAD 405, GET 200), /hang. */
export async function startTestServer(): Promise<TestServer> {
  const requests: string[] = []
  const hanging = new Set<ServerResponse>()
  const server: Server = createServer((req, res) => {
    requests.push(`${req.method} ${req.url}`)
    const send = (status: number, headers: Record<string, string> = {}) => {
      res.writeHead(status, headers)
      res.end(req.method === 'HEAD' ? undefined : 'body')
    }
    const path = (req.url ?? '').split('?')[0]
    switch (path) {
      case '/ok':
        return send(200)
      case '/redirect':
        return send(301, { location: '/ok' })
      case '/notfound':
        return send(404)
      case '/gone':
        return send(410)
      case '/forbidden':
        return send(403)
      case '/linkedin':
        return send(999)
      case '/boom':
        return send(500)
      case '/nohead':
        return send(req.method === 'HEAD' ? 405 : 200)
      case '/hang':
        hanging.add(res)
        return undefined
      default:
        return send(404)
    }
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address() as AddressInfo
  return {
    origin: `http://127.0.0.1:${port}`,
    requests,
    close: () =>
      new Promise((resolve) => {
        hanging.forEach((res) => res.destroy())
        server.closeAllConnections()
        server.close(() => resolve())
      }),
  }
}

/** An origin nothing listens on: connections are refused. */
export async function closedPortOrigin(): Promise<string> {
  const server = await startTestServer()
  const origin = server.origin
  await server.close()
  return origin
}
