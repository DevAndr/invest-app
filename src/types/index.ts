import {DateTime} from 'luxon';

export type Post = {
    id: string,
    title: string,
    image: any
    likes: number
    investments: Investment[]
    description: string,
    comments: Comment[]
}

export type Investment = {
    id: string
    userId: string
    amount: number
    price: number
    name: string
    type: InvestmentType
    currency: TypeCurrency
    description: string
    createAt: Date
    comments: Date
    // user: any
    // Post: any
    // postId: string
}

export type CryptoInvestment = {
    id: string
    createAt: Date
    updateAt: Date
    orderDate: Date
    amountInvest: number
    coin: Coin
    currentAmount: number
    platform: Platform
    goal: number
    profit: number
    currency: TypeCurrency
    status: InvestmentStatus
    strategy: CryptoStrategy[]
}

export type Coin = {
    id: string
    symbol: string
    investCoin: CryptoInvestment[]
}

export type Comment = {
    id: string
    userId: string
    postId: string
    text: string
    createAt: Date
    investmentId: string
    investment: Investment
    // author: User
    // Post: Post
    // postId: string
}

export type Tag = {
    id: string
    value: string
}

export enum InvestmentStatus {
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    OPEN = 'OPEN'
}

export enum Platform {
    BINANCE = 'BINANCE',
    BYBIT = 'BYBIT',
    TINKOFF = 'TINKOFF'
}

export type TokenPlatform = {
    id: string
    token: string
    expireAt: Date
    platform: Platform
}

export enum CryptoStrategy {
    LONG_INVEST = 'LONG_INVEST',
    GRID_SPOT = 'GRID_SPOT',
    GRID_FIAT = 'GRID_FIAT',
    FUTURE = 'FUTURE',
    SPOT = 'SPOT',
    P2P = 'P2P'
}

export enum InvestmentType {
    INDEX = 'INDEX',
    CRYPTO = 'CRYPTO',
    DEPOSIT = 'DEPOSIT',
    BONDS = 'BONDS',
    STOCK = 'STOCK'
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    BOT = 'BOT'
}

export enum TypeCurrency {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR'
}