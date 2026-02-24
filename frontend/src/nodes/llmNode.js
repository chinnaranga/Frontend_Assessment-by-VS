import BaseNode from "./BaseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM (Legacy)"
      inputs={[
        { id: `${id}-system`, style: { top: "33%" } },
        { id: `${id}-prompt`, style: { top: "66%" } },
      ]}
      outputs={[`${id}-response`]}
    >
      <div className="text-sm text-gray-400">
        This is a LLM.
      </div>
    </BaseNode>
  );
};
