import React from 'react'
import {
    Page,
    Button,
    Block,
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    Link,
    List,
    Range,
    ListInput,
    ListItem,
    f7
} from 'framework7-react';
import { ValueLanding } from './fields/ValueLanding';
import { DobleValueLanding } from './fields/DobleValueLanding';

export const LandingEnd = (props) => {
    const dte = new Date(Date.now()).toLocaleDateString().split('/').join(' / ');

    const formatMonetaryLocal = (value) => {
        let format = parseInt(value, 10);
        format = format.toString();
        format = format.replace(/[^\d]/g, '');
        format = format.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return format;
    }

    return (
        <Page name="landing" colorTheme="teal">
            <Block className='container-messages'>
                <Card bgColor="white" raised className="background-results" style={{boxShadow: "2px 2px 1rem"}}>
                    <CardHeader className="landing-header">
                        <div>
                            <img src="./img/PIGNUS_COLOR.png" alt="logo" className="landing-logo" />
                        </div>
                        <div className="date-text">
                            <div className="landing-date">{dte}</div>
                            Fecha de descarga
                        </div>
                    </CardHeader>
                    <CardContent style={{padding: "0"}}>
                        <div className="grid grid-cols-1 medium-grid-cols-3">
                            <div style={{textAlign: "center"}}>
                                <img src="./img/Pignus_Frente_saludando02.png" alt="pignus" style={{width: "17rem"}}/>
                            </div>
                            <div className="col-span-1 medium-col-span-2">
                                <h1 className="title-name">{"¡Hola " + props.data.name + "!"}</h1>
                                <p className="title-text">
                                    Antes  de  nada,  ¡mil  gracias  por  confiar  en  Pignus!  Nos  emociona  que  hayas  usado  nuestra  calculadora  de  hipotecas  para  dar  un  paso  tan  importante.  ¿Listo/a  para  lo  siguiente?  Tenemos un informe detallado, basado en tus resultados, que te va a encantar.En  él,  encontrarás  todo  lo  que  necesitas  saber  para  tomar  la  mejor decisión sobre tu hipoteca. Así que, tómate un momento, relájate y descubre cómo podemos ayudarte a hacer realidad tu sueño de tener casa propia.
                                </p>
                                <h1 className="title-name">{"¡Vamos a ello!"}</h1>
                            </div>
                            <div className="col-span-1 medium-col-span-3">
                                <Card className="background-card-results">
                                    <CardContent className="table-details" style={{padding: "0rem", borderRadius: "2rem", border: "1px solid", overflow: "hidden"}}>
                                        <div className="grid grid-cols-1 medium-grid-cols-10">
                                            <div className="col-span-1 medium-col-span-6">
                                                <div style={{background: "linear-gradient(90deg, white, 60%, var(--tertiary-color-ipoteca))", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <h3 style={{margin: "0"}}>Tu simulación</h3>
                                                </div>
                                                <div className="grid grid-cols-1 grid-gap" style={{padding: "1rem", background: "white"}}>
                                                    <ValueLanding img='localizacion.png' title="Localización" value={props.data.provincia} />
                                                    <ValueLanding img='condicion.png' title="Condición" value={props.data.estado_vivienda=="segunda"?"Segunda mano":"Obra nueva"} />
                                                    <div></div>
                                                    <div></div>
                                                    <ValueLanding img='precio_de_la_casa.png' title="Precio de la casa" value={props.data.valor_vivienda + ",00 €"} />
                                                    <ValueLanding img='gastos_totales.png' title="Gastos totales" value={formatMonetaryLocal(props.data.gastos_totales.toString()) + ",00 €"} />
                                                    <ValueLanding img='ahorro_aportado.png' title="Ahorro aportado" value={props.data.monto_ahorro + ",00 €"} />
                                                    <ValueLanding img='plazo_del_prestamo.png' title="Plazo del préstamo" value={props.data.plazo} />
                                                    <div></div>
                                                    <div></div>
                                                    <div className="grid grid-cols-4">
                                                        <h4 className="col-span-2">Pagarás</h4>
                                                        <span style={{fontSize: "x-small", margin: "auto 0"}}>Interés fijo</span>
                                                        <span style={{fontSize: "x-small", margin: "auto 0"}}>Interés variable</span>
                                                    </div>
                                                    <DobleValueLanding w='25px' img='importe_hipoteca.png' title='Importe anual' value_one={formatMonetaryLocal(props.data.importe.toString()) + ""} value_two={formatMonetaryLocal(props.data.importe_variable.toString()) + "€"} />
                                                    <DobleValueLanding w='20px' img='cada_mes.png' title='Cada mes' value_one={formatMonetaryLocal(props.data.mensualidad_total.toString()) + ",00 €"} value_two={formatMonetaryLocal(props.data.mensualidad_total_variable.toString()) + ",00 €"} />
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                            <div className="col-span-1 medium-col-span-4" style={{background: "var(--secundary-color-ipoteca)", color: "white"}}>
                                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                    <h3>Gastos</h3>
                                                </div>
                                                <div className="grid grid-cols-1 grid-gap" style={{padding: "1rem"}}>
                                                    <div>
                                                        <h3>Gastos de la Compra</h3>
                                                    </div>
                                                    <ValueLanding wdt='20px' img='notaria.png' title="Notaría" value={formatMonetaryLocal(props.data.notaria.toString()) + ",00 €"} />
                                                    <ValueLanding wdt='20px' img='registro.png' title="Registro" value={formatMonetaryLocal(props.data.registro.toString()) + ",00 €"} />
                                                    <ValueLanding wdt='20px' img='gestoria.png' title="Gestoría" value={formatMonetaryLocal(props.data.gestoria.toString()) + ",00 €"} />
                                                    <ValueLanding wdt='20px' img='impuestos.png' title="Impuestos" value={formatMonetaryLocal(props.data.intereses.toString()) + ",00 €"} />
                                                    <ValueLanding title='Total' value={formatMonetaryLocal((props.data.notaria + props.data.registro + props.data.gestoria + props.data.intereses).toString()) + ",00 €"} />
                                                    <div></div>
                                                    <div></div>
                                                    <div>
                                                        <h3>Gastos de la Hipoteca</h3>
                                                    </div>
                                                    <ValueLanding img='gastos_de_tasacion.png' title="Tasación" value={formatMonetaryLocal(props.data.tasacion.toString()) + ",00 €"} />
                                                    <ValueLanding img='gastos_totales1.png' title="Gastos totales" value={formatMonetaryLocal(props.data.gastos_totales + props.data.intereses + props.data.tasacion) + ",00 €"} />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div style={{padding: "1rem"}}>
                                    <span className="footer-text">
                                        *Como hemos calculado el Interés? Hemos utilizado una referencia media del mercado hipotecario.Interés Variables: la cuota variará a lo largo de la vida del préstamo en función a la fluctuación del EURIBOR.Interés fijo: se mantiene constante durante toda la vida del préstamo.
                                    </span>
                                </div>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <img src="./img/pignus_circulo.png" alt="pignus" style={{width: "13rem"}}/>
                            </div>
                            <div className="col-span-1 medium-col-span-2">
                                <p className="title-text">
                                    Ahora  que  has  visto  tu  informe  detallado,  seguro  que  tienes  preguntas,  o  quizás  quieras  saber  más  sobre  como  podemos  convertir  estos  números  en  tus  aliados.  No  dejes  que  tus  sueños  se  quedan  solo  en  papel.  Contáctanos  ahora  y  un  miembro de nuestro equipo estará encantado de ayudarte
                                </p>
                                <h1 style={{textAlign: "center", margin: "3rem", color: "var(--secundary-color-ipoteca)"}}>{"¿Hablamos?"}</h1>
                            </div>
                            <div className="col-span-1 medium-col-span-3">
                                <div className="clausula-text">
                                    <span>
                                    *La  única  finalidad  de  esta  herramienta  es  orientar  sobre  el  coste  estimado  de  la  financiación,  dependiendo de los datos indicados por el usuario. No supone en ningún caso oferta contractual, ni la  aprobación  de  la  operación  por  parte  de  las  entidades  ni  compromiso  o  vínculo  jurídico-legal  alguno de consumarla por su parte ni por parte de Pignus.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <img src="./img/mini_pleca_amarilla.png" alt="footer" style={{width: "100%", maxWidth: "49rem"}}/>
                    </CardFooter>
                </Card>
            </Block>
        </Page>
    )
}
