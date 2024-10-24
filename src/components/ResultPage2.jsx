import React from 'react';
import {
    Page,
    Button,
    Block,
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    Link
} from 'framework7-react';
import Confetti from 'react-confetti'

export const ResultPage2 = (props) => {
    console.log(props);
    const { f7route, f7router } = props;

    const viewFinalPage = () => {
        f7router.navigate('/final/', {
            props: {
                data: props.data
            }
        });
    }
    let width = window.innerWidth;
    let height = window.innerHeight;

    let total = parseInt(props.data.valor_vivienda.replace(/,/g, '')) + parseInt(props.data.inpuestos_gastos.replace(/,/g, ''));
    let text_total = total.toString()
    text_total = text_total.replace(/[^\d]/g, '');
    text_total = text_total.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const cambiarTransparencia = () => {
        const cft = document.getElementById('confetti');
        if (null != cft){
            var opacidadActual = parseFloat(cft.style.opacity);
            opacidadActual -= 0.01;
            cft.style.opacity = opacidadActual;
            if (opacidadActual > 0) {
                setTimeout(cambiarTransparencia, 30);
            } else {
                cft.style.display = "none";
            }
        }
    }

    setTimeout(cambiarTransparencia, 3000);

    return (
        <>
            <Confetti id="confetti" width={width} height={height} style={{opacity: 1}}/>
            <Page name="results" colorTheme="white">
                <Block className='container-messages'>
                    <Card outline style={{ backgroundColor: "white", borderColor: "#d1d1d1", borderWidth: "1px", boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)" }}>
                        <Button onClick={() => { f7router.back() }}>Regresar</Button>
                        <CardHeader valign="bottom" style={{justifyContent: "center"}}>
                            <h4>Genial! La vivienda de tus sueños esta mas cerca de lo que piensas:</h4>
                        </CardHeader>
                        <CardContent>
                            <Block>
                                <div className='result-card-content' style={{ background: "var(--primay-color-ipoteca)"}}>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/card.png" className='icons-results' alt="card" />
                                        </div>
                                        <div>
                                            <h2>Cuota periodica mensual</h2>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2 >
                                            {props.data.mensualidad}€
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                                <h3>El costo total sería:</h3>
                                <hr />
                                <div className='result-card-content' >
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/house.png" className='icons-results' alt="house" />
                                        </div>
                                        <div>
                                            <h2>Precio del inmueble</h2>
                                            <p>Este es el valor de la propiedad que te interesa:</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            {props.data.valor_vivienda}€
                                        </h2>
                                    </div>
                                </div>
                                <div className='result-card-content'>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/percent.png" className='icons-results' alt="gastos" />
                                        </div>
                                        <div>
                                            <h2>Impuestos y gastos</h2>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            {props.data.inpuestos_gastos}€
                                        </h2>
                                    </div>
                                </div>
                                <div className='result-card-content' style={{ background: "var(--primay-color-ipoteca)"}}>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/dollar.png" className='icons-results' alt="gastos" />
                                        </div>
                                        <div>
                                            <h2>Total:</h2>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            {text_total}€
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                                <h3>Se pagaría de la siguiente forma:</h3>
                                <hr />
                                <div className='result-card-content' style={{background: "linear-gradient(180deg, var(--primay-color-ipoteca), 35%, white)"}}>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/dollar.png" className='icons-results' alt="importe" />
                                        </div>
                                        <div>
                                            <h2>Importe de la hipoteca</h2>
                                            <p>El prestamo que Pignus te podria conseguir:</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            {props.data.monto_credito}€
                                        </h2>
                                    </div>
                                </div>
                                <div className='result-card-content' style={{background: "linear-gradient(0deg, var(--primay-color-ipoteca), 35%, white)"}}>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/money.png" className='icons-results' alt="money" />
                                        </div>
                                        <div>
                                            <h2>Aportación inicial</h2>
                                            <p>Son los recursos propios que proporcionas de pago inicial:</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            {props.data.monto_ahorro}€
                                        </h2>
                                    </div>
                                </div>
                            </Block>
                        </CardContent>
                        <CardFooter style={{ justifyContent: "center" }}>
                            <Button large fill round onClick={viewFinalPage} textColor='white' style={{ width: "100%", padding: "1rem", backgroundColor: "#1B2A6B" }}>
                                <h1>Continuar</h1>
                            </Button>
                        </CardFooter>
                    </Card>
                </Block>
            </Page>
        </>
    );
};