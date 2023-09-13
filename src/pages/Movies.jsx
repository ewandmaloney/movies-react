import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [page, setPage] = useState(1);

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${page}`
  );

  const navigate = useNavigate();

  const loadMoreFilms = () => {
    const number = page;
    setUrl(
      `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${
        number + 1
      }`
    );
    setPage(number + 1);
  };

  const goToDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  const [movies, setMovies] = useState();

  useEffect(() => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGY4MGU4ZjI5NDJkYzc0YTVlNWU2M2M2NDk4NDdiYiIsInN1YiI6IjYyNzkzZGU4Mzg5ZGExMDA1MDhmNjZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1fNyKKgFvDWOEJ_yj_ps7D8yqToOJZ1jmNS3KXa-rQ",
      },
    };
    const fetch = async () => {
      const res = await axios.get(url, options);
      console.log(res.data.results);
      setMovies(res.data.results);
    };
    fetch();
  }, [url]);

  return (
    <Box
      sx={{
        marginLeft: "50px",
        marginRight: "30px",
        marginBottom: "30px",
      }}
    >
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {!movies ? null : (
          <>
            {movies.map((movie, index) => (
              <Grid
                item
                key={index}
                lg={12 / 5}
                display="flex"
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Card
                  className="movies-card"
                  onClick={() => goToDetails(movie.id)}
                  sx={{
                    marginBottom: "30px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0px 11px 12px 0px rgba(0,0,0,0.75);",
                    background: "transparent",
                    ":hover": {
                      transform: "translateY(-5px);",
                    },
                  }}
                >
                  <img
                    className="movies-img"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt="poster image"
                    width="300px"
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "80%",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                      variant="h6"
                      component="div"
                      color="white"
                    >
                      {movie.title.length > 20 ? (
                        <>{movie.title.substring(0, 20) + "..."}</>
                      ) : (
                        <>{movie.title}</>
                      )}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="div"
                      color={
                        movie.vote_average > 7
                          ? "green"
                          : movie.vote_average <= 7 && movie.vote_average >= 5
                          ? "orange"
                          : "red"
                      }
                    >
                      {movie.vote_average}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Typography
        onClick={loadMoreFilms}
        variant="h5"
        component="div"
        textAlign="center"
        sx={{
          color: "white",
          marginTop: "10px",
          cursor: "pointer",
          ":hover": {
            textDecoration: "underline",
          },
        }}
      >
        Siguiente página
      </Typography>
    </Box>
  );
};

export default Movies;
