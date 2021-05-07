import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Custom404 from 'pages/404'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'
import * as React from "react";
import {DiscussionEmbed} from "disqus-react";
import ButtonJuned from "@/components/ButtonJuned";

const Article=(data,router)=>{
    // console.log("Article",data.data.posts);
    // const router=data.data.router
    const [enableComment,setenableComment]=React.useState(false)
    // const disqusShortname = process.env.DISQUS_SHORT_URL
    const disqusShortname = "testblog-eq9etpzsxo"

    if (!router.isFallback && !data.data.hasOwnProperty("posts")) {
        return <ErrorPage statusCode={404} />
        // return (<><Custom404/></>)
    }


    const post=data.data.posts[0]

    const disqusConfig = {
        // url: `${process.env.WEBSITE_HOMEPAGE_URL}/${post.slug}`,
        // url: `${process.env.WEBSITE_HOMEPAGE_URL}/${post.slug}`,
        // url: "http://localhost:3000/post-slug",
        identifier: post.id, // Single post id
        title: post.title // Single post title
    }



    return (

        <>
            <article>
                <Head>
                    <title>
                        {post.title}
                    </title>
                    {/*<meta*/}
                    {/*    property="og:image"*/}
                    {/*    content={process.env.DEFAULT_IMAGE_URL}*/}
                    {/*/>*/}
                </Head>
                <PostHeader
                    title={post.title}
                    // coverImage={process.env.DEFAULT_IMAGE_URL}
                    coverImage={post.feature_image}
                    date={post.published_at}
                    // author={post.authors[0]}
                    author={post.primary_author}
                />
                {/*<PostBody content={post.content} />*/}
                <div dangerouslySetInnerHTML={{__html:post.html}}>
                    {/*{post.html}*/}
                </div>
            </article>
            <SectionSeparator />

            {enableComment?
                <DiscussionEmbed style={{width:"100%",}}
                                 shortname={disqusShortname}
                                 config={disqusConfig}
                />
                :

                <ButtonJuned onClick={()=>{setenableComment(true)}} title={"load comment"} />





            }

            {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
        </>
    )
}




export default function Post({ data }) {
    const router = useRouter()

    console.log("[slog]",data);
    // console.log("[slog]",data.posts[0]);
    // if (!router.isFallback && !data.posts[0]?.slug) {
    //     // return <ErrorPage statusCode={404} />
    //     return <Custom404/>
    // }

    // const post=router.isFallback ?[] : data.posts[0]
    // const post=data
    return  <Container>
        <Header />
        {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
        ) : <Article data={data} router={router} />}
    </Container>


}

export async function getStaticProps({ query,params}) {

    console.log("params",params);
    console.log("query",query);
    const slugData=query||params
    // const post={"data":"data"}
    // const data = await getPostAndMorePosts(params.slug, preview)
    // const content = await markdownToHtml(data.post?.metadata?.content || '')

    const res =await fetch(`http://localhost:2368/ghost/api/v3/content/posts/slug/${slugData.slug}/?key=${process.env.GHOST_Content_API_key}&include=authors`)
    // const res =await fetch(`http://localhost:2368/ghost/api/v3/content/posts/slug/welcome/?key=${process.env.GHOST_Content_API_key}&include=authors`)

    const data=await res.json()
    // const data=jsdata.posts[0]
    console.log("getStaticProps:data:",data)
    // console.log(data)
    return {
        props: {data},
    }
}

export async function getStaticPaths() {
    // const allPosts = ["welcome","design"]
    const allPosts = []
    return {
        paths: allPosts.map((post) => `/posts/${post}`),
        fallback: true,
    }
}
