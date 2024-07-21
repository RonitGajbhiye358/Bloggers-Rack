import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.UserID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.Image);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8 ">
            <Container >
                <div className="  bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg p-5 rounded-lg">
                <div className=" w-auto flex h-[60vh] justify-center mb-4 relative rounded-md p-2">
                    <img
                        src={appwriteService.getFilePreview(post.Image)}
                        alt={post.Title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6 ">
                    <h1 className="text-2xl font-bold text-center">{post.Title}</h1>
                </div>
                <div className="browser-css text-center">
                    {typeof post.Content === "string" ? parse(post.Content) : null}
                </div>
                </div>
            </Container>
        </div>
    ) : null;
}
