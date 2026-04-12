---
title: "The latest isn’t necessarily the best"
date: "2026-04-12"
tags: ["dev", "workflow", "dependencies"]
status: "published"
excerpt: "We often assume that the latest release is the best release, but that is not always the case."
featured: true
---

We often assume that the latest release is the best release, but that is not always the case, at least not in the development world. The latest releases serve new and exciting features: they bring new APIs, new endpoints, new functions, and new functionalities. Yet, they are not always the best. Nor are they adopted as soon as they are released in the development space. Old versions run the show for a long time. The versions that come with long-term support are adopted.

## Versions and notions

A widely used notion for versioning is **semver** (Semantic Versioning). Semver has three components: **MAJOR.MINOR.PATCH**.  
For example: `1.0.0`.

- **Major version** represents breaking changes, API changes—things may stop working.  
- **Minor version** represents new features, backward compatible.  
- **Patch version** represents bug fixes and safe updates, very small changes.

## SemVer and Tags

While versions can be represented using semver, more information is often added in the form of tags. Some common tags are:

- `latest`: latest release with new features and changes, but not battle-tested; will be improved over time  
- `stable`: stable release, well-tested and ready for production  
- `beta`: beta release; features are ready but not tested enough for production; tested by early users  
- `alpha`: very early release; experimental features; not tested at all; highly unstable  
- `rc`: release candidate (almost final); features are ready and tested, but not released yet; just needs final validation  
- `lts`: long-term support; stable release with long-term support; generally adopted in production  
- `nightly/canary`: latest development release (day-to-day/live); not tested at all; highly unstable  

## Other types of versioning notions

Although semver is widely used, there are other types of versioning notions as well:

- Custom major and minor representation  
- Date-based versioning (e.g., `2026.4.12`)  

## What is the best version?

It totally depends on the use case.  
- If you want the latest features and changes, then `latest` is the best version.  
- If you want a stable release, then `stable` is the best version.  
- For production and long-term maintenance, `lts` is the best version.  

## What is the best version for me?

If you are working on a personal project or portfolio, you can go with the latest version. However, you need to be careful: as soon as any breaking changes are introduced, you must update your project. Generally, picking up the latest LTS versions is a good idea. That provides long-term stability and features as well, without breaking with minor updates.

I will add more about versioning, tags, and other symbolisms soon. Keep visiting!
