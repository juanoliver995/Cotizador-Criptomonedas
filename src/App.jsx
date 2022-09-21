import styled from "@emotion/styled"
import { useState, useEffect } from "react"
import ImagenCripto from "./assets/imagen-criptos.png"
import Form from "./components/Form"
import Result from "./components/Result"
import Loader from "./components/Loader"

const Container = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Image = styled.img`
  max-width: 400px;
  width: 80%;
  display: block;
  margin: 100px auto 0 auto;
`


const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 34px;
  text-align: center;
  font-weight: 700;
  margin: 80px auto 50px auto;
  color: #fff;

 &::after{
  content: "";
  width: 100px;
  height: 6px;
  background-color: #66a2fe;
  display: block;
  margin: 10px auto 0 auto ;
 }
`

function App() {
  const [coins, setCoins] = useState({})
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      const cotizarCrypto = async () => {
        setLoading(true)
        setResult({})
        const { coin, criptomoneda } = coins
        console.log(coin, criptomoneda)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${coin}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResult(resultado.DISPLAY[criptomoneda][coin])

        setLoading(false)
      }

      cotizarCrypto()
    }
  }, [coins])

  console.log(coins)
  return (
    <Container>
      <Image src={ImagenCripto} alt="imagen de criptomonedas" />
      <div>
        <Heading>Cotiza tus Criptomonedas</Heading>
        <Form setCoins={setCoins} />
        {loading && <Loader />}
        {result.PRICE && <Result result={result} />}
      </div>
    </Container>
  )
}

export default App
