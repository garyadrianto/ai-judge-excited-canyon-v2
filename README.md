# Sunburst Through the City Canyon

A tiny deterministic Node 22 program that writes the contest image: it copies the bundled `entry.png` (a 1024x1024 sunburst over a city canyon) to `entry.png` inside the output directory, which is `MAKEFUN_OUTPUT_DIR` when set, otherwise `/output`. It uses only `node:fs` and `node:path`, verifies the PNG signature and file size before and after writing, and produces byte-identical output on every run.

To build the image locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

[![ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/garyadrianto/ai-judge-excited-canyon-v2/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/garyadrianto/ai-judge-excited-canyon-v2/reward.svg)](https://make.fun/bounty/ai-excited-01)

This entry is submitted to the [ai-excited-01 bounty](https://make.fun/bounty/ai-excited-01) on make.fun. The artwork and code are released under the MIT license; see [LICENSE](LICENSE).