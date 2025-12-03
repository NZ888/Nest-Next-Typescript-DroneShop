import React from "react";

interface Props {
    params: {
        uuid: string;
    };
}

export default async function DashboardUserPage({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;

    return (
        <div>
            <h1>User dashboard: {uuid}</h1>
        </div>
    );
}

