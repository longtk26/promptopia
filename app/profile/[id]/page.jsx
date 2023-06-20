"use client";
import ProfileUser from "@components/ProfileUser";
import { useState, useEffect } from "react";

const ProfileId = ({ params }) => {
    const [user, setUser] = useState({});
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`/api/user/${params.id}`);
            const userInfo = await res.json();
            setUser(userInfo);
        };

        const getPrompts = async () => {
            const res = await fetch(`/api/prompt/${params.id}`);
            const prompts = await res.json();
            setPrompts(prompts);
        };
        getUser();
        getPrompts();
    }, []);

    return <ProfileUser user={user} prompts={prompts} />;
};

export default ProfileId;
