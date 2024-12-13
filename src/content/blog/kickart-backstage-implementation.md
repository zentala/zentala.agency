---
title: '6 Practical Steps to Kickstart Your Backstage Implementation: Focusing on Low-Hanging Fruits'
date: '2024-12-02'
category: 'DevEx'
imageUrl: 'https://zentala.io/images/kickstart-backstage-implementation.jpg'
excerpt: 'Kickstart your Backstage implementation with these practical steps to quickly prove value, build momentum, and secure support from both technical teams and management for the ongoing development of your developer portal, while managing limited resources effectively.'
authorVersion: 'zentala-devex-consultant'
bannerEnd: 'devex'
---

Starting a developer portal implementation can be both exciting and overwhelming, especially with a tool as customizable and full of possibilities as Backstage. It often begins as a hackathon project, a Community of Practice initiative, or a Proof of Concept under time pressure, and the challenge is to deliver impactful results quickly while using limited resources. As a technical manager or a proactive developer, you are working with limited resources, aiming to prove the value of Backstage within your organization and secure support from stakeholders.

Therefore, let's focus on the low-hanging fruits — the most cost-effective tasks that demonstrate value early on, inspire colleagues and management, and build momentum for further development. The six steps in this article have been tested with clients and are specifically chosen to help you create a positive impact, allowing your Backstage implementation to be seen as a successful and valuable addition to the organization. By delivering quick wins, you lay the foundation for further support and investment, making it easier to tackle more complex aspects later.

Now, let's dive into six actionable steps that will set you up for a successful Backstage journey:

## 1\. **Catalog Everything**

The purpose of software catalog is to have everythig calalogued. It is value on its own when u have visibility over all catalogued entities your IT team develop and maintain. What u can't connect to your Backstage - mock it. Create mocked entities. Just try to structuize and relfect your company structre into Backstage entities. Show them how company software catalog may look like.

Start by building a comprehensive overview of your IT landscape. Backstage revolves around entities, such as components (services, webapps), APIs, systems, users, groups and more. Make sure every important entity in your IT department has a proper representation in Backstage. Each entity should:

- Be accurately described and categorized.
- Include as many additional information as possible (e.g., links to relevant resources).
- Establish relationships with other entities to create a cohesive and navigable structure.

This foundational cataloging ensures a strong base for further improvements and fosters increased visibility of your systems—what they consist of, how they connect, and who is responsible for each part.

## 2\. **Connect All Documentation**

Integrate all your existing documentation into Backstage. Whether it’s Markdown files, [Confulence documentation](https://github.com/K-Phoen/backstage-plugin-confluence), or README files in project repositories, connect them to Backstage to make them easily discoverable within their relevant context.

## 3\. **Leverage Available Plugins**

Backstage offers a wealth of plugins to extend its functionality. To get started:

1.  Review the available plugins and their functionalities.
2.  Rank them by their usefulness to your organization and ease of implementation.
3.  Start implementing the most impactful and straightforward plugins.

For inspiration, refer to this article where I highlight the most interesting and recommended Backstage plugins.

### 4\. **Customize the Theme**

Backstage's frontend is built on Material-UI v4, which includes a robust theming system. You can adjust fonts, colors, and border radii to match your organization's branding guidelines. It helps ensure that Backstage aligns with your brand, providing a familiar and cohesive user experience, much like how customization in tools like Jira enhances their fit within an organization.

## 5\. **Create Software Templates**

Develop software templates to:

- Onboard existing repositories into Backstage.
- Add technical documentation to Backstage.

These templates significantly reduce the risk of errors during the creation of `catalog-info.yaml` and \`mkdocs.yaml\` files and lower the cognitive load for developers implementing Backstage. Moreover, they serve as an excellent example of how Backstage can reduce cognitive load in other repetitive operations developers perform regularly.

## 6\. **Set Up Analytics**

Backstage supports integration with several popular analytics platforms, allowing you to gather valuable insights into how users interact with your developer portal. Supported analytics tools include:

- Google Analytics
- Google Analytics 4
- New Relic Browser
- Matomo
- Quantum Metric
- Generic HTTP

Analyzing usage data can guide your next steps and help prioritize improvements to ensure maximum user engagement and satisfaction.

---

If you’re looking for support in building or executing a strategy for Backstage implementation, feel free to reach out for assistance.
