import {API} from "@/config/api"
import {handleResponse} from "@/lib/helpers";
import {IFeedback} from "@/features/feedback/types/feedback";

export const sendFeedback = async (feedback: IFeedback) =>{
    const res = await fetch(API.routes.feedback.sendFeedback, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({feedback})
    })
    return handleResponse(res);
}

export const getFeedbacks = async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const res = await fetch(
        `${API.routes.feedback.getFeedbacks}?${params.toString()}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return handleResponse<IFeedback[]>(res);
};

