var axios = require("axios").default

// axios.get("https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&limit=5&page=1").then((res)=>{
//     console.log(res.data);
//     console.log(res.data.meta.pagination);
//
// }).catch((err)=>{
//     console.log(err);
// })


const at = async () => {

    // await axios.get("https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&fields=id,title,url,slug,feature_image:&limit=5&page=1").then((res) => {
    const  res=await axios.get("htts://demo.ghost.ioooo/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&fields=id,title,url,slug,feature_image:&limit=5&page=1")

    console.log(res);

    console.log(res.data);

}

at()


