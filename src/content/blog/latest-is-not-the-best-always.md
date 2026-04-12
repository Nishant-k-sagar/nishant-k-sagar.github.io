---
title: "The latest isn’t necessarily the best"
date: "2026-04-12"
tags: ["dev", "workflow", "dependencies"]
status: "published"
excerpt: "We often assume that the latest release is the best release but that is not the case always."
featured: true
---

We often assume that the latest release is the best release but that is not the case always. Not in the development world at least. The latest releases serves new and exciting features, they bring new APIs, new endpoints, new functions and functionalities, yet They are not the best. Neither they are adapted as soon as they are released in the development space.

Old versions run the show long time. The versions which comes with long term support are adapted. 

## Versions and notions

Widely used notion for versioning is semver(Semantic Versioning). 
Semver has three components: MAJOR.MINOR.PATCH. 
For example : 1.0.0. 

Major version represents breaking changes, APIs changes, things may stop working. 
Minor version represents features,backward compatible. 
Patch version represents bug fixes and safe updates, very small changes. 

## SemVer and Tags

While the versions can be represented using the semver, yet more information is added in the form of tags. 
Some common tags are : 

- `latest' : latest release with latest features and changes, but not battle tested, will be improved over time
- `stable` : stable release, well tested and ready for production
- `beta` : beta release, features are ready but not tested enough for production, testing by early users.
- `alpha` : very early release, experimental features, not tested at all, highly unstable
- `rc` : release candidate(almost final), features are ready and tested, but not released yet, just needs final validation
- `lts` : long term support, stable release with long term support, generally adapted in production
- `nightly/canary` : latest development release(or say day to day/kinda live), not tested at all, highly unstable

## Other type of versioning notions

Although semver is widely used, there are other type of versioning notions as well.

- custom major and minor representation
- date based versioning (for ex. 2026.4.12)

## What is the best version?

It totally depends on the use case, If you are trying to pick up the latest features and changes, then latest is the best version. If you are trying to pick up the stable release, then stable is the best version.

For production and long term maintaining, lts is the best version.

## What is the best version for me?

If you are working on some personal project or portfolio, you can go with the latest version, yet You have to be careful as soon as any breaking changes are introduced, you have to update your project.

Generally picking up the latest LTS versions is a good idea. That provides a good long term stability and features as well. Not going to break with any minor updates. 

I will add more about the versioning, tags and other symbolisms asap.

Keep visiting!
