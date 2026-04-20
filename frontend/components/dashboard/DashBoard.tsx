"use client"
import React from 'react';
import {useAuth} from "@/features/auth/hooks/useAuth";
import {useRouter} from "next/navigation";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import DashboardLayout from "@/components/dashboard/DashboardLayout/DashboardLayout";

type DashBoardProps = object

const DashBoard: React.FC<DashBoardProps> = ({  }) => {
    const {isAuthenticated, user, isError, isLoading} = useAuth()
    const router = useRouter()
    if (isError) {
        router.push("/")
    }
  return (
    <>
        {isLoading &&(
            <h1>Loading</h1>
        )}
        <Header/>
        <DashboardLayout user={user}/>
        <Footer/>
    </>
  );
};

export default DashBoard;
