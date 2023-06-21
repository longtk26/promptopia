import Form from "@components/Form";

const UpdatePromptId = ({ params }) => {
    const promptId = params.id;

    return <Form title="Edit Post" action="Edit" promptId={promptId} />;
};

export default UpdatePromptId;
