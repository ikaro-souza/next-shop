# Next Shop

[![en](https://img.shields.io/badge/lang-en--us-blue.svg)](https://github.com/ikaro-souza/next-shop/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/ikaro-souza/next-shop/blob/main/README-BR.md)

Esse projeto foi construído com [`create-t3-app`](https://create.t3.gg/).
Um t3-app é apenas um app NextJS configurado para ser mais typesafe já vem integrado com:

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)

Apesar disso eu usei apenas Tailwind CSS.

## The things I used

-   [Contentful Headless CMS](https://www.contentful.com/):
    Eu não quis implementar meu próprio backend e dado que o projeto é um site e-commerce, um headless CMS foi a escolha perfeita. Além de que este fornece uma api em GraphQL que simplifica a busca por dados quando comparado à sua alternativa em REST.
-   [Tanstack Query](https://tanstack.com/query/latest):
    A melhor biblioteca de gerenciamento de estado que existe para React. Usei para realizar prefetching de dados em modo SSR mas honestamente eu não precisava, eu podia apenas fazer uma requisição para o endpoint que criei que usa GraphQL para pegar os dados do CMS, porém essa é minha solução padrão para gerenciamento de estado então eu também a usei nesse projeto.
-   [Tailwind CSS](https://tailwindcss.com/):
    Ferramenta fantástica para criar UI lindas super rápido e ainda ser dono do seu próprio design system.
-   [Jotai](https://jotai.org/):
    Outra excelente biblioteca de gerenciamento de estado, entretanto essa eu usei especificamente para lidar com os dados da sacola de compras. Como eu não pretendia guardá-los no backend eu escolhi usar o localStore e o Jotai tem uma função incorporada para tal.

## Running the application

Para executar a aplicação basta você instalar as dependências com seu gerenciador de pacotes favorito (eu escolhi o `pnpm`):

`npm install`

`pnpm install`

`yarn`

E depois rodar o script `dev`:

`npm run dev`

`pnpm run dev`

`yarn dev`

Eu também publiquei essa aplicação na Vercel, você pode ver [aqui](https://next-shop-ikaro-souza.vercel.app/)
