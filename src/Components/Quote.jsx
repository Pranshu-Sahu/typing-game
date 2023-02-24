import React from 'react'
import { nanoid } from 'nanoid'

export default function Quote({ quote, text }) {
  const quoteArr = quote.split("")
  const textArr = text.split("")
  const quoteElement = quoteArr.map((letter, index) => {
    let textColor = "text-slate-400"
    if (index <= textArr.length - 1) {
      if (letter === textArr[index]) {
        textColor = "text-green-700"
      } else { textColor = 'text-red-500' }
    }
    return <span key={nanoid()}
      className={`${textColor} tracking-widest`}
    >{letter}</span>
  })
  return (
    <h2 className="my-6"
    >{quoteElement}</h2>

  )
}
