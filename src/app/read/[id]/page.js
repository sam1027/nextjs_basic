import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default async function Read(props){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${props.params.id}`, {cache: 'no-store'});
    const topic = await res.json();
    return(
        <Stack spacing={2}>
            <Typography variant="h3" gutterBottom>{topic.title}</Typography>
            <Typography variant="body1" gutterBottom>
                {topic.body}
            </Typography>
        </Stack>
    )
}