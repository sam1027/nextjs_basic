"use client"
import { Button } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import Box from '@mui/material/Box';

export function Controls() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const id = params.id;

  console.log(pathname);

  const deletePost = () => {
    if(confirm("삭제하시겠습니까?")){
      const option = {
        method: 'DELETE'
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, option)
      .then(res => res.json())
      .then(result => {
        router.push('/');
        router.refresh();
      });
    }

  }

  return (
    <>
      {id && !pathname.includes("update") ? 
        <Box component="section">
          <Link href={`/update/${id}`} style={{marginRight: "5px"}}><Button variant="outlined">Edit</Button></Link>
          <Button variant="outlined" color="error" onClick={() => deletePost()}>Delete</Button>
        </Box> : null 
      }
    </>
  );
}
