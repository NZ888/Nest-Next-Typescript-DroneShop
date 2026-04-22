import React from 'react';
import {useForm} from "react-hook-form";
import {IUserInfo} from "@/features/dashboard/types/account";

type ChangeAccountInfoFormProps = object

const ChangeAccountInfoForm: React.FC<ChangeAccountInfoFormProps> = ({  }) => {
    const changeAccountInfoForm = useForm<IUserInfo>({mode: "onChange"});

    return (
    <div className="">

    </div>
  );
};

export default ChangeAccountInfoForm;
