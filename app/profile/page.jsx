"use client";
import { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";
import ProfileUser from "@components/ProfileUser";

export const ProfileContext = createContext();

const Profile = () => {
    const { data: session } = useSession();
    const [prompts, setPrompts] = useState([]);

    const getPrompts = async (userId) => {
        const res = await fetch(`/api/prompt/${userId}`);
        const prompts = await res.json();
        prompts?.reverse();
        setPrompts(prompts || []);
    };

    useEffect(() => {
        if (session) {
            getPrompts(session?.user?.id);
        }
    }, [prompts]);

    if (session) {
        return (
            <ProfileContext.Provider value={{ getPrompts }}>
                <ProfileUser user={session?.user} prompts={prompts} isLogin />;
            </ProfileContext.Provider>
        );
    }
};

export default Profile;
