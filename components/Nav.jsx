"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "@public/assets/images/logo.svg";
import Link from "next/link";

const Nav = () => {
    const { data: session } = useSession();
    const [displayDrop, setDisplayDrop] = useState(false);

    return (
        <nav className="flex h-[46px] justify-between items-center w-full pt-3 mb-16">
            <div className="flex items-center gap-2">
                <Image src={logo} alt="logo" width={30} height={30} />
                <p className="logo_text">Promptopia</p>
            </div>
            {session?.user ? (
                //Desktop
                <>
                    <div className="relative hidden sm:flex gap-3 md:gap-5">
                        <Link className="black_btn" href="/create-prompt">
                            Create post
                        </Link>
                        <button className="outline_btn" onClick={signOut}>
                            Sign out
                        </button>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="profile_img"
                            className="cursor-pointer rounded-full"
                        />
                    </div>
                    {/* Mobile */}
                    <div className="relative sm:hidden">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="profile_img"
                            className="cursor-pointer rounded-full"
                            onClick={() => setDisplayDrop((pre) => !pre)}
                        />
                        {displayDrop && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link">
                                    My profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                >
                                    Create prompt
                                </Link>
                                <button
                                    className="black_btn w-full mt-5"
                                    onClick={signOut}
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <button className="black_btn" onClick={signIn}>
                    Sign in
                </button>
            )}
        </nav>
    );
};

export default Nav;
