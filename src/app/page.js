'use client'

import React, { useState, useEffect } from 'react'
import './styles.css' // Importando los estilos CSS
import Image from 'next/image'

export default function BreakingBadQuotes() {
 const [quote, setQuote] = useState(null)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 useEffect(() => {
  obtenerFrase()
 }, [])

 const obtenerFrase = async () => {
  setLoading(true)
  setError(null)
  try {
   const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
   if (!res.ok) {
    throw new Error('Error al obtener la frase')
   }
   const data = await res.json()
   setQuote(data[0])
  } catch (err) {
   setError(err.message)
  } finally {
   setLoading(false)
  }
 }

 return (
  <div className='container'>
   <Image
    src='/public/logo.svg' // Agrega un icono en la carpeta public/
    alt='Breaking Bad'
    width={100}
    height={100}
    className='icon'
   />

   <h1 className='title'>📺 Frases de Breaking Bad</h1>
   {loading ? (
    <p className='loading'>⏳ Cargando...</p>
   ) : error ? (
    <p className='error'>❌ {error}</p>
   ) : (
    quote && (
     <div className='frase-container'>
      <p className='frase-text'>&quot;{quote.quote}&quot;</p>
      <p className='frase-author'>- {quote.author}</p>
     </div>
    )
   )}
   <button onClick={obtenerFrase} className='button' disabled={loading}>
    🔄 Nueva Frase
   </button>
  </div>
 )
}
