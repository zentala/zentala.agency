# archive/ — martwy kod, zachowany, nie budowany

## `solid-chat/` + `Chatbot.astro` — zarchiwizowane 2026-08-26

Pierwsza, nigdy nieukończona wersja czatu na stronie: widget wywodzący się z
Flowise (SolidJS), przeniesiony tu z `src/components/`.

**Dlaczego zniknął z `src/`:** nie był podpięty do niczego (`Chatbot.astro` nie
był importowany przez żadną stronę), a `solid-js` nie ma w `package.json` w
ogóle — więc każdy plik `.tsx` z tego katalogu typował JSX pod React i sypał
błędami. Dawał **274 z 276 błędów** `astro check`, przez co `npm run build`
(`astro check && astro build`) padał, a **deploy na GitHub Pages był czerwony od
2026-08-05** — trzy kolejne pushe nie trafiły na produkcję. Strona żyła ze
starego builda.

Zastąpiony przez czat huba, osadzany jednym `<script>` w
`src/layouts/Layout.astro`. Instrukcja wdrożenia i customizacji:
`hub/embed/README.md` w repo `cloudflare`
(`int://mATX.lan/C:/code/cloudflare/hub/embed/README.md`).

Nic tu nie jest usunięte — katalog leży poza `src/`, więc `tsconfig.json`
(`include: ["src"]`) go nie widzi i Astro go nie buduje. Przywrócenie to
`git mv archive/solid-chat src/components/solid-chat` plus dodanie `solid-js`
do zależności.
