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

export const ResultPage = (props) => {
    console.log(props);
    const { f7route, f7router } = props;

    const viewFinalPage = () => {
        f7router.navigate('/final', {
            props: {
                data: {
                    enganche: 100,
                    monto: 200,
                    ingresos: 300
                }
            }
        });
    }
    let width = window.innerWidth;
    let height = window.innerHeight;

    const inactiveConffeti = () => {
        const cft = document.getElementById('confetti');
        if (cft) {
            cft.remove();
        }
    }

    setTimeout(inactiveConffeti, 5000);

    return (
        <>
            <Confetti id="confetti" width={width} height={height} />
            <Page name="results" colorTheme="white">
                <Block className='container-messages'>
                    <Card outline style={{ backgroundColor: "white", borderColor: "#d1d1d1" }}>
                        <Button onClick={() => { f7router.back() }}>Regresar</Button>
                        <CardHeader valign="bottom" className='grid grid-cols-2'>
                            <Card style={{ backgroundColor: "#1B2A6B", height: "-webkit-fill-available" }}>
                                <CardHeader style={{ color: "white" }}>
                                    <h3 style={{ marginBlockEnd: "0em", marginBlockStart: "0em" }}>
                                        Valor del contrato:
                                    </h3>
                                </CardHeader>
                                <CardContent style={{ color: "white" }}>
                                    <h5 style={{ marginBlockEnd: "0em", marginBlockStart: "0em" }}>Enganche:</h5>
                                    <h5 style={{ marginBlockEnd: "0em", marginBlockStart: "0em" }}>Monto financiado:</h5>
                                    <h5 style={{ marginBlockEnd: "0.5em", marginBlockStart: "0em" }}>Ingresos deseados:</h5>
                                </CardContent>
                            </Card>
                            <Card outline style={{ borderColor: "#A4CB6A", textAlign: "end", borderWidth: "0.3rem", height: "-webkit-fill-available", display: "grid", alignItems: "center" }}>
                                <CardHeader style={{ justifyContent: "end" }}>
                                    <h3 style={{ marginBlockEnd: "0em", marginBlockStart: "0em" }}>
                                        €852,689
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <h5 style={{ marginBlockEnd: "0em", marginBlockStart: "0em" }}>€52,689</h5>
                                    <h5 style={{ marginBlockEnd: "0em", marginBlockStart: "0em" }}>€800,000</h5>
                                    <h5 style={{ marginBlockEnd: "0.5em", marginBlockStart: "0em" }}>€9,837</h5>
                                </CardContent>
                            </Card>
                        </CardHeader>
                        <CardContent>
                            <Block>
                                <div className='result-card-content' style={{ background: "#A4CB6A", marginBottom: "1rem" }}>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/dollar.png" className='icons-results' alt="" />
                                        </div>
                                        <div style={{ color: "white" }}>
                                            <h2>Total de la cuota periodica mensual</h2>
                                            <p>Esta es la suma de cada uno de los conseptos</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            €{props.data.mensualidad}
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                                <div className='result-card-content'>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/money.png" className='icons-results' alt="" />
                                        </div>
                                        <div>
                                            <h2>Precio del inmueble</h2>
                                            <p>Valor del contrato dividido entre el plazo de del contrato</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            €{props.data.valor_vivienda}
                                        </h2>
                                    </div>
                                </div>
                                <div className='result-card-content'>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/setting.png" className='icons-results' alt="" />
                                        </div>
                                        <div>
                                            <h2>Impuestos y gastos</h2>
                                            <p>Valor del contrato por el 0.14%</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            €{props.data.inpuestos_gastos}
                                        </h2>
                                    </div>
                                </div>
                                <div className='result-card-content'>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/percent.png" className='icons-results' alt="" />
                                        </div>
                                        <div>
                                            <h2>Aportación inicial</h2>
                                            <p>Gasto de administración por el 16%</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            €{props.data.monto_ahorro}
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                                <div className='result-card-content' style={{ background: "#A4CB6A" }}>
                                    <div className='banner-card-content'>
                                        <div className='border-icons-results'>
                                            <img src="./icons/heart.png" className='icons-results' alt="" />
                                        </div>
                                        <div>
                                            <h2>Importe de la hipoteca</h2>
                                            <p>Valor del contrato por el 0.05%</p>
                                        </div>
                                    </div>
                                    <div className='total-card-content'>
                                        <h2>
                                            €{props.data.monto_credito}
                                        </h2>
                                    </div>
                                </div>
                                <hr />
                                {/* <div>
                                    <h4 style={{ textAlign: "end" }}>
                                        Varía de acuerdo al modelo del contrato*
                                    </h4>
                                </div> */}
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