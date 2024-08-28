---
title: 'Ideas for Quick Wins when setting up Backstage Developer Portal'
date: '2023-06-01'
category: 'Development'
imageUrl: 'https://example.com/ssr-static-site-generators.jpg'
excerpt: 'Exploring the benefits of SSR and static site generators for efficient content creation.'
authorName: 'Paweł Żentała'
authorAvatar: 'https://avatars.githubusercontent.com/u/7286123?v=4'
authorRole: 'Founder & CEO @ ZIA'
---

# Quick Wins setting up Backstage Developer Portal

Practical tutotorial for architects, technical managers and developes setting up developer Portal On backstage. List of quick wins I would recomemed to stat with first when working with client, Thus is how I work hoever it may at least inspire you. Buynch of ideas for quick wins. hope it will inspirre you and speed up adoption on backstage in your company

## Miro Boards for planning

- shared know how
- your goals
- plugins info
-

## Theme customization

its pretty easy on bacis leves, just

- replace fonts
- adjust colors. uyou can find matchib colors ysing color paltete generatoe
- replace favicons

## Plugins

spent time exploring plugins.take it seruously. before any custom development check what u can get

### GithHub

### queta

### annucments

## custom entitiy procesors

while writing basktage plugins is pretty complex before of its architecture, writiting custom etities processors is pretyt simple

they allows you to convert any data into enities

usually backstage creates entities from contnent of cataglog-info files in your repo

custm etties processors let u to create them from anythng, eg:

- custom files on your repo
- responses from your apis

lets say you have kong gatway wich is gatway for apis of external providers, you dont dvelopep, manage and own those apis, you just organised them as in kong datway for clarity. you can connect with kong api to get tjheis openapis specs and conver them into APIs kind entities in backstage

or you have cmdb with list of applications your company use. this are expternal apllicatons like jira, gitrhub, etc. you can coonnect with cmdb api and proces info aboit them into backstage-format etities, taht will be emmited to backstage catalog. you can just get info about those componets from some external api (like title, desc, liks, whateever) and convert them into backstage entities.

this way you can easily grab catalog data sources you already have and insert them into backstage.

and its acclaully pretty easy!

## confulecne documentation

while backatage by default supports techdocs based on md documentaion in repositories,
the reality of most companies is that critiacl and global (related to scope bigger than separted resps) is on clondilece
sometimes notion or other software

you can index those documents in backstage to make them searchable for your developers

## UI pluings

while writing full stack plugins have long learning curve, writing frontend components in backstage is exrereamlly easy. because mui v4 that is used byu backsgage is comonny kknows, the same like react, you can just connect stuff from ready blocks. juist take a look on this [backstage compoentns demo]() and [mui v4 componentes demo](). this is pretty usefull to create your own cards that will display additional data from entities annotations and metadtada.
