# Changelog

## [0.2.3](https://github.com/nodrel-dev/n8n-fedex-node/compare/0.2.2...0.2.3) (2026-06-19)


### Features

* group optional shipping inputs under Additional Fields ([#21](https://github.com/nodrel-dev/n8n-fedex-node/issues/21)) ([d40a617](https://github.com/nodrel-dev/n8n-fedex-node/commit/d40a6178bc681ef0dafd3118e9c70613bcf00315))


### Bug Fixes

* clarify FedEx credential setup with key-mapping notice ([#19](https://github.com/nodrel-dev/n8n-fedex-node/issues/19)) ([37acc28](https://github.com/nodrel-dev/n8n-fedex-node/commit/37acc282e7988d777ab96a5fd6e4dc6503079837))

## [0.2.2](https://github.com/nodrel-dev/n8n-fedex-node/compare/0.2.1...0.2.2) (2026-06-16)


### Bug Fixes

* correct codex node identifier and category for registry approval ([#13](https://github.com/nodrel-dev/n8n-fedex-node/issues/13)) ([e8d7921](https://github.com/nodrel-dev/n8n-fedex-node/commit/e8d7921a37352649e8e760e14227ee70ded7b683))

## [0.2.1](https://github.com/nodrel-dev/n8n-fedex-node/compare/0.2.0...0.2.1) (2026-06-15)


### Bug Fixes

* correct placeholder doc URLs in node metadata ([8e4907f](https://github.com/nodrel-dev/n8n-fedex-node/commit/8e4907f9cbcf3026ca3d3a25acebbc4496b7552c))
* resolve credentials via hidden authentication param for AI-Agent tool use ([#12](https://github.com/nodrel-dev/n8n-fedex-node/issues/12)) ([4d2de0b](https://github.com/nodrel-dev/n8n-fedex-node/commit/4d2de0b7ea892b16d31d1e82a1818e68752de36b))

## [0.2.0](https://github.com/nodrel-dev/n8n-fedex-node/compare/0.1.5...0.2.0) (2026-06-15)


### ⚠ BREAKING CHANGES

* the node's resource values changed from shipment/address to tracking/shipping; workflows pinned to the old values must reselect.

### Features

* regroup node resources to mirror FedEx projects (Tracking, Shipping) ([8ce08e6](https://github.com/nodrel-dev/n8n-fedex-node/commit/8ce08e6b6d9522db9bf930f7617847afaf4af6d7))


### Bug Fixes

* drop incremental compilation to prevent stale dist builds ([ad53eca](https://github.com/nodrel-dev/n8n-fedex-node/commit/ad53eca47276b79d0470855f454ed91142bdc633))

## [0.1.5](https://github.com/nodrel-dev/n8n-fedex-node/compare/0.1.4...0.1.5) (2026-06-15)


### Bug Fixes

* keep tsconfig.tsbuildinfo out of the published tarball ([bea835d](https://github.com/nodrel-dev/n8n-fedex-node/commit/bea835dfba4d38099261f52555ac1c2262294859))

## [0.1.4](https://github.com/nodrel-dev/n8n-fedex-node/compare/n8n-nodes-fedex-v0.1.3...n8n-nodes-fedex-v0.1.4) (2026-06-15)


### Features

* **credentials:** split into Track + Shipping OAuth2 types with credential tests ([#7](https://github.com/nodrel-dev/n8n-fedex-node/issues/7)) ([80234dd](https://github.com/nodrel-dev/n8n-fedex-node/commit/80234dd20d3ce27928da754cfc93da5d765519d8))
* harden label extraction and finalize docs/icons ([22b052d](https://github.com/nodrel-dev/n8n-fedex-node/commit/22b052dccce2de1070e622e902cbaf55fd08f5d2))
* implement four FedEx operations (Track, Validate, Get Rates, Create) ([a10314e](https://github.com/nodrel-dev/n8n-fedex-node/commit/a10314ebe778544e9525da9359d6e8f885cc86a7))


### Bug Fixes

* **credentials:** drop explicit OAuth scope (FedEx rejects scope=CXS) ([139dec0](https://github.com/nodrel-dev/n8n-fedex-node/commit/139dec045bc5c823b67eed5326329f83a3aa6bac))
* **deps:** override esbuild to &gt;=0.28.1 (GHSA-gv7w-rqvm-qjhr) ([0b31964](https://github.com/nodrel-dev/n8n-fedex-node/commit/0b31964ddea30ea226062ac316755cb317fd2363))
