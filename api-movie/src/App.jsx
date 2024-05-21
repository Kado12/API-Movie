import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [trendingMovies, setTrendingMovies] = useState('')

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/day?language=es',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU3MGZiNDE3ZjYwNmIwYjkzNGRlOGRmODFkODlhZSIsInN1YiI6IjY2NDdhNDA3OTVkYzU5ZDQ3MWI1M2EwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._6bYTf5Q3wRr4Gd3VzUIfP7hD_GjDa2lDNSzE6E1bFI'
      }
    }

    axios
      .request(options)
      .then(function (response) {
        setTrendingMovies(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <header className='header'>
        <figure className='header-logo'>
          <img className='header-logo-item' src="/Logo.svg" alt="Logo KD Movies" />
        </figure>
        <nav className='header-navbar'>
          <ul className='header-navbar-list'>
            <li className='header-navbar-list-item'>
              <img src="/Trending.svg" alt="Películas más votadas" />
            </li>
            <li className='header-navbar-list-item'>
              <img src="/Tags.svg" alt="Categorías de las películas" />
            </li>
            <li className='header-navbar-list-item'>
              <img src="/News.svg" alt="Novedades" />
            </li>
            <li className='header-navbar-list-item'>
              <img src="/Play.svg" alt="Películas más votadas" />
              <span></span>
            </li>
          </ul>
        </nav>
      </header>
      <div className='carousel-movies'>
        {!trendingMovies || trendingMovies.map((movie) => (

          <div key={movie.id} className='carousel-items'>
            <h2 id={movie.id}>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} />
          </div>

        ))}
      </div>
    </>
  )
}

export default App
