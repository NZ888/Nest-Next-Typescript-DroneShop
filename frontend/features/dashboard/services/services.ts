import {API} from "@/config/api";
import {handleResponse} from "@/lib/helpers";
import {IUserAccountInfo} from "@/types/user";

export const getUserInfo = async (userId: string | undefined) => {
    const response: Response = await fetch(API.routes.user.getUserInfo(userId), {
        method: "GET",
        credentials: "include",
    })
    const data:IUserAccountInfo = await handleResponse<IUserAccountInfo>(response)
    return data as IUserAccountInfo
}