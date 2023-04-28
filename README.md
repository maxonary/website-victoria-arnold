# Gallery App

This is a simple gallery app that allows users to upload, view, update, and delete images. The app is built using [Express](https://expressjs.com/) and integrates with [Firebase](https://firebase.google.com/) to store and retrieve images. The app also includes some additional routes for an "About" page and a "Contact" page.

## Prerequisites

To run this app, you will need to have Node.js installed on your machine. You will also need to set up a Firebase project and obtain the Firebase configuration credentials from Maximilian Arnold.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory and run `npm install`.
3. Paste the Firebase configuration credentials into the `firebase.js` file.
4. Run `npm run build` to build the project.
5. Run `npm start` to start the server.
6. Else you can run `npm run dev` to start the server in development mode.

## Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── content/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## Deployment

This project is automatically deployed to [Firebase](https://firebase.google.com) when merged into master. To deploy manually, run `firebase deploy`.