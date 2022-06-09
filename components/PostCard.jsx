import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function PostCard({ post }) {
        return (
        <>
            <div className={styles.postWrapp}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        </>
    );
}