---
title: "Ask - a cli tool"
date: "2025-04-10"
tags: ["python", "HTML", "groq API"]
status: "published"
excerpt: "This tool was built to remove the overhead in visiting the internet and figuring out shell commands"
live: "https://github.com/nishant-k-sagar/ask"
github: "https://github.com/nishant-k-sagar/ask"
featured: true 
---
One of the most common thing to forget for developers is the shell commands. when we are working in terminal and suddenly forget a command for some specific task. We have to visit the internet and figure out the command. Generally, LLMs or GPTs.

The time taken in this overhead, going to the browser, opening a new tab, searching for the command, waiting for the response, then copying on the clipboard, then coming back to the terminal and pasting the command.

I just made it simple by building cli tool - ask.

Just do the setup and use it like this:

```bash
ask "how to create a react app"
```

it will recommend the shell command for you and will paste it on the clipboard. and No, It does not auto run the command. It also informs about the risk factor for commands suggesion.

## Tech Stack

- Python
- Groq API
- HTML

## Features

- Recommend shell commands
- Copy to clipboard
- Risk factor for commands suggestion

It is a simple tool that can be used by developers to quickly get the shell commands for any task. It is a free and open source tool that can be used by anyone. you can check out it here: [Ask](https://github.com/nishant-k-sagar/ask)
