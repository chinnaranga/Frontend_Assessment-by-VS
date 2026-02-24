import { useState, useEffect, useRef } from "react";
import BaseNode from "./BaseNode";
import { useStore } from "../store";
import "./TextNode.css";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [bindings, setBindings] = useState(data?.bindings || {});
  const textareaRef = useRef(null);

  // Access global store
  const { nodes, onConnect } = useStore((state) => ({
    nodes: state.nodes,
    onConnect: state.onConnect,
  }));

  // Identify available input nodes
  const availableInputs = nodes
    .filter((n) => n.type === "customInput")
    .map((n) => ({
      id: n.id,
      label: n.data?.inputName || n.id,
    }));

  // Extract {{variables}} from text
  const variables = Array.from(
    new Set(text.match(/{{\s*([\w]+)\s*}}/g)?.map(v =>
      v.replace(/[{}]/g, "").trim()
    )) || []
  );

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  // Handle Binding Changes
  useEffect(() => {
    Object.entries(bindings).forEach(([variable, sourceId]) => {
      if (!sourceId || !variables.includes(variable)) return;

      const targetHandle = `${id}-${variable}`;

      console.log(`Auto-connecting ${sourceId} to ${targetHandle}`);

      // Create proper connection object
      onConnect({
        source: sourceId,
        sourceHandle: `${sourceId}-value`, // Assuming standard output handle for input node
        target: id,
        targetHandle: targetHandle,
      });
    });
  }, [bindings]); // Intentionally not including onConnect/variables to avoid loops, mostly driven by user action

  // Update bindings when dropdown changes
  const handleBindingChange = (variable, sourceId) => {
    setBindings((prev) => ({
      ...prev,
      [variable]: sourceId,
    }));
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variables.map((v) => ({
        id: `${id}-${v}`,
      }))}
      outputs={[
        {
          id: `${id}-output`,
        },
      ]}
    >
      <div className="text-node-content">
        <textarea
          ref={textareaRef}
          className="text-node-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Hello {{input_1}}"
          style={{
            width: "100%",
            resize: "none",
            overflow: "hidden",
          }}
        />

        {/* VARIABLE BINDING SECTION */}
        {variables.length > 0 && (
          <div className="variable-bindings">
            {variables.map((variable) => (
              <div key={variable} className="binding-row">
                <label>{variable}</label>
                <select
                  value={bindings[variable] || ""}
                  onChange={(e) => handleBindingChange(variable, e.target.value)}
                >
                  <option value="">Select Input...</option>
                  {availableInputs.map((input) => (
                    <option key={input.id} value={input.id}>
                      {input.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
