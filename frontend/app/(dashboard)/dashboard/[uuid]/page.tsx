import React from "react";
import DashBoard from "@/components/dashboard/DashBoard";

interface Props {
    params: {
        uuid: string;
    };
}

export default async function DashboardUserPage({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;
    return (
        <>
            <DashBoard/>
        </>
    );
}

