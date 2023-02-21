import { dehydrate, QueryClient } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { getProducts } from "~/api";
import { Header } from "~/components/Header";
import { PageDescription } from "~/components/PageDescription";
import { PageTitle } from "~/components/PageTitle";
import { ProductCard } from "~/components/ProductCard";
import { queryKeys, useProducts } from "~/lib/queries";

const Home: NextPage = () => {
    const { products } = useProducts();
    if (!products) return <PageHead />;

    return (
        <>
            <PageHead />
            <main className="px-4 pb-20 sm:px-14 md:px-20 lg:px-28 2xl:mx-auto 2xl:max-w-screen-2xl">
                <Header />
                <PageTitle>Nossos produtos</PageTitle>
                <PageDescription>
                    Seleção dos melhores produtos de tecnologia com os
                    <span className="block sm:inline sm:text-center">
                        melhores preços.
                    </span>
                </PageDescription>
                <section className="mt-12 flex flex-col gap-y-6 sm:mx-auto sm:gap-y-8 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12 2xl:grid-cols-3">
                    {products &&
                        products.map((p) => (
                            <ProductCard product={p} key={p.sys.id} />
                        ))}
                </section>
            </main>
        </>
    );
};

export default Home;

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(queryKeys.useProducts, getProducts);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

const PageHead: React.FC = () => (
    <Head>
        <title>Next Shop</title>
        <meta
            name="description"
            content="Next Shop. Os melhores produtos de tecnologia com os melhores preços."
        />
        <link rel="icon" href="/favicon.ico" />
    </Head>
);
