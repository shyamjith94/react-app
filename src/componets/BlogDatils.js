import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";





const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch("http://localhost:8000/blogs/" + id)
    const history = useHistory()

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('test 1');
    const [isUpdating, setIsUpdating] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setTitle(blog.title)
        setBody(blog.body)
        setAuthor(blog.author)
    }

    const handleClickDelete = () => {
        fetch("http://localhost:8000/blogs/" + blog.id,
            {
                method: 'DELETE'
            }).then(() => {
                history.push('/')
            })
    }
    const handleUpdate = (e) => {
        setIsUpdating(true)
        e.preventDefault();
        const newBlog = { id, title, body, author }
        fetch("http://localhost:8000/blogs/" + id, {
            method: 'PUT',
            headers: { "content-Type": 'application/json' },
            body: JSON.stringify(newBlog)
        }).then(() => {
            setIsUpdating(false)
            window.location.reload();
        }
        )
    }
    return (
        <div className="blog-details">
            {isPending && <div> Loading... </div>}
            {error && <div>Error</div>}
            {blog && (
                <article>

                    <h2>{blog.title}</h2>
                    <p>written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <Button variant="danger" onClick={handleClickDelete}> Delete</Button>
                    <Button variant="warning" onClick={handleShow}> Update</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Blog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>blog title</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>blog body</Form.Label>
                                    <Form.Control as="textarea" rows={6} value={body} onChange={(e) => setBody(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>blog author</Form.Label>
                                    <Form.Select value={author} onChange={(e) => setAuthor(e.target.value)} >
                                        <option value="test 1">test 1</option>
                                        <option value="test 2">test 2</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose}>Close</Button>
                            {!isUpdating && <Button variant="success" onClick={handleUpdate}>Update Blog</Button>}
                            {isUpdating && <Button variant="success" disabled>Updating Blog</Button>}
                        </Modal.Footer>
                    </Modal>
                </article>

            )}



        </div>

    );
}

export default BlogDetails;