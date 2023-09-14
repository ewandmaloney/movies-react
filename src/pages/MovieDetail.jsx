import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const MovieDetail = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movie, setMovie] = useState();
  const [item, setItem] = useState();
  const [trailer, setTrailer] = useState();
  const [movieUrl, setMovieUrl] = useState(
    `https://api.themoviedb.org/3/movie/${params.id}?language=es-ES`
  );

  const [movieTrailer, setMovieTrailer] = useState(
    `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`
  );
  const [fullText, setFullText] = useState();

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
      setItem(res.data.results);
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
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 500,
    bgcolor: "#181818",
    border: "2px solid #000",
    boxShadow: "24",
    p: 4,
  };

  const noTrailer = {
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#181818",
    border: "2px solid #000",
    boxShadow: "24",
    p: 4,
  };

  const fullDescription = (text) => {
    setFullText((prevText) => (prevText ? null : text));
  };

  useEffect(() => {
    if (item !== undefined) {
      setTrailer(item.filter((trailer) => trailer.type == "Trailer"));
    }
  }, [item]);

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
                className="moviesDetail-img"
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
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                variant="h5"
                component="div"
                color="white"
              >
                {movie.overview.length > 200 ? (
                  <>
                    <p>
                      {!fullText
                        ? movie.overview.substring(0, 200) + "..."
                        : fullText}
                    </p>
                    <p
                      className="full-description"
                      onClick={() => fullDescription(movie.overview)}
                    >
                      {fullText
                        ? "Ocultar descripción"
                        : "Ver descripción completa"}
                    </p>
                  </>
                ) : movie.overview.length == "" ? (
                  <p>No description available for this movie</p>
                ) : (
                  <>{movie.overview}</>
                )}
              </Typography>
              {!item ? null : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LiveTvIcon />}
                    onClick={handleOpen}
                  >
                    Ver trailer
                  </Button>
                  {trailer ? (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={trailer.length > 0 ? style : noTrailer}>
                        <Typography
                          textAlign="center"
                          color="white"
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                        >
                          {trailer.length > 0 ? 'Trailer oficial' : 'Error'}
                        </Typography>
                        <Typography textAlign="center">
                          {trailer.length > 0 ? (
                            <>
                              <iframe
                                width="800"
                                height="400"
                                src={`https://www.youtube.com/embed/${trailer[0].key}`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                              />
                            </>
                          ) : (
                            <Typography
                              variant="h5"
                              component="div"
                              textAlign="center"
                              color="white"
                            >
                              No trailer available for this movie
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    </Modal>
                  ) : null}
                </Box>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default MovieDetail;
