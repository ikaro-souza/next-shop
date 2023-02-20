/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "jotai";
import { type AppType } from "next/dist/shared/lib/utils";
import React from "react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
    // Allows react-query to perform prefetching on SSR and SSG pages
    const queryClientRef = React.useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={(pageProps as any).dehydratedState}>
                <Provider>
                    <Component {...pageProps} />
                </Provider>
            </Hydrate>
        </QueryClientProvider>
    );
};

export default MyApp;
