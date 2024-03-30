import localStorageService from '@/services/LocalStorageService';
import {getCookie} from 'cookies-next';
import {decodeJwt} from "jose";
import {LogInInput} from '@/services/types';
import instanceAxios from '@/axios/InstanceAxios';
interface ILocalTokens {
    at?: string | null | undefined
    rt?: string | null | undefined
}

type Token = string | null | undefined

type ExpirationTokenType = (token: Token) => boolean

const isExpiration: ExpirationTokenType = (token) => {
    if (token) {
        const decode = decodeJwt(token)
        const timeRemaining = decode?.exp ? decode.exp * 1000 : 0
        return timeRemaining < Date.now()
    }

    return true
}
class AuthService {
    private FIELD_LAST_VISIT_PATH: string = 'lastVisitPath'

    getCookieApp(name: string) {
        return getCookie(name)
    }

    sigIn(data: LogInInput) {
        instanceAxios.post('/graphql', data).then(resp => {
            console.log(resp);
        }).catch(error => {
            console.log(error);
        })
    }

    checkAuth() {
        const at = this.getCookieApp('accessToken')
        const rt = this.getCookieApp('refreshToken')

        return true
    }

    isGodAccessToken(): boolean {
        const at = this.getCookieApp('accessToken')

        if (typeof at === "boolean")
            return false

        return !isExpiration(at)
    }

    isGodRefreshToken(): boolean {
        const rt = this.getCookieApp('refreshToken')
        if (typeof rt === "boolean")
            return false

        return !isExpiration(rt)
    }

    getLocalTokens() {
        const at = this.getCookieApp('accessToken') as string
        const rt = this.getCookieApp('refreshToken') as string
        return {
            at,
            rt
        }
    }

    refreshTokens() {

    }

    getCurrentTypeAuth() {
        //     jwt or oauth2 twitch, google
    }

    getLastVisitPath() {
        return localStorageService.get(this.FIELD_LAST_VISIT_PATH)
    }

    setLastVisitPath(path: string) {
        localStorageService.add(this.FIELD_LAST_VISIT_PATH, path)
    }

    removeLastVisitPath() {
        localStorageService.remove(this.FIELD_LAST_VISIT_PATH)
    }
}

export default new AuthService
