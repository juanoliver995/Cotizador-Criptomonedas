import styled from "@emotion/styled"

const Resultado = styled.div`
    background-color: #9497ff;
    padding: 10px;
    display: flex;
    justify-content: center;
    margin: 10px auto;
    border-radius: 5px;
    align-items: center;
    gap: 1rem;
    @media (max-width: 992px){
    flex-direction: column;
  }
`
const Imagen = styled.img`
    display: block;
    width: 150px;
`
const Texto = styled.p`
    font-family: "Lato", sans-serif;
    color: #fff;
    font-size: 16px;
    padding: 10px 0;

`
const Precio = styled.p`
    font-family: "Lato", sans-serif;
    color: #fff;
    font-size: 24px;
    padding: 10px 0;
    span{
        font-weight: 700;
    }

`


const Result = ({ result }) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, IMAGEURL } = result
    console.log(result)
    return (
        <Resultado>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} />
            <div>
                <Precio>El precio es de: <span>{PRICE}</span></Precio>
                <Texto>El precio mas alto del dia: <span>{HIGHDAY}</span></Texto>
                <Texto>El precio mas bajo del dia: <span>{LOWDAY}</span></Texto>
                <Texto>Variacion en 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Ultima actualizacion: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Resultado>
    )
}

export default Result