import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Content from './components/MainContent/Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Content/>
      <Footer/>
    </>
  )
}

export default App
