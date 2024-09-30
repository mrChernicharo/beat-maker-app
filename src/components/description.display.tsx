import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";

export function DescriptionDisplay() {
  const { beatId } = useParams();
  const { getBeatById, updateBeat } = useAppStore();
  const beat = getBeatById(beatId!);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditingDescription, setIsEditingDescription] = useState(false);

  if (!beat) return null;

  return (
    <div>
      {isEditingDescription ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => setIsEditingDescription(false)}>x</button>
          <textarea ref={textareaRef} defaultValue={beat.description} name="beat-description" id="beat-description" />
          <button
            onClick={() => {
              const val = textareaRef?.current?.value;
              if (!val) return;
              updateBeat(beat.id, { description: val });
              setIsEditingDescription(false);
            }}
          >
            Confirm
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>{beat.description || "adicionar descrição"}</div>
          <button onClick={() => setIsEditingDescription(true)}>Editar Descrição</button>
        </div>
      )}
    </div>
  );
}
