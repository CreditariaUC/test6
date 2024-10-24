import React from 'react';
import {
    Page,
    Button,
    Block,
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    Link,
    f7
} from 'framework7-react';
import { Cuota } from './banners/Cuota';
import { Importe } from './banners/Importe';
import { Aportacion } from './banners/Aportacion';
import { Inmueble } from './banners/Inmueble';
import { Gastos } from './banners/Gastos';

export const ResultPage = (props) => {
    const { f7route, f7router } = props;

    let dialog = null;

    const openCustomPreloader = () => {
        dialog = f7.dialog.preloader('Cargando...');
    };
    
    const closeCustomPreloader = () => {
        dialog.close();
    };

    const viewFinalPage = async () => {
        if (props.data.is_user == true && props.data.email != '') {
            openCustomPreloader();
            const datad = {
                'estado_vivienda': props.data.estado_vivienda,
                'inpuestos_gastos': props.data.inpuestos_gastos,
                'mensualidad': props.data.mensualidad,
                'monto_ahorro': props.data.monto_ahorro,
                'monto_credito': props.data.monto_credito,
                'preferencia_de_financiacion': props.data.preferencia_de_financiacion,
                'provincia': props.data.provincia,
                'tipo_vivienda': props.data.tipo_vivienda,
                'valor_renta': props.data.valor_renta,
                'valor_vivienda': props.data.valor_vivienda,
                'name': props.data.name,
                'ap_paterno': '',
                'ap_materno': '',
                'phone': props.data.phone,
                'email': props.data.email,
                'autorizo': true,
                'plazo': '35',
                'tipo_financiacion': 'cuota'
            };

            await fetch('https://test.pignus.es/api/credito/ipoteca/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datad)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result.status === 200) {
                        closeCustomPreloader();
                        f7router.navigate('/landingend/', {
                            props: {
                                data: data.result.data,
                            }
                        });
                    } else {
                        closeCustomPreloader();
                        console.log("Error");
                    }
                })
                .catch((error) => {
                    closeCustomPreloader();
                    f7.dialog.alert('Ocurrio un error al enviar tus datos, intenta mas tarde!', 'Error');
                    console.error('Error:', error);
                });

        } else {
            f7router.navigate('/final/', {
                props: {
                    data: props.data,
                }
            });
        }
    }

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
            <Page name="results" colorTheme="white">
                <Block className='container-messages'>
                    {
                        props.data.preferencia_de_financiacion === 'mensualidad' ? (
                            <Card outline style={{ backgroundColor: "white", borderColor: "#d1d1d1", borderWidth: "1px", boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)" }}>
                                <Button onClick={() => { f7router.back() }}>Regresar</Button>
                                <CardHeader valign="bottom" style={{justifyContent: "center"}}>
                                    <div style={{textAlign: "center"}}>
                                        <h4>Genial! La vivienda de tus sueños esta mas cerca de lo que piensas:</h4>
                                        <p>Admiramos tu ambición! Tenemos para ti hipotecas flexibles y diseñadas para alcanzar tus metas.</p>
                                        <p>Vamos a por ello!!!</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Block>
                                        <Cuota backgroundColor="var(--primay-color-ipoteca)" mensualidad={props.data.mensualidad} font_size='large'/>
                                        <Importe backgroundColor="var(--primay-color-ipoteca)" monto_credito={props.data.monto_credito}/>
                                        <Aportacion monto_ahorro={props.data.monto_ahorro}/>
                                        <Gastos inpuestos_gastos={props.data.inpuestos_gastos}/>
                                        <Inmueble valor_vivienda={props.data.valor_vivienda}/>
                                    </Block>
                                </CardContent>
                                <CardFooter style={{ justifyContent: "center" }}>
                                    <Button large fill round onClick={viewFinalPage} textColor='white' style={{ width: "100%", padding: "1rem", backgroundColor: "var(--secundary-color-ipoteca)" }}>
                                        <h1>{"Mis resultados >>"}</h1>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : <></>
                    }
                    {
                        props.data.preferencia_de_financiacion === 'importe' ? (
                            <Card outline style={{ backgroundColor: "white", borderColor: "#d1d1d1", borderWidth: "1px", boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)" }}>
                                <Button onClick={() => { f7router.back() }}>Regresar</Button>
                                <CardHeader valign="bottom" style={{justifyContent: "center"}}>
                                    <div style={{textAlign: "center"}}>
                                        <h4>Genial! La vivienda de tus sueños esta mas cerca de lo que piensas:</h4>
                                        <p>Sabemos que tu hogar es tu refugio. Tenemos para ti la hipoteca perfecta; sin sustos.</p>
                                        <p>Te acompañamos!!!</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Block>
                                        <Importe backgroundColor="var(--primay-color-ipoteca)" monto_credito={props.data.monto_credito} font_size='large'/>
                                        <Inmueble valor_vivienda={props.data.valor_vivienda}/>
                                        <Aportacion monto_ahorro={props.data.monto_ahorro}/>
                                        <Gastos inpuestos_gastos={props.data.inpuestos_gastos}/>
                                        <Cuota backgroundColor="var(--primay-color-ipoteca)" mensualidad={props.data.mensualidad} />
                                    </Block>
                                </CardContent>
                                <CardFooter style={{ justifyContent: "center" }}>
                                    <Button large fill round onClick={viewFinalPage} textColor='white' style={{ width: "100%", padding: "1rem", backgroundColor: "var(--secundary-color-ipoteca)" }}>
                                        <h1>{"Mis resultados >>"}</h1>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : <></>
                    }
                    
                </Block>
            </Page>
        </>
    );
};