import { Handle, Position } from "reactflow";
import "./BaseNode.css"; // 👈 ADD THIS

export default function BaseNode({
  title,
  inputs = [],
  outputs = [],
  children,
}) {
  return (
    <div className="base-node">
      <div className="base-node-header">{title}</div>

      {/* LEFT HANDLE COLUMN */}
      <div
        style={{
          position: "absolute",
          left: -16,
          top: 40,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          zIndex: 9999,
          pointerEvents: "all",
        }}
      >
        {inputs.map((input) => {
          const handleId = typeof input === "string" ? input : input.id;
          return (
            <Handle
              key={handleId}
              id={handleId}
              type="target"
              position={Position.Left}
              isConnectable={true}
              className="target-handle"
              style={{
                top: "auto",
                background: "#6366f1",
                width: 16,
                height: 16,
                border: "2px solid #111827",
                borderRadius: "50%",
                left: -8,
                zIndex: 9999,
              }}
            />
          );
        })}
      </div>

      <div className="base-node-body">{children}</div>

      {outputs.map((output) => {
        const id = typeof output === "string" ? output : output.id;
        const style = typeof output === "string" ? {} : output.style;

        return (
          <Handle
            key={id}
            id={id}
            type="source"
            position={Position.Right}
            style={{
              right: -10,
              zIndex: 10,
              pointerEvents: "all",
              ...style,
            }}
          />
        );
      })}
    </div>
  );
}
