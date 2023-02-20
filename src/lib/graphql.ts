import { GraphQLClient } from "graphql-request";
import { productsQueryResultSchema } from "~/api/schemas";
import { env } from "~/env.mjs";

const endpoint = env.CMS_GRAPHQL_ENDPOINT;

const _queries = {
    products: `
      query {
        productCollection(order: sys_firstPublishedAt_DESC) {
          items {
            sys {
              id
            }
            name
            unitaryValue
            picturesCollection {
              items {
                title
                url
                height
                width
              }
            }
          }
        }
      }
  `,
};

const client = new GraphQLClient(endpoint);
client.setHeader("Authorization", `Bearer ${env.CMS_API_TOKEN}`);

export const graphqlQueries = {
    getProducts: async () => {
        const response: unknown = await client.request(_queries.products);
        const parsedResponse = productsQueryResultSchema.parse(response);
        return parsedResponse;
    },
};
