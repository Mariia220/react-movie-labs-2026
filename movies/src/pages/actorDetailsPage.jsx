import React from "react";
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getActor } from "../api/tmdb-api"; 
import Spinner from '../components/spinner';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ActorDetailsPage = () => {
  const { id } = useParams(); 

  const { data: actor, isPending: actorPending } = useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActor,
  });

  const { data: credits, isPending: creditsPending } = useQuery({
    queryKey: ["actorCredits", { id: id }],
    queryFn: getActorMovieCredits,
  });

  if (actorPending) return <Spinner />;
  if (creditsPending) return <Spinner />;

  return (
    <div style={{ padding: "20px" }}>
      {actor ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {actor.name}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Biography
            </Typography>

            <Typography variant="body1" gutterBottom>
              {actor.biography || "No biography available for this actor."}
            </Typography>

            <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
              <Typography variant="h6">Personal Info</Typography>
              <Typography>Known for: {actor.known_for_department}</Typography>
              <Typography>Birthday: {actor.birthday}</Typography>
              <Typography>Place of Birth: {actor.place_of_birth}</Typography>
            </Paper>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Known For (Movies)
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {credits.cast && credits.cast.slice(0, 12).map((m) => (
                  <Link key={m.id} to={`/movies/${m.id}`} style={{ textDecoration: 'none' }}>
                    <Chip 
                      label={m.title} 
                      variant="outlined" 
                      clickable 
                      color="primary"
                      sx={{ m: 0.5 }}
                    />
                  </Link>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h4">Actor details not found</Typography>
      )}
    </div>
  );
};

export default ActorDetailsPage;