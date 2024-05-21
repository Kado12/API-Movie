import { useState, useEffect } from 'react'
import axios from 'axios'
import { FireIcon } from '@heroicons/react/24/outline'
import { TagIcon } from '@heroicons/react/24/outline'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/outline'

function App() {
  const [trendingMovies, setTrendingMovies] = useState('')

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/day?language=es',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_MY_TOKEN,
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
              <FireIcon className='icon-svg' />
            </li>
            <li className='header-navbar-list-item'>
              <TagIcon className='icon-svg' />
            </li>
            <li className='header-navbar-list-item'>
              <NewspaperIcon className='icon-svg' />
            </li>
            <li className='header-navbar-list-item'>
              <PlayIcon className='icon-svg' />
            </li>
          </ul>
        </nav>
      </header>
      <h1>Trending</h1>
      <div className='carousel-movies'>
        {!trendingMovies || trendingMovies.map((movie) => (

          <figure key={movie.id} className='carousel-items'>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} />
          </figure>

        ))}
      </div>
    </>
  )
}

export default App
