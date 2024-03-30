import React, {FC} from 'react';
import Image from 'next/image'
import {getPosts} from "@/actions";


const PostsMore: FC = async () => {
    const posts = await getPosts();
    return (
        <div >
            <ul className="flex flex-col gap-2" style={{height: '300px', overflow: 'overlay'}}>
                {
                    posts.map(post => <li style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'start',
                        flexDirection: 'row-reverse'
                    }} className="flex flex-row-reverse gap-2 justify-start hover:bg-indigo-950 cursor-pointer"
                                          key={post.id}>
                        <label className="cursor-pointer">{post.title}</label>
                        <Image alt={post.title} height={30} width={30} src={post.thumbnailUrl}/>
                    </li>)
                }
            </ul>
        </div>
    );
}

export default PostsMore;