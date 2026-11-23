/**
 * Who may write to the dev answers endpoint. The dev server listens on the LAN and Caddy
 * proxies it on every interface, so a write is accepted only from this machine: a loopback
 * socket, loopback `X-Forwarded-For` entries and an `Origin` that is the dev site itself.
 */

export const ALLOWED_ORIGINS = [
  'http://agency.internal',
  'http://localhost:4300',
  'http://127.0.0.1:4300',
]

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1'])

export interface RequestFacts {
  remoteAddress: string | undefined
  forwardedFor: string | undefined
  origin: string | undefined
}

/** True for 127.0.0.1, ::1 and the IPv4-mapped form. */
export const isLoopback = (address: string | undefined): boolean =>
  address !== undefined && LOOPBACK.has(address.trim())

/** The reason a request is refused, or null when it may write. */
export function refusalReason({ remoteAddress, forwardedFor, origin }: RequestFacts): string | null {
  if (!isLoopback(remoteAddress)) return 'socket is not loopback'
  if (forwardedFor !== undefined && !forwardedFor.split(',').every(isLoopback)) {
    return 'X-Forwarded-For has a non-loopback entry'
  }
  if (origin !== undefined && !ALLOWED_ORIGINS.includes(origin)) return 'foreign Origin'
  return null
}
