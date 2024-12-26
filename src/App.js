import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// Sample default movies
const defaultMovies = [
    {
        Title: "Inception",
        Year: "2010",
        imdbID: "tt1375666",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        Trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
        Title: "Interstellar",
        Year: "2014",
        imdbID: "tt0816692",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDU5NTJkMjQtNGYyZC00NjYwLWJlNWMtODk5NDI5MDE3NDJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        Trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
        Title: "The Dark Knight",
        Year: "2008",
        imdbID: "tt0468569",
        Poster: "https://images.moviesanywhere.com/bd47f9b7d090170d79b3085804075d41/c6140695-a35f-46e2-adb7-45ed829fc0c0.jpg",
        Trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
        Title: "KGF",
        Year: "2019",
        imdbID: "tt04685698",
        Poster: "https://m.media-amazon.com/images/M/MV5BM2M0YmIxNzItOWI4My00MmQzLWE0NGYtZTM3NjllNjIwZjc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        Trailer: "https://www.youtube.com/embed/-KfsY-qwBS0"
    },
    {
        Title: "PANCHAYAT 3",
        Year: "2019",
        imdbID: "tt04685698",
        Poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixSEXHX8BVxsooon4OgkJD0AMgC9XOp7AAg&s",
        Trailer: "https://www.youtube.com/embed/9N3cFoLFjvw"
    },
];

const API_URL = "https://www.omdbapi.com/?apikey=5baa7886";

const App = () => {
    const [movies, setMovies] = useState(defaultMovies);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTrailer, setSelectedTrailer] = useState("");

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm);
        } else {
            // Reset to default movies if no search term is provided
            setMovies(defaultMovies);
        }
    }, [searchTerm]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]); // Handle case where no movies are found
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchMovies(searchTerm);
        }
    };

    const handleMovieClick = (trailerUrl) => {
        setSelectedTrailer(trailerUrl);
    };

    return (
        <div className='app'>
            <h1>HotStar</h1>
            <div className='search'>
                <input
                    placeholder='Search for a movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                selectedTrailer ? (
                    <iframe
                        width="1000"
                        height="600"
                        src={selectedTrailer}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : null
            }

            {
                movies.length > 0 ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <div key={movie.imdbID} onClick={() => handleMovieClick(movie.Trailer)}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
};

export default App;
