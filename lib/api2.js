import axios from "axios";
export const getStartpageData=async ()=>{
    const res=await axios.get("https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&fields=id,title,url,slug,feature_image:&limit=5&page=1")

}
