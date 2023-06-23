"use client";
import User from "@components/User";
import { useState, useEffect } from "react";
import Search from "./Search";
import useDebounce from "@hook/useDebounce";

const Community = () => {
    const [prompts, setPrompts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const textQuery = useDebounce(searchText);

    const handleClickTag = (tag) => {
        setSearchText(tag);
    };

    useEffect(() => {
        const getAllPromptsOrSearchPrompt = async () => {
            if (textQuery !== "") {
                const res = await fetch(`/api/search?q=${textQuery}`);
                const results = await res.json();

                setPrompts(results);
            } else {
                const res = await fetch("/api/prompt");
                const allPrompts = await res.json();
                allPrompts.reverse();

                setPrompts(allPrompts);
            }
        };
        getAllPromptsOrSearchPrompt();
    }, [textQuery]);

    return (
        <>
            <Search text={searchText} setText={setSearchText} />
            <section
                className="mt-16 py-8 w-full flex-center flex-col gap-y-6
        sm:flex-row sm:flex-wrap sm:gap-6 sm:min-w-[744px] xl:justify-normal sm:items-start"
            >
                {prompts?.length !== 0 ? (
                    prompts?.map((item) => (
                        <User
                            key={item._id}
                            prompt={item.prompt}
                            tag={item.tag}
                            username={item.creator.username}
                            userId={item.creator._id}
                            email={item.creator.email}
                            image={item.creator.image}
                            handleClickTag={handleClickTag}
                        />
                    ))
                ) : (
                    <h2 className="text-2xl xl:ml-[40%] text-center font-inter blue_gradient font-bold">
                        Not found any prompt
                    </h2>
                )}
            </section>
        </>
    );
};

export default Community;
