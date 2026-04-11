---
title: "DSA-Cookbook"
date: "2026-04-09"
tags: ["react", "typescript", "cosmosdb"]
status: "published"
excerpt: "DSA-Cookbook is a collection of data structures and algorithms implemented in TypeScript and React."
featured: true
---
This project is built for sole purpose of revising the DSA problems at the en-moment. DSA-Cookbook has all the famous DSA sheets. This project specifically targets the leetcode centric DSA problems and provides the intuition, approach, pseudo codes and step by step explanation of the problem. It also provides the C++ code implementation. 

```javascript
As this project is built for sole purpose of revising the DSA, It assumes users are familair with the basics of data structures and algorithms. Currently, The codebase provides only optimised solutions. I am working on integrating the learning paths also.
```

## Design Strategy
The sole aim was making the website with minimal navigation friction. I have been on many websites where I have to navigate/hop across many pages or say dropdowns to see/revise the particular problem. I wanted to make it as seamless as possible. So, fewer hops better simpler UI and better UX. I cut the over styling and other major dramatic layouts keeping it simple.

For frequent fetching, I implement client side caching. Current implementation let users directly the website. I will implement the auth and user sessions for keeping the progress track.


## Choosing the Tech Stack

As I was building it solo, I went with the maintainable and scalable design strategy. In current version, I have used react, typescript in frontend, with custom CSS styling while in backend I have used Node.js.

For quick fetching, low latency and data consistency I have used the cosmosDB. For content generation pipeline I am using Mistral API with highly refined prompts to generate the optimal high quality content.

## Future Scopes

I will integrate a few crucial things in the project, listed as:
1. User profile and progress tracking.
2. Learning paths for beginners.
3. May be interesting learning quizzes or something If I get some ideas along the way.

Till the, You can checkout the project at [DSA-Cookbook](https://dsa-cookbook.pages.dev/)