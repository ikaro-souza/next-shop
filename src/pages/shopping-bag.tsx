import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "~/components/Header";
import { PageDescription } from "~/components/PageDescription";
import { PageTitle } from "~/components/PageTitle";
import { ShoppingBagProductCard } from "~/components/ShoppingBagProductCard";
import { useClearShoppingBag, useShoppingBag } from "~/lib/atoms";
import { notify } from "~/lib/toast";
import { formatCurrency } from "~/utils";

const Page: NextPage = () => {
    const { shoppingBag, isLoading } = useShoppingBag();
    const clearShoppingBag = useClearShoppingBag();
    const router = useRouter();

    if (isLoading) return <PageHead />;

    const onBuyClick = () => {
        clearShoppingBag();
        notify("Compra realizada com sucesso. Muito obrigado!");
    };

    return (
        <>
            <PageHead />
            <main className="px-4 pb-20 sm:px-14 md:px-20 lg:px-32 2xl:mx-auto 2xl:max-w-screen-2xl">
                <Header />
                <PageTitle className="lg:mt-16">
                    Sua sacola{" "}
                    {shoppingBag.length
                        ? `de ${formatCurrency(shoppingBag.totalValue)}`
                        : "está vazia"}
                </PageTitle>
                <PageDescription
                    className={clsx(!shoppingBag.length && "mt-6")}
                >
                    {shoppingBag.length ? (
                        "Frete grátis em todos os pedidos."
                    ) : (
                        <Link
                            href="/"
                            className="mx-auto flex h-12 items-center justify-center bg-black px-4 text-center font-medium text-white"
                        >
                            Dá uma olhada nas nossas ofertas.
                        </Link>
                    )}
                </PageDescription>
                <section className="mt-12 flex flex-col gap-y-6 sm:mx-auto sm:gap-y-8 lg:mt-20 lg:px-48">
                    {shoppingBag.products.map((p) => (
                        <ShoppingBagProductCard product={p} key={p.sys.id} />
                    ))}
                </section>
                {!!shoppingBag.length && (
                    <footer className="mb-6 mt-14 flex w-full flex-col gap-x-9 md:flex-row md:items-center md:justify-end lg:mt-20 lg:px-48">
                        <span className="mb-3 text-right text-2xl font-medium tracking-[4%] md:mb-0 md:mt-0">
                            Total: {formatCurrency(shoppingBag.totalValue)}
                        </span>
                        <button className="flex h-12 w-80 items-center justify-center bg-black text-lg font-medium text-white">
                            Comprar
                        </button>
                    </footer>
                )}
            </main>
        </>
    );
};

export default Page;

const PageHead: React.FC = () => {
    const { shoppingBag } = useShoppingBag();
    return (
        <Head>
            <title>
                Next Shop | Sacola de compras{" "}
                {shoppingBag.totalValue
                    ? `de ${shoppingBag.totalValue.toFixed(2)}`
                    : "vazia"}
            </title>
            <meta
                name="description"
                content={`Next Shop. Sua sacola de compras. Frete grátis em todos os pedidos.`}
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};
