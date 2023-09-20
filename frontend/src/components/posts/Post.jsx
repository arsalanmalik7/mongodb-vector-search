import React from 'react';
import { useState, useRef } from 'react';
import './post.css'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash, Pencil } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/button';
import axios from 'axios';






const Post = ({ eachPost, onDelete, onUpdate }) => {


    const [editeShow, setEditShow] = useState(false);

    const editeHandleClose = () => setEditShow(false);
    const editHandleShow = () => setEditShow(true);



    const instance = axios.create({
        baseURL: "http://localhost:3001/api"
    })

    const [deleteShow, deleteSetShow] = useState(false);
    const deleteHandleClose = () => deleteSetShow(false);
    const deleteHandleShow = () => deleteSetShow(true);
    const [deletePost, setDeletePost] = useState(true);

    const [prevTitle, setPrevTitle] = useState("");
    const [prevText, setPrevText] = useState("");

    const postIdRef = useRef(null);

    const handleDeleteClick = () => {
        postIdRef.current = eachPost._id;

        deleteHandleShow()

    }

    const handleSaveClick = async () => {
        const postId = postIdRef.current;

        const response = await instance.delete(`/post/${postId}`)
        try {
            setDeletePost(response.data);
            onDelete(postId);
        } catch (error) {
            console.log(error.data)
        }

        deleteHandleClose()
    }

    const handleEditClick = async (e) => {

        setPrevTitle(eachPost.title);
        setPrevText(eachPost.text);

        editHandleShow();

    }

    const updateClick = async () => {

        const postId = eachPost._id;

        try {
            const response = await instance.put(`/post/${postId}`, {
                title: prevTitle,
                text: prevText
            })

            console.log(response.data);

            const updatedPost = {
                _id: postId,
                title: prevTitle,
                text: prevText
            }


            onUpdate(updatedPost);

            editeHandleClose();
        } catch (error) {
            console.log(error.data)

        }
    }


    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center m-3 mb-5'>
                <Card border="dark" style={{ width: '20rem' }}>
                    <Card.Header className='text-center' as={"h4"}>{eachPost.title}</Card.Header>
                    <Card.Body>
                        <Card.Title className='p-3'>{eachPost.text}</Card.Title>
                        <Card.Footer className='d-flex justify-content-around'>
                            <button className='btn btn-info' onClick={handleDeleteClick}>
                                <Trash />Delete
                            </button >
                            <button className='btn btn-info' onClick={handleEditClick}>
                                <Pencil />Edit
                            </button >
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={deleteShow} onHide={deleteHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete Post Permenently?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteHandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {deletePost && (

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>

                        <h1>
                            {deletePost}
                        </h1>
                    </Modal.Body>

                </Modal>)}

            <Modal show={editeShow} onHide={editeHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title of Post</Form.Label>
                            <Form.Control
                                type="text"
                                value={prevTitle}
                                onChange={(e) => setPrevTitle(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>text of Post</Form.Label>
                            <Form.Control as="textarea" rows={3} value={prevText} onChange={(e) => setPrevText(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editeHandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >

        </>
    )
}

export default Post;
