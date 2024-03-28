import axios from "axios";
import {Post, Profile} from "@/types";

export async function requestAction() {
    'use server'
    const resp = await axios.get('https://jsonplaceholder.typicode.com/users');
}

export async function getArtist(index: number) {
    const res = await axios(`https://jsonplaceholder.typicode.com/albums/${index}`)
    return res.data
}

export async function getPosts(): Promise<Post[]> {
    const res = await axios<Post[]>(`https://jsonplaceholder.typicode.com/photos?start=0&end=30`)
    return res.data;
}

export async function getProfile(id: string): Promise<Profile>{
    // 'use server'
    const res = await axios<Profile>(`https://jsonplaceholder.typicode.com/users/${id}`)
    return res.data
}