import { User } from "./user";

export interface UserResponse {
    status: number,
    message: string,
    data: User,
    links: [
        {
            rel: string,
            href: string
        }
    ]

}