import { Link, useParams } from "react-router-dom";
import { useAppStore } from "../shared/store";
import { BeatsPerBarDisplay } from "../components/beats-per-bar.display";
import { BpmDisplay } from "../components/bpm.display";
import { DescriptionDisplay } from "../components/description.display";
import { NotesPerBeatDisplay } from "../components/notes-per-beat.display";
import { TracksDisplay } from "../components/tracks.display";

export function BeatPage() {
  const { beatId } = useParams();
  const { getBeatById } = useAppStore();
  const beat = getBeatById(beatId!);

  if (!beat) return <div>oopsy..</div>;

  return (
    <div>
      <Link to="/dashboard">←</Link>

      <h1>{beat.title}</h1>

      <DescriptionDisplay />

      <BpmDisplay />

      <BeatsPerBarDisplay />

      <NotesPerBeatDisplay />

      <TracksDisplay />
    </div>
  );
}
