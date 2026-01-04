import {useMutation, useQuery} from "@tanstack/react-query";
import {sendFeedback, getFeedbacks} from "../services/feedback.service"
import {IFeedback} from "@/features/feedback/types/feedback";

export const useSendFeedbackMutation = () => {
    return useMutation({
        mutationFn: (data: IFeedback)=> sendFeedback(data)
    });
};

export const useGetFeedbacks = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["feedbacks", page, limit],
        queryFn: ({ queryKey }) => {
            const [, page, limit] = queryKey as ["feedbacks", number, number];
            return getFeedbacks(page, limit);
        },
    });
};