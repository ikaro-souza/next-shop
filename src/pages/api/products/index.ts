import { type NextApiHandler } from "next";
import { graphqlQueries } from "~/lib/graphql";

const handler: NextApiHandler = async (_, res) => {
    const queryResult = await graphqlQueries.getProducts();
    res.status(200).json(queryResult.productCollection.items);
};

export default handler;
