import { useEffect, useState } from 'react';
import Movie from './component/movie';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    setLoading(true);
    const response = await fetch(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year'
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? 
        <h1>로딩 중...</h1> : 
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image} 
              summary={movie.summary}
              genre={movie.genres}
              title={movie.title}
            />
          ))}
        </div>
      }
    </div>
  );
}

export default App;
