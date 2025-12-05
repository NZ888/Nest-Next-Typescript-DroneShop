"use client"
import React from 'react';
import {useAuth} from "@/features/auth/hooks/useAuth";
import {useRouter} from "next/navigation";

type DashBoardProps = object

const DashBoard: React.FC<DashBoardProps> = ({  }) => {
    const {isAuthenticated} = useAuth()
    const router = useRouter()

    if (!isAuthenticated) {
        router.push("/not-authenticated")
    }
  return (
    <div className="">

    </div>
  );
};

export default DashBoard;
