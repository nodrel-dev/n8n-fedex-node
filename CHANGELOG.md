# Changelog

## [0.1.4](https://github.com/nodrel-dev/n8n-fedex-node/compare/n8n-nodes-fedex-v0.1.3...n8n-nodes-fedex-v0.1.4) (2026-06-15)


### Features

* **credentials:** split into Track + Shipping OAuth2 types with credential tests ([#7](https://github.com/nodrel-dev/n8n-fedex-node/issues/7)) ([80234dd](https://github.com/nodrel-dev/n8n-fedex-node/commit/80234dd20d3ce27928da754cfc93da5d765519d8))
* harden label extraction and finalize docs/icons ([22b052d](https://github.com/nodrel-dev/n8n-fedex-node/commit/22b052dccce2de1070e622e902cbaf55fd08f5d2))
* implement four FedEx operations (Track, Validate, Get Rates, Create) ([a10314e](https://github.com/nodrel-dev/n8n-fedex-node/commit/a10314ebe778544e9525da9359d6e8f885cc86a7))


### Bug Fixes

* **credentials:** drop explicit OAuth scope (FedEx rejects scope=CXS) ([139dec0](https://github.com/nodrel-dev/n8n-fedex-node/commit/139dec045bc5c823b67eed5326329f83a3aa6bac))
* **deps:** override esbuild to &gt;=0.28.1 (GHSA-gv7w-rqvm-qjhr) ([0b31964](https://github.com/nodrel-dev/n8n-fedex-node/commit/0b31964ddea30ea226062ac316755cb317fd2363))
