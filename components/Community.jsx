"use client";
import User from "@components/User";
import { useState, useEffect } from "react";

const Community = () => {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const getAllPrompts = async () => {
            let promptsInfo = [];
            const res = await fetch("/api/prompt");
            const allPrompts = await res.json();
            allPrompts.reverse();

            for (const prompt of allPrompts) {
                const res = await fetch(`/api/user/${prompt.creator}`);
                const user = await res.json();
                const result = { ...prompt, ...user };
                promptsInfo.push(result);
            }

            setPrompts((prev) => [...promptsInfo, ...prev]);
        };
        const handlePrompt = async () => {
            await getAllPrompts();
        };

        handlePrompt();
    }, []);

    return (
        <section
            className="mt-[178px] py-8 w-full flex-center flex-col gap-y-6
        sm:flex-row sm:flex-wrap sm:gap-6 sm:min-w-[744px] xl:justify-normal"
        >
            {prompts?.map((item, index) => (
                <User
                    key={index}
                    prompt={item.prompt}
                    tag={item.tag}
                    username={item.username}
                    userId={item.creator}
                    email={item.email}
                    image={item.image}
                />
            ))}
        </section>
    );
};

export default Community;
