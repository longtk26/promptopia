import Link from "next/link";
import Image from "next/image";
import CopyIcon from "@public/assets/icons/copy.svg";

const User = ({
    prompt = "Hi all",
    tag = "hello",
    username,
    email,
    image,
    userId,
}) => {
    return (
        <div
            className="w-full bg-transparent rounded-[0.5rem] pt-6 px-6 pb-4 border-[1px] border-[#d1d5db]
       sm:w-[360px] max-h-[300px]"
        >
            <div className="flex justify-between">
                <Link
                    className="flex items-center gap-3"
                    href={`/profile/${userId}?name=${username}`}
                >
                    <Image
                        src={image}
                        alt={username}
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
                <button className="copy_btn">
                    <Image
                        src={CopyIcon}
                        alt="copy_icon"
                        width={12}
                        height={12}
                    />
                </button>
            </div>
            <p className="text-[14px] font-inter my-4 truncate">{prompt}</p>
            <span className="font-inter text-sm blue_gradient cursor-pointer">
                View all...
            </span>
            <p className="text-[14px] mt-2 font-inter blue_gradient cursor-pointer">
                #{tag}
            </p>
        </div>
    );
};

export default User;
