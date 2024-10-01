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
    <div className="max-w-[600px]">
      {isEditingDescription ? (
        <div className="relative flex flex-col">
          <div className="text-right">
            <button onClick={() => setIsEditingDescription(false)}>x</button>
          </div>
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
        <div className="flex items-center">
          <div>{beat.description || "adicionar descrição"}</div>
          <button onClick={() => setIsEditingDescription(true)}>✏️</button>
        </div>
      )}
    </div>
  );
}
