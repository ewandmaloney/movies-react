import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const MovieDetail = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movie, setMovie] = useState();
  const [movieUrl, setMovieUrl] = useState(
    `https://api.themoviedb.org/3/movie/${params.id}?language=es-ES`
  );

  const [movieTrailer, setMovieTrailer] = useState(
    `https://api.themoviedb.org/3/movie/${params.id}/videos?language=es-ES`
  );

  useEffect(() => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGY4MGU4ZjI5NDJkYzc0YTVlNWU2M2M2NDk4NDdiYiIsInN1YiI6IjYyNzkzZGU4Mzg5ZGExMDA1MDhmNjZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1fNyKKgFvDWOEJ_yj_ps7D8yqToOJZ1jmNS3KXa-rQ",
      },
    };
    const fetch = async () => {
      const res = await axios.get(movieTrailer, options);
      console.log(res.data.results);
      setMovieTrailer(res);
    };
    fetch();
  }, [movieTrailer]);

  useEffect(() => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGY4MGU4ZjI5NDJkYzc0YTVlNWU2M2M2NDk4NDdiYiIsInN1YiI6IjYyNzkzZGU4Mzg5ZGExMDA1MDhmNjZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1fNyKKgFvDWOEJ_yj_ps7D8yqToOJZ1jmNS3KXa-rQ",
      },
    };
    const fetch = async () => {
      const res = await axios.get(movieUrl, options);
      setMovie(res.data);
    };
    fetch();
  }, [movieUrl]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box
      sx={{
        width: "900px",
        height: "900px",
        margin: "0 auto",
      }}
    >
      <Grid
        container
        spacing={2}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        {!movie ? null : (
          <>
            <Grid item>
              <img
                className="movies-img"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt="movie-image"
              />
            </Grid>
            <Grid
              item
              display="flex"
              flexDirection="column"
              gap={4}
              justifyContent="flex-start"
              sx={{ width: 500 }}
            >
              <Typography variant="h5" component="div" color="violet">
                Titulo:
              </Typography>
              <Typography variant="h5" component="div" color="white">
                {movie.title}
              </Typography>
              <Typography variant="h5" component="div" color="violet">
                Generos:
              </Typography>
              <Typography variant="h5" component="div" color="white">
                {movie.genres.map((genres) => (
                  <>{genres.name + " "}</>
                ))}
              </Typography>
              <Typography variant="h5" component="div" color="violet">
                Descripcion:
              </Typography>
              <Typography variant="h5" component="div" color="white">
                {movie.overview}
              </Typography>
            </Grid>
          </>
        )}
        <Grid container>
          {!movieTrailer ? null : (
            <div>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Ver trailer
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Trailer oficial
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetail;
