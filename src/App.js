
import { useEffect, useState } from 'react';
import './App.css';
import { ImCross } from 'react-icons/im'
import axios from 'axios';
function App() {
  const [link, setLink] = useState('')
  const [summarized, setSummarized] = useState('')
  const [loading, setLoading] = useState(true)
  const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: 'https://time.com/6314120/fda-decongestant-phenylephrine-decision/',
      length: '3'
    },
    headers: {
      'X-RapidAPI-Key': '2659ebf51fmshf53e38f969bbf87p1689e2jsna1f7c22a194e',
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };
  useEffect(()=>{
    
       const fetchdata=async()=>{
       try {
         const response = await axios.request(options);
         setSummarized(response.data.summary);
         setLoading(false)
       } catch (error) {
         console.error(error);
       }
     }
  
   link && fetchdata()
   }
   ,[link])
  return (
    <div className="App flex flex-col  items-center h-[100vh] w-[100vw]  p-10 sm:p-5">
      <h1 className='text-[4rem] px-10 sm:text-[2rem] sm:px-5 sm:text-center'>Summarize article with <span className='text-orange-500'>OpenAI GPT-4</span> </h1>
      <div className='w-[70%] mt-5 flex '>
        <input type="text" value={link} className='border-2 border-orange-300 rounded-l-xl w-full h-[3rem] placeholder:text-2xl placeholder:px-2 outline-none px-2 text-2xl text-gray-400 sm:placeholder:text-[1rem] sm:h-[2.5rem]sm:text-[1rem]' placeholder='Paste here the link of the article/blog' onChange={(e) => { setLink(e.target.value) }} />
        <span className='p-2 text-orange-400 text-xl border-2 border-orange-300 rounded-r-xl  h-[3rem] cursor-pointer flex justify-center items-center hover:bg-orange-400 hover:text-white' onClick={() => { setLink(""); setLoading(true) }} > <ImCross /></span>

      </div>
      {loading ? <h1 className='text-2xl mt-5'>Enter a link or if already entered wait for few seconds...</h1> : <div className='flex flex-col w-[70%] mt-5'>
        <h1 className='text-[3rem] sm:text-[1.5rem]'>Summarized article</h1>
        <p className='border-2 border-orange-400 rounded-md p-5 sm:p-2'>{summarized}</p>
      </div>}

    </div>
  );
}

export default App;
