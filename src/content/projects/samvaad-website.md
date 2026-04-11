---
title: "Samvaad Website"
date: "2026-04-10"
tags: ["react", "PHP", "SQL"]
status: "published"
excerpt: "Samvaad Website is built for Literary and Quizzing Society of IIITDMJ."
live: "https://github.com/nishant-k-sagar/samvaad-website"
github: "https://github.com/nishant-k-sagar/samvaad-website"
featured: true 
---

After learning the devlepment, I wanted to build something which can be used by many people. So, I shifted to build this website for the Literary and Quizzing Society of IIITDMJ. 

When I was thinking about building this website my aim was to build the long term maintainable website without maintaing the codebase for long term. So, I decided to use the headless CMS approach. All the content and images are stored in the database and can be updated using the admin panel. Those things never needed the codebase changes.

## What is Headless CMS?
Headless CMS is a content management system that separates the content from the presentation layer. In other words, it provides a way to store and manage content without keeping it tied to any specific frontend technology. It is completely decopuled from the frontend. 

## Tech Stack
firstly, I explored about the CMS and found some resources on youtube which were using the PHP in backend. I explored and built the backend in PHP and SQL for admin Panel. At that time, I was not using LLMs. So, I customised as per my needs to manage the content and types of content. 

In frontend, I used the react, javascript and custom CSS styling. Few pre-built components were used for the UI. I went with the card designs for ease and maintainability. For user website, I used node.js in backend. 

For storage purposes, Firstly I was using the BLOB strategy in SQL, but it was not efficient for the large files. So, I shifted to the cloud storage strategy using the Cloudinary.

## Admin Panel
I built a simple admin panel for the website which can be used to manage the content and images. It is a simple form based admin panel where I can add, update and delete the content. It handles all things at the backend and nothing is changed on the frontend.

## CMS Panel
Visit [CMS Panel](https://github.com/nishant-k-sagar/samvaad-cms)
