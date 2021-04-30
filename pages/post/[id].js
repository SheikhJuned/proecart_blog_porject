import Head from 'next/head'
import {DiscussionEmbed} from "disqus-react"

import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React from "react";

export default function PostPage({data}) {
    const post=data.posts[0]
    const [enableComment,setenableComment]=React.useState(false)
    // console.log(data);
    // const disqusShortname = "https://testblog-eq9etpzsxo.disqus.com/embed.js"
    const disqusShortname = "testblog-eq9etpzsxo"

    const disqusConfig = {
        url: "https://your-site-url/post-slug",
        identifier: post.id, // Single post id
        title: post.title // Single post title
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>{post.slug}</title>
                <meta name="description" content={post.title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
       <div dangerouslySetInnerHTML={{__html:post.html}}>
           {/*{post.html}*/}
       </div>

            {enableComment?
            <DiscussionEmbed style={{width:"100%",}}
                shortname={disqusShortname}
                config={disqusConfig}
            />
            :
                <button className='btn' onClick={()=>{setenableComment(true)}}>
                load comment
            </button>



            }

        </div>
    )
}

export async function getServerSideProps({query:{id}}) {
    console.log(`query`,id);
    // Get external data from the file system, API, DB, etc.
    const res =await fetch(`http://localhost:2368/ghost/api/v3/content/posts/${id}/?key=cb015349fc50d1e5ccf1e7e1a8`)
    const data=await res.json()
    console.log("data",data);


    return {
        props: {data}
    }
}
