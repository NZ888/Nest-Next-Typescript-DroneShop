"use client"

import { useEffect, useState } from "react"
import ChangeAccountInfoForm from "@/features/dashboard/components/ChangeAccountInfoForm/ChangeAccountInfoForm"
import { IUserAccountInfo } from "@/types/user"
import { getUserInfo } from "@/features/dashboard/services/services"

type ContactsDashboardProps = {
    userId?: string
}

export default function ContactsDashboard({ userId }: ContactsDashboardProps) {
    const [userData, setUserData] = useState<IUserAccountInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!userId) {
            setIsLoading(false)
            return
        }

        async function fetchUserInfo() {
            try {
                const data = await getUserInfo(userId)
                setUserData(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserInfo()
    }, [userId])

    if (isLoading) {
        return <p>Завантаження...</p>
    }

    return (
        <>
            <h1>Контактні дані</h1>
            <ChangeAccountInfoForm user={userData ?? undefined} />
        </>
    )
}