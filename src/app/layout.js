import Link from "next/link";
import "./globals.css";
import { Controls } from "../components/Controls";
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';

export const metadata = {
  title: "WEB Tutorial",
  description: "Generated by YSE",
};

export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {cache: 'no-store'});
  const topics = await res.json();
  return (
    <html lang="en">
      <body>
        <Container>
          <Grid container spacing={2} md={12}>
            <h1><Link href="/">Blog Post</Link></h1>
          </Grid>

          <Grid container spacing={10}>
            <Grid md={3}>
              <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <MenuList>
                  {topics.map(topic => {
                    return (
                      <MenuItem key={topic.id}>
                        <Link href={`/read/${topic.id}`}><ListItemText>{topic.title}</ListItemText></Link>
                      </MenuItem>
                    )
                  })}
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <Link href="/create"><ListItemText>Add</ListItemText></Link>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grid>
            <Grid container direction={"column"} justifyContent="space-between" md={9} spacing={2}>
              <Grid>
                {children}
              </Grid>
              <Grid container direction={"row"} justifyContent={"flex-end"}>
                <Controls />
              </Grid>
            </Grid>
          </Grid>

        </Container>
      </body>
    </html>
  );
}
