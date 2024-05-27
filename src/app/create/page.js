"use client"

import { useRouter } from "next/navigation";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Create(){
    const router = useRouter();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            };

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, options)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                const newId = result.id;
                router.push(`/read/${newId}`);
                router.refresh();
            });
        }}>
            <Stack spacing={2}>
                <TextField id="standard-basic" label="Title" variant="standard" name="title" />
                <TextField
                    id="standard-multiline-flexible"
                    label="Content"
                    multiline
                    maxRows={4}
                    variant="standard"
                    name="body"
                />
                <Button variant="outlined" type="submit">Save</Button>
            </Stack>
        </form>
    )
}