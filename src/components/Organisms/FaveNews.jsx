import { useState, useEffect, useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

import moment from 'moment'
import Icon from '../Atoms/Icon'

import '../../styles/news-card.css'


const FaveNews = () => {

    const newsCard = useRef()
    const [favesStorage, setFavesStorage] = useLocalStorage('favesNews', [])

    const [news, setNews] = useState()

    useEffect(() => {
        const faves = window.localStorage.getItem('favesNews')
        if(faves) setNews(JSON.parse(faves)) 
    }, [])

    /*----------------------------------| Functionalities |----------------------------------*/

    const toggleFaves = e => {
        e.stopPropagation()

        let currentFav = e.target.parentElement.parentElement.parentElement

        


        if(currentFav.className === 'card') {
            let currentNews = news.find(n => n.id.toString() === currentFav.id), 
            index = news.indexOf(currentNews)

           
                if(currentNews.className === 'card-active') {
                    currentNews.className = 'card-disabled'
        
                    favesStorage[index].className = 'card-disabled'
                    setFavesStorage([...favesStorage.splice(index, 1)])
                } else { 
                    currentNews.className = 'card-active'
                    setFavesStorage([...favesStorage, currentNews])
                }

                 console.log(favesStorage)

        }
    }
    

    return (
        <>
            {
                news 
                ?  <div className="grid-news">
                        {   
                            news.map(n => 
                            <article ref={newsCard} className="card" id={n.id}>
                                <a href={n.url} rel="noopener noreferrer" target="_blank">
                                    <div className="news-content">
                                        <span className='timer'>
                                            <Icon tags='timer' />{`${moment(n.created).fromNow()} by`} 
                                            <strong>{n.author}</strong>
                                        </span>
                                        <h2>{n.title}</h2>
                                    </div>
                                </a>
                    
                                <div className="box-favorite">
                                    <span onClick={toggleFaves} className='favorite'>
                                        {n.className}
                                        <Icon tags={n.className !== 'card-disabled' ? 'active-fav' : 'disabled-fav'} /> 
                                        {/* <Icon tags='active-fav' />  */}
                                    </span>
                                </div>
                            </article>
                            )
                        }
                    </div>

                :  <div>
       
                  </div>   
                   
            }
        </>
    )
}

export default FaveNews