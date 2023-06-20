import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import CopyIcon from "@public/assets/icons/copy.svg";
import TickIcon from "@public/assets/icons/tick.svg";
import { copyToClipboard, deletePrompt } from "@utils";

const User = ({
    prompt = "Hi all",
    tag = "hello",
    username,
    email,
    image,
    userId,
    promptId,
    editEnable,
}) => {
    const [active, setActive] = useState(false);
    const [stateBtn, setStateBtn] = useState("copy");
    const { data: session } = useSession();

    const linkNavigate =
        session?.user.id === userId
            ? "/profile"
            : `/profile/${userId}?name=${username}`;

    const handleClick = () => {
        copyToClipboard(prompt);
        setStateBtn("tick");
    };

    useEffect(() => {
        const id = setTimeout(() => {
            setStateBtn("copy");
        }, 2000);

        return () => {
            clearTimeout(id);
        };
    }, [stateBtn]);

    return (
        <div
            className="w-full bg-transparent rounded-[0.5rem] pt-6 px-6 pb-4 border-[1px] border-[#d1d5db]
       sm:w-[360px]"
        >
            <div className="flex justify-between">
                <Link
                    className="flex items-center gap-3"
                    href={`${linkNavigate}`}
                >
                    <Image
                        src={image}
                        alt="user_image"
                        className="rounded-full cursor-pointer"
                        width={40}
                        height={40}
                    />
                    <div className="min-w-[210px] cursor-pointer">
                        <h3 className="truncate font-satoshi text-gray-900 font-semibold">
                            {username}
                        </h3>
                        <span className="truncate text-gray-500 font-inter text-[14px]">
                            {email}
                        </span>
                    </div>
                </Link>
                <button className="copy_btn" onClick={handleClick}>
                    {stateBtn === "copy" ? (
                        <Image
                            src={CopyIcon}
                            alt="copy_icon"
                            width={12}
                            height={12}
                        />
                    ) : (
                        <Image
                            src={TickIcon}
                            alt="tick_icon"
                            width={12}
                            height={12}
                        />
                    )}
                </button>
            </div>
            <p
                className={`text-[14px] font-inter my-4 ${
                    active ? "" : "truncate"
                }`}
            >
                {prompt}
            </p>
            <span
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => setActive((prev) => !prev)}
            >
                {active ? "Collapsed" : "View all..."}
            </span>
            <p className="text-[14px] mt-2 font-inter blue_gradient cursor-pointer">
                #{tag}
            </p>

            {editEnable && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <button className="font-inter text-sm green_gradient cursor-pointer">
                        Edit
                    </button>
                    <button
                        onClick={() => deletePrompt(promptId)}
                        className="font-inter text-sm orange_gradient cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default User;
