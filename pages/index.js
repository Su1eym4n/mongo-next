import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';
import clientPromise from "../lib/mongodb";
import { useState, useEffect } from 'react';

export default function Home({ posts, response }) {
    const [postsState, setPostsState] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setPostsState(posts);
    }, [posts]);

    const submit = async (e) => {
        e.preventDefault();
        // const obj = { title: label, text: msg }
        // const client = await clientPromise;
        // const db = client.db("sample_posts");
        // db.collection('posts').insert_one(obj)
        let dev = process.env.NODE_ENV !== 'production';
        let dev_url = 'http://localhost:3000'
        let prod_url = 'https://mongo-next-umber.vercel.app'

        let res = await fetch(`${dev ? dev_url:prod_url}/api/posts`, {
            method: "POST",
            // headers:{
            //     "Access-Control-Allow-Origin" : "*", 
            //     "Access-Control-Allow-Credentials" : true ,
            //     "Content-Type": "application/json",

            // },
            body: JSON.stringify({
                title: title,
                content: content,
            }),
        });
        console.log('good')
        res = await res.json();
        console.log('good')
        setPostsState([...postsState, res]);
        setTitle("");
        setContent("");
        setLoading(false);
        console.log("posts", postsState)
    }

    
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {postsState.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {postsState.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>

                    )}
                    <div className={styles.card}>
                        <form onSubmit={submit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                type="text"
                                name="content"
                                rows="10"
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button type="submit" disabled={loading ? true : false}>
                                {loading ? "Adding" : "Add"}
                            </button>
                        </form>
                    </div>
                    {response}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const client = await clientPromise;
    const db = client.db("sample_posts");
    let posts = await db.collection("posts").find({}).toArray();
    posts = JSON.parse(JSON.stringify(posts));


    return {
        props: { posts },
    };

}