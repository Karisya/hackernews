import { useEffect, useState } from "react"
import axios from "axios"

const NewsList = ()=>{

const [newsList, setNewsList] = useState([])
const [loading, setLoading]=useState(true)


        const fetchNews=async()=>{
            setLoading(true);
            try{
                const response = await axios.get(' https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
                const news = await Promise.all(response.data.slice(0,100).map(async (i)=>{
                    const story=await axios.get(`https://hacker-news.firebaseio.com/v0/item/${i}.json`)
                    return story.data
                }))
               setNewsList(news)
               console.log('loading')
            }
            catch(e){
                console.log(e)
            }
            setLoading(false)
        }

useEffect(()=>{fetchNews()}, [])


    
    const handleFetch=()=>{
        fetchNews()
    }
    
    
    return(
    <div>
        <button onClick={handleFetch}>Обновить</button>
        {loading?(<p>loading...</p>):
        (<div>
        {newsList.map((item)=>
            (
                <div>
                <p>Название: {item.title}</p>
                <p>Рейтинг: {item.score}</p>
                <p>Название: {item.by}</p>
                <p>Дата: {new Date(item.time * 1000).toLocaleString()}</p>
<               br/>
            </div>
        )
    )}
    </div>
    )
}
    </div>
)

}

export default NewsList