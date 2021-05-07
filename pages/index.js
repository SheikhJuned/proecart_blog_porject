import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import {getAllPostsForHome} from '@/lib/api'
import {getStartpageData} from "@/lib/api2";
import Head from 'next/head'
import {CMS_NAME} from '@/lib/constants'
import ButtonJuned from "@/components/ButtonJuned";

const POST_PER_REQUEST=5


const LoadMore = ({pagination}) => {

    const [onlyPosts, setOnlyPosts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isNextPage, setIsNextPage] = React.useState(pagination.next )
    const [pageNo, setPageNo] = React.useState(pagination.page+1)


    /*const fetchBlogs=async ()=>{
      setIsLoading(true)
      console.log("fetchBlogs",`${process.env.NEXT_PUBLIC_GHOST_API_URL}/ghost/api/v3/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_Content_API_key}&fields=id,title,custom_excerpt,url,slug,feature_image,published_at&limit=5&page=2&include=authors`)
      const res=await fetch(`${process.env.NEXT_PUBLIC_GHOST_API_URL}/ghost/api/v3/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_Content_API_key}&fields=id,title,custom_excerpt,url,slug,feature_image,published_at&limit=5&page=2&include=authors`)
      const data=await res.ok?await res.json()["posts"] : []
      console.log(data);
      setOnlyPosts([...onlyPosts,...data])
      setPageNo(pageNo+1)
      setIsLoading(false)
    }
    */
    const fetchBlogs = async () => {

        setIsLoading(true)
        await fetch(`${process.env.NEXT_PUBLIC_GHOST_API_URL}/ghost/api/v3/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_Content_API_key}&fields=id,title,custom_excerpt,url,slug,feature_image,published_at&limit=${POST_PER_REQUEST}&page=${pageNo}&include=authors`)
            .then(async (res) => {
                const data=await res.json()
              setOnlyPosts([...onlyPosts,...data.posts])
              setPageNo(pageNo+1)
              // console.log(onlyPosts)
              setIsNextPage(data.meta.pagination.next)
              setIsLoading(false)

            }).catch((err) => {
                console.log(err);
            })
    }


    return (<>

            <MoreStories posts={onlyPosts}/>


            {isNextPage && <ButtonJuned onClick={fetchBlogs} title={"load More..."}/> }

        </>
    )


}


export default function Index({allPosts}) {
    // console.log(allPosts);
    const posts = allPosts.posts
    const heroPost = posts[0]
    const morePosts = posts.slice(1)


    return (
        <>
            <Layout>
                <Head>
                    <title>This is your Home Title</title>
                </Head>
                <Container>
                    <Intro/>
                    {heroPost && (
                        <HeroPost
                            id={heroPost.id}
                            title={heroPost.title}
                            coverImage={heroPost.feature_image}
                            date={heroPost.published_at}
                            author={heroPost.authors[0]}
                            slug={heroPost.slug}
                            excerpt={heroPost.custom_excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
                    <LoadMore pagination={allPosts.meta.pagination}/>


                </Container>


            </Layout>
        </>
    )
}

const GetHeroPosts=async ()=>{
    const res=await fetch(`${process.env.GHOST_API_URL}/ghost/api/v3/content/posts/?key=${process.env.GHOST_Content_API_key}&fields=id,title,custom_excerpt,url,slug,feature_image,published_at&include=authors&filter=tag:heropost`)

    const pageList=await res.ok ? await res.json() : []
    // console.log( pageList)
    if(pageList.hasOwnProperty("posts")){
    return pageList.posts

    }else {return  pageList}
}





export async function getStaticProps({preview}) {
    // console.log(`${process.env.GHOST_API_URL}`);
    const HeroPostList=await GetHeroPosts()
    // console.log("await GetHeroPosts():",await GetHeroPosts())
    // console.log(preview)
    // await getStartpageData()
    // const allPosts = (await getAllPostsForHome(preview)) || []
    // const res=await fetch("https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&fields=id,title,url,slug,feature_image:&limit=5&page=1")
    // const res=await fetch("https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&fields=id,title,custom_excerpt,url,slug,feature_image,published_at&limit=5&page=1&include=authors")
    const res = await fetch(`${process.env.GHOST_API_URL}/ghost/api/v3/content/posts/?key=${process.env.GHOST_Content_API_key}&fields=id,title,custom_excerpt,url,slug,feature_image,published_at&limit=${POST_PER_REQUEST}&page=1&include=authors`)

    // const allPosts = await res.ok ? await res.json() : {"posts":[]}
    const data = await res.json()
    // const data_with_heroPost={"posts":[...HeroPostList,...data.posts]}
    data["posts"]=[...HeroPostList,...data.posts]
    const allPosts=data
    // const allPosts =await getStartpageData()
    // const allPosts =await data.json()

    return {
        props: {allPosts},
    }
}
