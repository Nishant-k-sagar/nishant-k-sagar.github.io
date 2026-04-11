---
title: "Owlset"
date: "2026-04-10"
tags: ["python", "streamlit", "SQLlite", "RAG"]
status: "published"
excerpt: "Owlset is a perfect onboarding repo helper for new developers."
live: "https://github.com/nishant-k-sagar/owlset"
github: "https://github.com/nishant-k-sagar/owlset"
featured: true 
---
Owlset - A word play for All-set. and That is what it does for the new comers of any repo.
As the popularity of RAG is increasing day by day, I thought of building a RAG based application and main task was to keeping the LLM API requests at minimum. I planned to hit the LLM API at the very last as It is costly. I targeted the things to local first.

## Purpose
When a new developer joins a repo, he does not have full context of how things are working and having stale docs in a repo is still a big problem. So, He runs to the seniors/engineers working already. But they are also busy with their work and due to time constraints things take time to get resolved. 
This project targets to solve this simple thing at the scale. Yet, A long way to go.

## Workflow
User puts the local repo in the data/repo folder(build one in root directory). It uses the AST and builds the graph for calling functions and called dependencies. It prepares the graph of internal dependencies. So, when user looks for a function, It will show the function and its dependencies. what does it call and who calls it. Making the workflow easy to visualise and understanding.


## Tech stack
I used the python for the backend and streamlit for the frontend. For the database, I used the SQLlite. 

It does not use the RAG using FAISS but workaround similar to RAG. or in more specific terms, It uses the context/Knowledge graphs. It uses the NetworkX library for keeping the bidirectional dependencies of the functions with tree-sitter parser.

I have used the Mistral API for the LLM calls. It is written in python. I used LLMs heavily in this project. My main task was to desing the system and taking the design decisions. I prepared the HLD for the components and aligned the things.

-python
-streamlit
-SQLlite
-tree-sitter
-NetworkX

Visit [Owlset](https://github.com/nishant-k-sagar/owlset)
