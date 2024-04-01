import {Post, Tag} from '@/types';

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ResponseRefreshToken {
    refresh: ITokens;
}

type FieldValuePair<Field extends string, Value> = {
    [K in Field]: Value;
};

type Response<Field extends string, T> = {
    [K in Field]: T
}

type Variables<T> = {
    data: T
}


export type SigInInput = {
    username: string,
    password: string,
}

export type TagQueryByValue = {
    value: string
}


export type VariablesSigIn = Variables<SigInInput>
export type VariablesFindValueTag = Variables<TagQueryByValue>

export type ResponseSigIn = Response<'sigIn', SigInInput>
export type ResponsePosts = Response<'posts', Post[]>
export type ResponseCheckAuth = Response<'checkAuth', boolean>
export type ResponseCreateTag = Response<'createTag', Tag>
export type ResponseCreateOrFindTag = Response<'findOrCreateTag', Tag>
export type ResponseFindPartialTags = Response<'findPartialTags', Tag[]>
