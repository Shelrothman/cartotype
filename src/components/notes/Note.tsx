import { useNote } from "./NoteLayout";
import { Badge, Button, Stack, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


type NoteProps = {
    onDelete: (id: string) => void;
}


export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                                <Badge className='text-truncate raw-tag-badge' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal" className="mb-2">
                        {/* <Link to={`${note.id}/edit`}> */}
                        <Link to="edit">
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button variant="danger" onClick={() => {
                            onDelete(note.id);
                            navigate('/notes');
                        }}>
                            Delete
                        </Button>
                        <Link to="..">
                            <Button variant="secondary">Back</Button>
                        </Link>
                    </Stack>
                    {/* // !  PUT THE STORE TAGS IN HURRRRRR or uder the others depending on what looks betta... maybe in a different place */}
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                                <Badge className='text-truncate store-tag-badge' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
            </Row>
            <ReactMarkdown children={note.markdown} remarkPlugins={[remarkGfm]} />
        </>
    )
}