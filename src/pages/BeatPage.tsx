import { useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { useRef, useState } from "react";

export function BeatPage() {
  const { beatId } = useParams();
  const { getBeatById } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return <div>oopsy..</div>;

  return (
    <div>
      <h1>{beat.title}</h1>

      <DescriptionDisplay />
    </div>
  );
}

export function DescriptionDisplay() {
  const { beatId } = useParams();
  const { getBeatById, updateBeat } = useAppStore();
  const beat = getBeatById(beatId!);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditingDescription, setIsEditingDescription] = useState(false);

  if (!beat) return null;

  console.log(beat);

  return (
    <div>
      <div>
        <label htmlFor="beat-description">Description</label>
      </div>
      {isEditingDescription ? (
        <>
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
        </>
      ) : (
        <>
          <div>{beat.description || "adicionar descrição"}</div>
          <button onClick={() => setIsEditingDescription(true)}>Editar</button>
        </>
      )}
    </div>
  );
}
