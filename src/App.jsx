import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Quote from './Components/Quote';
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random?minLength=150&maxLength=200'
const INITIAL_TIME = 15
export default function App() {
  const [quote, setQuote] = useState("");
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaing] = useState(INITIAL_TIME)
  const [start, setStart] = useState(false)
  const [wpm, setWpm] = useState(0)
  const textElement = useRef();

  useEffect(() => {
    axios.get(RANDOM_QUOTE_API_URL)
      .then(response => {
        setQuote(response.data.content)
      })
  }, [])

  useEffect(() => {
    if (start && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaing(prevTime => prevTime - 1)
      }, 1000)
      const minuteElapsed = (INITIAL_TIME - timeRemaining) / 60
      console.log('minute elapsed ',minuteElapsed*60);
      console.log('wpm  ', (text.length / 5))
      setWpm(text.length / 5) / minuteElapsed
    } else if (timeRemaining <= 0) {
      setStart(false)
    }
  }, [start, timeRemaining])



  function handleChange(event) {
    setText(event.target.value)
  }
  function startGame() {
    setStart(true)
    setTimeRemaing(INITIAL_TIME)
    setText("")
    textElement.current.disabled = false
    textElement.current.focus()
  }

  return (
    quote &&
    <div className='max-w-lg px-2 text-lg'>
      < h1 className='text-5xl underline text-center' >Typing Game</h1 >
      <Quote quote={quote} text={text} />
      <textarea
        placeholder='Start typing here...'
        name='text'
        onChange={handleChange}
        ref={textElement}
        value={text}
        disabled={!start}
        className='w-full h-36 rounded-md resize-none  text-slate-800 tracking-widest p-3 focus:border-2 focus:border-green-400' />
      <div className='mt-4 '>Time Remaining: {timeRemaining} sec</div>
      <div>Word per minute:{wpm}</div>
      <button className="bg-green-300 px-2 py-1 text-black 
        rounded-md block mx-auto my-4 hover:bg-green-700
         hover:-translate-y-0.5 hover:text-white
          disabled:bg-green-100 disabled:cursor-not-allowed shadow shadow-green-100"
        disabled={start}
        onClick={startGame}>Start</button>
    </div >

  )
}


