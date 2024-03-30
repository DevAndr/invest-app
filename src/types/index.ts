export type Post = {
    id: string,
    title: string,
    image: any
    likes: number
    investments: Investment[]
    description: string,
    comments:    Comment[]
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
export enum InvestmentType {
    INDEX,
    CRYPTO,
    DEPOSIT,
    BONDS,
    STOCK
}

export enum Role {
    USER,
    ADMIN,
    BOT
}

export enum TypeCurrency {
    RUB,
    USD,
    EUR
}