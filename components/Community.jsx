"use client";
import User from "@components/User";
import { useState, useEffect } from "react";

const Community = () => {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const getAllPrompts = async () => {
            const res = await fetch("/api/prompt");
            const allPrompts = await res.json();
            allPrompts.reverse();

            setPrompts(allPrompts);
        };
        getAllPrompts();
    }, []);

    return (
        <section
            className="mt-[178px] py-8 w-full flex-center flex-col gap-y-6
        sm:flex-row sm:flex-wrap sm:gap-6 sm:min-w-[744px] xl:justify-normal sm:items-start"
        >
            {prompts?.map((item) => (
                <User
                    key={item._id}
                    prompt={item.prompt}
                    tag={item.tag}
                    username={item.creator.username}
                    userId={item.creator._id}
                    email={item.creator.email}
                    image={item.creator.image}
                />
            ))}
        </section>
    );
};

export default Community;
