export const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
};

export const deletePrompt = async (id) => {
    const isAccept = confirm("Do you want to delete this prompt?");
    if (isAccept) {
        await fetch(`/api/prompt/${id}`, { method: "DELETE" });
    }
};
