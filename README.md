# Next Shop

[![en](https://img.shields.io/badge/lang-en--us-blue.svg)](https://github.com/ikaro-souza/next-shop/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/ikaro-souza/next-shop/blob/main/README-BR.md)

This project was bootstrapped with [`create-t3-app`](https://create.t3.gg/).
A t3-app is just a NextJS application setup to be more typesafe and already comes integrated with:

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)

Although I've only used Tailwind CSS.

## The things I used

-   [Contentful Headless CMS](https://www.contentful.com/): I didn't want to implement my own backend and given that the project is an e-commerce website, a headless CMS was the perfect choice. It also provides a GraphQL API that simplifies the querying of data when compared to its own REST alternative.
-   [Tanstack Query](https://tanstack.com/query/latest): The best state management library there is for React. I used it to prefetch data in SSR mode but honestly I didn't need to, I could simply hit the endpoint I created that uses GraphQL to fetch the data from the CMS, but it's my default state management solution so I slipped it into this project as well.
-   [Tailwind CSS](https://tailwindcss.com/): Awesome tool for making beautiful UI blazingly fast and still owning your design system.
-   [Jotai](https://jotai.org/): Another excelent state management library, but this one I chose specifically to handle the shopping bag data, since I wasn't planning to store it in the backend I chose to use localStore and Jotai has a built-in method for it.

## Running the application

To run the application you just have to install the dependencies with your preferred package manager (I chose `pnpm`):

`npm install`

`pnpm install`

`yarn`

And then run the `dev` script:

`npm run dev`

`pnpm run dev`

`yarn dev`

I also deployed this application on Vercel, you can check it [here](https://next-shop-ikaro-souza.vercel.app/).
