import ChangeAccountInfoForm from "@/features/dashboard/components/ChangeAccountInfoForm/ChangeAccountInfoForm";
import {IUserAccountInfo} from "@/types/user";
import {getUserInfo} from "@/features/dashboard/services/services";
type ChangeAccountInfoFormProps = {
    userId?:string
}
export default async function ContactsDashboard({userId}: ChangeAccountInfoFormProps) {
    const userData:IUserAccountInfo = await getUserInfo(userId)

    return (
        <>
            <h1>Контактні дані</h1>
            {userData ? <ChangeAccountInfoForm user={userData}/> : <ChangeAccountInfoForm/>}
            <ChangeAccountInfoForm/>
        </>
    )
}