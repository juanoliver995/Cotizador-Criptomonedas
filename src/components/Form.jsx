import styled from "@emotion/styled"
import useSelectCoins from "../hooks/useSelectCoins"
import { coins } from "../data/coins"
import { useEffect, useState } from "react"
import Error from "./Error"

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color ease .3s;
    margin-top: 30px;

    &:hover{
        background-color: #7a7dfe;
    }

`
const Form = ({ setCoins }) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    const [SelectMoney, coin] = useSelectCoins("Elige tus monedas", coins)
    const [SelectCriptoMoneda, criptomoneda] = useSelectCoins("Elige tus criptomoneda", cryptos)

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCryptos = resultado.Data.map((cripto) => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCryptos(arrayCryptos)
        }
        consultarApi()
    }, [])

    const handlesubmit = (e) => {
        e.preventDefault()
        if ([coin, criptomoneda].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setCoins({ coin, criptomoneda })
    }

    return (
        <>
            {error && <Error>Todos los campos son Obligatorios</Error>}

            <form
                onSubmit={handlesubmit}
            >

                <SelectMoney />
                <SelectCriptoMoneda />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />

            </form>
        </>
    )
}

export default Form