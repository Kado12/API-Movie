import { useState } from 'react'
import useAxios from './Hooks/useAxios'
/* Icons */
import { FireIcon } from '@heroicons/react/24/outline'
import { TagIcon } from '@heroicons/react/24/outline'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/outline'
import { PhoneIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/outline'
/* URL */
const urlMovies = import.meta.env.VITE_MY_URL

function App() {
  const [trendingMovies, setTrendingMovies] = useState('')
  const [genresMovies, setGenresMovies] = useState('')
  const [nowMovies, setNowMovies] = useState('')
  const [popularMovies, setPopularMovies] = useState('')
  const [changeMovie, setChangeMovie] = useState(false)
  const { loadingTrending, errorTrending } = useAxios(`${urlMovies}movie/top_rated?language=en-US`, setTrendingMovies)
  const { loadingGenres, errorGenres } = useAxios(`${urlMovies}genre/movie/list?language=en-US`, setGenresMovies)
  const { loadingNow, errorNow } = useAxios(`${urlMovies}movie/now_playing?language=en-US`, setNowMovies)
  const { loadingPopular, errorPopular } = useAxios(`${urlMovies}movie/popular?language=en-US`, setPopularMovies)

  if (loadingGenres || loadingTrending || loadingNow || loadingPopular) {
    return (
      <h1>Cargando datos...</h1>
    )
  } else if (errorGenres || errorTrending || errorNow || errorPopular) {
    return (
      <h1>Error al cargar los datos...</h1>
    )
  }

  const ifChangeMovies = () => {
    const buttonAbsolute = document.querySelector('.options-button--absolute')
    const optionContainerNow = document.querySelector('.options-container-now')
    const optionContainerPopular = document.querySelector('.options-container-popular')
    buttonAbsolute.classList.toggle('options-button--left');
    buttonAbsolute.classList.toggle('options-button--right');
    if (changeMovie) {
      setChangeMovie(false)
      optionContainerNow.classList.toggle('inactive')
      optionContainerPopular.classList.toggle('inactive')
    } else {
      setChangeMovie(true)
      optionContainerPopular.classList.toggle('inactive')
      optionContainerNow.classList.toggle('inactive')
    }
  }


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
      <main className='main'>
        <h1>Trending</h1>
        <section className='carousel-movies'>
          <div className='carousel-movies-container'>
            {trendingMovies && trendingMovies.results.map((movie) => (
              <figure key={movie.id} className='carousel-items'>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} />
              </figure>

            ))}
          </div>
        </section>
        <h2>Categories</h2>
        <section className='genres-movies'>
          {genresMovies && genresMovies.genres.map((genre) => (

            <div key={genre.id} id={genre.id} className={`genres-movies-item genres-movies-item--${genre.name.toLowerCase()}`} >
              <p>{genre.name}</p>
            </div>

          ))}
        </section>
        <h2>Now and Popular</h2>
        <section className='options'>
          <div className='options-button'>
            <div className='options-button--absolute options-button--left'></div>
            <button className='options-button-item options-button-item--now' onClick={() => {
              ifChangeMovies()
            }}>Novedades</button>
            <button className='options-button-item options-button-item--popular' onClick={() => {
              ifChangeMovies()
            }}>Populares</button>
          </div>
          <div className='options-container'>
            <div className='options-container-now'>
              {nowMovies && nowMovies.results.map((now) => (
                <figure key={now.id} >
                  <img src={`https://image.tmdb.org/t/p/w200/${now.poster_path}`} alt={now.original_title} />
                </figure>

              ))}
            </div>
            <div className='options-container-popular inactive'>
              {popularMovies && popularMovies.results.map((popular) => (
                <figure key={popular.id} >
                  <img src={`https://image.tmdb.org/t/p/w200/${popular.poster_path}`} alt={popular.original_title} />
                </figure>

              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className='footer'>
        <div className='footer-links'>
          <ul className='footer-links-list'>
            <li className='footer-links-list-item'><a href='https://wa.me/+51912151197' target='_blank'><PhoneIcon className='item-icon' /> Whatsapp</a></li>
            <li className='footer-links-list-item'><a ><EnvelopeIcon className='item-icon' href='mailto:gonzalosh01@gmail.com' />GMail</a></li>
            <li className='footer-links-list-item'><a href='https://github.com/Kado12' target='_blank' ><CodeBracketIcon className='item-icon' />GitHub</a></li>
            <li className='footer-links-list-item'><a href='https://www.linkedin.com/in/gonzalo-sotelo-kd12/' target='_blank'><UserIcon className='item-icon' />Linkedin</a></li>
          </ul>
        </div>
        <div className='footer-credits'>
          <p>Créditos a la API The Movie DB</p>
        </div>
        <div className='footer-author'>
          <h3>Hecho por Kado © 2024</h3>
        </div>
      </footer>
    </>
  )
}

export default App
