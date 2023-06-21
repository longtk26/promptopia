import { useContext } from "react";
import { ProfileContext } from "@app/profile/page";
import Link from "next/link";

const EditButton = ({ promptId, userId }) => {
    const { getPrompts } = useContext(ProfileContext);

    const deletePrompt = async (id) => {
        const isAccept = confirm("Do you want to delete this prompt?");
        if (isAccept) {
            await fetch(`/api/prompt/${id}`, { method: "DELETE" });
            await getPrompts(userId);
        }
    };

    return (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <Link
                href={`/update-prompt/${promptId}`}
                className="font-inter text-sm green_gradient cursor-pointer"
            >
                Edit
            </Link>
            <button
                onClick={() => deletePrompt(promptId)}
                className="font-inter text-sm orange_gradient cursor-pointer"
            >
                Delete
            </button>
        </div>
    );
};

export default EditButton;
