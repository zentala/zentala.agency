---
title: 'Static Site Generator Stack Ideal for Busy Developer'
date: '2023-06-01'
category: 'Development'
imageUrl: 'https://example.com/ssr-static-site-generators.jpg'
excerpt: 'Exploring the benefits of SSR and static site generators for efficient content creation.'
authorName: 'Paweł Żentała'
authorAvatar: 'https://avatars.githubusercontent.com/u/7286123?v=4'
authorRole: 'Innovation Activist'
---

# Static Site Generators Stack Ideal for Busy Developers

As a solo developer working full-time, finding a quick and efficient way to create content sites is crucial. I love writing and publishing content but managing multiple blogs and websites can be time-consuming.

## Why SSR?

In the past, blogs were often hosted on WordPress, but maintaining them—dealing with updates and security issues—consumed too much unnecessary time. Especially when the goal is to serve a few pages with content that rarely changes.

## The Best Static Hosting Solution

For these purposes, GitHub Pages is ideal. It's free, stable, and the pages are hosted indefinitely. As a member of the Arctic Vault, my pages will outlive me. GitHub Pages supports free build processes (GitHub Workflows) and allows any domain to be linked (by redirecting an A record from a DNS server). It's the perfect solution for a time-conscious programmer. Future-proof.

However, writing HTML pages feels like a regression. So, I tested various SSR frameworks for it.

## SSR Frameworks

I began my research with Jekyll, as it was mentioned in the GitHub Pages documentation. I can't recall the exact issues, but it's an old and outdated solution. Next, I tested Gatsby. It's nice but slow in building, especially with multiple subpages. Then I tried Hugo—fast, but theming is challenging and it lacks reusable components and extensive JS usage. Finally, I found Astro. Similar to Hugo in structure but supports components, making it easy to map arrays to content generated with React-like components.

Astro won the race. It's fast and very convenient for creating websites. For static pages, it offers the ease of writing like in React but is simpler.

## CSS Frameworks

I tried several CSS frameworks: Bootstrap, Bulma, Material UI, and Tailwind. Tailwind was tested last but emerged as the winner. It's excellent for styling in HTML. Initially, it's hard to grasp, but with the advent of ChatGPT, you can simply ask for class suggestions and it provides them. It's genius and convenient.

## AI-first devlopment

Lastly, an important advantage is coding the site with AI assistant. You want simple code and project structure so that the generator can easily generate code and work with project Astro and Tailwind meet these criteria.

Simple code = fewer complications when using LLMs to refine it = more AI-generated code = faster work.

## Web IDE

You also want it configured to work with VSCode, ensuring a dev container and GitHub Codespace are ready. This way, when you open the website a few months later on another machine, it's ready to code.

## Deployment

As mentioned, deployment is straightforward with GitHub Pages. You can see my website built with Tailwind + Astro [here]() because that's exactly how I wrote this site!
