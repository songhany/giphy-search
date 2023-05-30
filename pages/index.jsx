import Head from 'next/head'
import Link from "next/link";
// import Image from 'next/image'
import {useState, useEffect} from 'react'
import Footer from '../components/Footer'
const apikey = 'nPJNlVceWHERWCSDBW5XMo1p90l7l9ie'

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState()
  const [searchTerm, setSearchTerm] = useState('cats')  // default search term
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const handleInputs = (event) => {
    console.log("value", event.target.value)
    console.log("name", event.target.name)  // name="searchTerm" in <input name="searchTerm" />
    let {name, value} = event.target
    setFormInputs({ ...formInputs, [name]: value });
    // console.log([name], value);  // [searchTerm] event.target.value
    // console.log("formInputs: ", formInputs);
  }

  const search = async (event) => {
    event.preventDefault()
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`)
    giphys = await giphys.json()
    // console.log("giphys.data: ", giphys.data);
    // console.log("formInputs.searchTerm: ", formInputs.searchTerm);
    setSearchTerm(formInputs.searchTerm)
    setSearchResults(giphys.data)
  }

  return (
    <>
      <div className='container'>
        <Head>
          <title>Giphy Search App</title>
          <meta name="description" content="This is an example of a meta description. This will often show up in search results."></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/styles.css"/>
        </Head>

        <h1>Giphy Search App</h1>
        <form onSubmit={search}>
          <input name="searchTerm" onChange={handleInputs} type="text" required />
          <button>Search</button>
        </form>
        <h1>Search for: {searchTerm}</h1>

        <p>Share this search with others:
          <Link
            href="/search/[pid]"
            as={`/search/${searchTerm}`}>
                {`http://localhost:3000/search/${searchTerm}`}
          </Link>
        </p>

        <div className="giphy-search-results-grid">
          {searchResults.map((each, index) => {
            return(
              <div key={index}>
                <h3>{each.title}</h3>
                <img src={each.images.original.url} alt={each.title}/>
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getStaticProps() {  // A statically generated page with data can be identified by the use of this getStaticProps() function
  let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${apikey}&limit=10`)
  catGiphys = await catGiphys.json()
  return {
    props: {
      catGiphys: catGiphys
    }
  }  
}