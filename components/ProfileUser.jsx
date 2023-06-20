import User from "./User";

const ProfileUser = ({ user, prompts, isLogin, refresh }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {user?.username || "My"} Profile
                </span>
            </h1>
            {isLogin ? (
                <>
                    <p className="desc text-left">
                        Welcome to your personalized profile page. Share your
                        exceptional prompts and inspire others with the power of
                        your imagination
                    </p>
                </>
            ) : (
                <>
                    <p className="desc text-left">
                        Welcome to {user?.username}'s personalized profile page.
                        Explore
                        {user?.username}'s exceptional prompts and be inspired
                        by the power of their imagination
                    </p>
                </>
            )}
            <div
                className="mt-10 py-8 w-full flex-center flex-col gap-y-6
sm:flex-row sm:flex-wrap sm:gap-6 sm:min-w-[744px] xl:justify-normal sm:items-start"
            >
                {prompts?.map((item) => (
                    <User
                        key={item._id}
                        prompt={item.prompt}
                        promptId={item._id}
                        tag={item.tag}
                        username={
                            user.username ||
                            user?.name.replace(" ", "").toLowerCase()
                        }
                        email={user.email}
                        image={user.image}
                        userId={user.id}
                        editEnable={isLogin}
                        refresh={refresh}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProfileUser;
