"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProfileUser from "@components/ProfileUser";

const Profile = () => {
    const { data: session } = useSession();
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        if (session) {
            const getPrompts = async () => {
                const res = await fetch(`/api/prompt/${session?.user?.id}`);
                const prompts = await res.json();
                setPrompts(prompts);
            };
            getPrompts();
        }
    }, [session]);

    if (session) {
        return <ProfileUser user={session?.user} prompts={prompts} isLogin />;
    }
};

export default Profile;
