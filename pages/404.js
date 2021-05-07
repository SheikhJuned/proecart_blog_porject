import Container from "@/components/container";
import Head from "next/dist/next-server/lib/head";
import Layout from "@/components/layout";
import Link from "next/link";

export default function Custom404() {
    return (

        <>
            <Layout>
                <Head>
                    <title>page not found</title>
                </Head>
                <Container>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                        Blog.
                    </h1>
                    <div className="flex mt-20 flex-col	">
                        <p className="flex-grow  text-center	text-6xl md:text-8xl font-medium	 tracking-tighter leading-tight md:pr-8">
                            Page Not Foud
                        </p>
                        <Link href={"/"}><a className="p-6 max-w-sm mx-auto rounded-xl shadow-md flex items-center space-x-4 bg-accent-8 text-white mt-8">Go Home</a></Link>
                    </div>

                    {/*<Intro/>*/}

                </Container>


            </Layout>
        </>

    )
}
