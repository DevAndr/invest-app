import {getArtist} from "@/actions";
import {useQuery} from "@apollo/client";
import {GET_POSTS} from "@/graphql/graphql";
import Posts from "@/components/Posts/Posts";

export default async function Home() {

    const artistData = await getArtist(5)
    console.log(artistData)

    return (
        <>

            <div>{1}</div>
            <div>{artistData?.id}</div>
            {/*<PostsMore/>*/}
            <Posts/>
            {/*<button>Click</button>*/}
        </>
    );
}
