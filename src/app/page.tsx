import {getArtist} from "@/actions";
import Posts from "@/components/Posts";

export default async function Home() {
    const artistData = await getArtist(5)
    console.log(artistData)

    return (
        <>

            <div>{1}</div>
            <div>{artistData?.id}</div>
            <Posts/>
            {/*<button>Click</button>*/}
        </>
    );
}
