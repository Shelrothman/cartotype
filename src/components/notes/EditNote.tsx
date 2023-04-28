import { NoteForm } from "./NoteForm";
import { NoteData, Tag } from "../../types";
import { useNote } from "./NoteLayout";


type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
}



export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps): JSX.Element {
    const note = useNote();

    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                availableTags={availableTags}
            />
        </>
    )
}