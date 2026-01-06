import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const repoRoot = join(__dirname, '..')
const cacheFile = join(repoRoot, '.cache', 'browserslist-update.json')

const intervalDaysRaw =
  process.env.BROWSERSLIST_UPDATE_INTERVAL_DAYS ?? process.env.BROWSERSLIST_UPDATE_DAYS ?? '60'
const intervalDays = Number.parseInt(intervalDaysRaw, 10)
const intervalMs = (Number.isFinite(intervalDays) ? intervalDays : 60) * 24 * 60 * 60 * 1000

const skip =
  process.env.SKIP_BROWSERSLIST_UPDATE === '1' || process.env.SKIP_BROWSERSLIST_UPDATE === 'true'
const force =
  process.env.FORCE_BROWSERSLIST_UPDATE === '1' || process.env.FORCE_BROWSERSLIST_UPDATE === 'true'
const isCI = Boolean(process.env.CI)

if (skip) process.exit(0)
if (isCI && !force) process.exit(0)

let lastRunMs = 0
if (existsSync(cacheFile)) {
  try {
    const raw = readFileSync(cacheFile, 'utf8')
    const json = JSON.parse(raw)
    lastRunMs = Date.parse(json?.lastRun ?? '')
    if (!Number.isFinite(lastRunMs)) lastRunMs = 0
  } catch {
    lastRunMs = 0
  }
}

const now = Date.now()
const isStale = force || lastRunMs === 0 || now - lastRunMs >= intervalMs

if (!isStale) process.exit(0)

const lastRunLabel = lastRunMs ? new Date(lastRunMs).toISOString() : 'never'
// eslint-disable-next-line no-console
console.log(
  `[browserslist] Updating caniuse-lite via update-browserslist-db (lastRun=${lastRunLabel}, intervalDays=${intervalDays})`,
)

const res = spawnSync('npx', ['--yes', 'update-browserslist-db@latest'], {
  cwd: repoRoot,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

if ((res.status ?? 1) !== 0) process.exit(res.status ?? 1)

mkdirSync(dirname(cacheFile), { recursive: true })
writeFileSync(
  cacheFile,
  JSON.stringify({ lastRun: new Date().toISOString(), intervalDays }, null, 2) + '\n',
  'utf8',
)
