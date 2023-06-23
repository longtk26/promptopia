export const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
};

export const createPrompt = async (setState, id, prompt, tag, username) => {
    setState("Creating...");
    await fetch("/api/prompt/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            prompt,
            tag,
            username,
        }),
    });
};

export const editPrompt = async (setState, id, prompt, tag) => {
    setState("Editing...");
    await fetch(`/api/prompt/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            prompt,
            tag,
        }),
    });
};
