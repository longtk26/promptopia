"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Form = ({ title }) => {
    const router = useRouter();
    const [buttonCreate, setButtonCreate] = useState("Create");
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = e.target[0].value;
        const tag = e.target[1].value;
        setButtonCreate("Creating...");
        await fetch("/api/prompt/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: session?.user.id,
                prompt,
                tag,
            }),
        });
        router.push("/");
    };

    return (
        <section className="w-full">
            <h1 className="sm:text-[60px] text-[48px] font-[800]">
                <span className="blue_gradient">{title}</span>
            </h1>
            <p className="desc">
                Create and share amazing prompts with the world, and let your
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
                        {buttonCreate}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
