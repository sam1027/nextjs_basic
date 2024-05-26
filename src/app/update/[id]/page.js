"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(props){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${props.params.id}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setTitle(result.title);
            setBody(result.body);
        });
    }, []);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            };

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${props.params.id}`, options)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                router.push(`/read/${props.params.id}`);
                router.refresh();
            });
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </p>
            <p>
                <textarea name="body" placeholder="body" defaultValue={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value={"수정"} />
            </p>
        </form>
    )
}