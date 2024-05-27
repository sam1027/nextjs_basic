"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
            <Stack spacing={2}>
                <TextField id="standard-basic" label="Title" variant="standard" name="title" value={title}/>
                <TextField
                    id="standard-multiline-flexible"
                    label="Content"
                    multiline
                    maxRows={4}
                    variant="standard"
                    name="body"
                    defaultValue={body}
                />
                <Button variant="outlined" type="submit">Save</Button>
            </Stack>
        </form>
    )
}