"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createPrompt, editPrompt } from "@utils";

const Form = ({ title, action, promptId }) => {
    const router = useRouter();
    const promptRef = useRef();
    const tagRef = useRef();
    const [buttonAction, setButtonAction] = useState(action);
    const { data: session } = useSession();
    const username = session?.user?.name.replace(" ", "").toLowerCase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = e.target[0].value;
        const tag = e.target[1].value;

        if (action === "Create") {
            await createPrompt(
                setButtonAction,
                session?.user.id,
                prompt,
                tag,
                username
            );
            router.push("/");
        } else {
            await editPrompt(setButtonAction, promptId, prompt, tag);
            router.push("/");
        }
    };

    useEffect(() => {
        if (action === "Edit") {
            const getPrompt = async () => {
                const res = await fetch(`/api/prompt/${promptId}`);
                const prompt = await res.json();
                promptRef.current.value = prompt.prompt;
                tagRef.current.value = prompt.tag;
            };
            getPrompt();
        }
    }, [action]);

    return (
        <section className="w-full">
            <h1 className="sm:text-[60px] text-[48px] font-[800]">
                <span className="blue_gradient">{title}</span>
            </h1>
            <p className="desc">
                {action} and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform
            </p>
            <form
                onSubmit={handleSubmit}
                className="glassmorphism mt-10 flex flex-col gap-7 max-w-2xl"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>

                    <textarea
                        ref={promptRef}
                        placeholder="Write your post here"
                        required
                        className="form_textarea"
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Field of Prompt{" "}
                        <span className="font-normal">
                            {" "}
                            (#product, #webdevelopment, #idea, etc.)
                        </span>
                    </span>
                    <input
                        ref={tagRef}
                        placeholder="#Tag"
                        className="form_input"
                        type="text"
                        required
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {buttonAction}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
