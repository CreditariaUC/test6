import React, { Component } from 'react';
import {
    Page,
    Navbar,
    NavTitle,
    NavTitleLarge,
    Link,
    Toolbar,
    Block,
    Messages,
    MessagesTitle,
    Message,
    Messagebar,
    Icon,
    Button,
    f7,
    Popup,
    Sheet,
    PageContent,
    BlockTitle,
    Range,
} from 'framework7-react';


const Principal = ({ f7route, f7router }) => {

    let state = {
        step: 1,
        inputValue: '',
        tipoVivienda: '',
        tipoFinanciacion: '',
        inputRenta: '',
        inputAhorro: '',
        typingMessage: false,
        rangeValue: 15,
        estadovivienda: '',
    };

    const componentDidMount = () => {
        setTimeout(() => {
            state.step = 2;
            console.log(state.step);
        }, 1000);
    }
    componentDidMount();

    const datenow = new Date();

    const handleInput = (event) => {
        if (event) {
            let inputValue = event.target.value;
            inputValue = inputValue.replace(/[^\d]/g, '');
            inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            state.inputValue = inputValue;
        }
    };

    const handleInputRenta = (event) => {
        if (event) {
            let inputRenta = event.target.value;
            inputRenta = inputRenta.replace(/[^\d]/g, '');
            inputRenta = inputRenta.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            state.inputRenta = inputRenta;
        }
    };

    const handleInputAhorro = (event) => {
        if (event) {
            let inputAhorro = event.target.value;
            inputAhorro = inputAhorro.replace(/[^\d]/g, '');
            inputAhorro = inputAhorro.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            state.inputAhorro = inputAhorro;
        }
    };

    const handleInputSubmit = (e) => {
        if (e){
            if (e.keyCode === 13) {
                if (state.inputValue != "") {
                    state.step = 3;
                    state.tipoFinanciacion = '';
                    reproducirSonido();
                    setTimeout(() => {
                        state.step = 4;
                        reproducirSonido();
                    }, 2000);
                } else {
                    openError();
                }
            }
        }
    };

    const handleInputClickSummit = (e) => {
        state.step = 3;
        state.tipoVivienda = '';
        state.tipoFinanciacion = '';
        reproducirSonido();
        setTimeout(() => {
            state.step = 4;
            reproducirSonido();
        }, 2000);
    };

    const handleInputSubmitRenta = (e) => {
        if (e.keyCode === 13) {
            reproducirSonido();
            openAlert();
        }
    };

    const handleInputSubmitAhorro = (e) => {
        if (e.keyCode === 13) {
            reproducirSonido();
            state.step = 11;
            handleScrollDown();
            setTimeout(() => {
                state.typingMessage = true;
                handleScrollDown();
                setTimeout(() => {
                    sendDataToApi();
                    state.typingMessage = false;
                    state.step = 12;
                }, 1000);
            }, 2000);
        }
    };

    const sendDataToApi = () => {
        console.log("Enviando datos a la API");
        console.log(state)
    }

    const handleFinalSubmit = (e) => {
        reproducirSonido();
        state.step = 11;
        handleScrollDown();
        setTimeout(() => {
            state.typingMessage = true;
            handleScrollDown();
            setTimeout(() => {
                sendDataToApi();
                state.typingMessage = false;
                state.step = 12;
            }, 1000);
        }, 2000);
    }

    const handleTipoViviendaChange = (event) => {
        state.tipoVivienda = event.target.id;
        revizarValoresActivos();
        reproducirSonido();
        if (event.target.id === "rentada") {
            setTimeout(() => {
                state.step = 7;
                reproducirSonido();
                handleScrollDown();
            }, 1200);
        } else {
            state.step = 8;
            reproducirSonido();
            handleScrollDown();
            setTimeout(() => {
                state.step = 9;
                reproducirSonido();
                handleScrollDown();
            }, 1500);
        }
    };

    const handleEstadoViviendaChange = (event) => {
        state.estadovivienda = event.target.id;
        revizarValoresActivos();
        reproducirSonido();
        state.step = 5;
        handleScrollDown();
        setTimeout(() => {
            state.step = 6;
            reproducirSonido();
            handleScrollDown();
        }, 1200);
    }

    const handleTipoFinanciacionChange = (event) => {
        revizarValoresActivos();
        state.step = 9;
        handleScrollDown();
        state.tipoFinanciacion = event.target.id;
        if (event.target.id === "mensualidad") {
            handleFinalSubmit();
        } else {
            reproducirSonido();
            setTimeout(() => {
                state.step = 10;
                reproducirSonido();
                handleScrollDown();
            }, 1200);
        }
    }

    const revizarValoresActivos = () => {
        (state.typingMessage) ? state.typingMessage = false : null;
        (state.tipoFinanciacion != "") ? state.tipoFinanciacion = "" : null;
    }

    const handleScrollDown = () => {
        const scrollContainer = document.getElementById('homepage');
        if (scrollContainer) {
            setTimeout(() => {
                scrollContainer.scrollIntoView(false);
                setTimeout(() => {
                    scrollContainer.scrollIntoView(false);
                }, 100);
            }, 100);
        }

    };

    const reproducirSonido = () => {
        const sound = document.getElementById('sound');
        (sound) ? sound.play() : null;
    };

    const openAlert = () => {
        f7.dialog.create({
            title: '<h3>¿Sabías que?...</h3>',
            text: '<span style="font-size: 1.1rem;">Con lo que pagas de alquiler, a través de <span style="font-weight: 800; color: #A4CB6A;">Pignus</span>, podrías financiarte un inmueble de aproximadamente <span style="font-weight: 800; color: #A4CB6A;">$198,000.00</span></span>',
            buttons: [
                {
                    text: 'Continuar',
                    onClick: () => {
                        setStep(8);
                        reproducirSonido();
                        handleScrollDown();
                        setTimeout(() => {
                            setStep(9);
                            reproducirSonido();
                            handleScrollDown();
                        }, 1500);
                        f7.dialog.close();
                    }
                },
            ],
        }).open();
    };

    const openError = () => {
        f7.dialog.create({
            title: '<h3>¡Ups!...</h3>',
            text: '<span style="font-size: 1.1rem;">Por favor, ingresa un valor válido.</span>',
            buttons: [
                {
                    text: 'Aceptar',
                    onClick: () => {
                        f7.dialog.close();
                    }
                },
            ],
        }).open();
    }

    const setStep = (step) => {
        state.step = step;
    }

    const viewResults = () => {
        f7router.navigate('/results/122123', {
            props: {
                inputValue: state.inputValue,
                tipoVivienda: state.tipoVivienda,
                tipoFinanciacion: state.tipoFinanciacion,
                inputRenta: state.inputRenta,
                inputAhorro: state.inputAhorro,
                rangeValue: state.rangeValue,
                estadovivienda: state.estadovivienda,
            }
        });
    }
    return (
        <>
            <Page name="home" colorTheme="teal">
                <Block className='container-messages'>
                    <Link onClick={() => f7route.navigate('/results/12121212')}>About</Link>
                    <Messages id="homepage">
                        <MessagesTitle>
                            <b>{datenow.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</b>
                        </MessagesTitle>
                        {state.step >= 1 && (
                            <Message
                                type="received"
                                text="¡Hola! Para empezar, ¿me puedes decir cuánto vale el inmueble que te interesa?"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.step >= 1 && (
                            <Message
                                type="sent"
                                text="El valor del inmueble que busco es de:"
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot="bubble-end">
                                    <div style={{ display: "flex", justifyItems: "center", alignItems: "center", backgroundColor: "white", borderRadius: "15px" }}>
                                        <Icon f7="money_euro" size="25px" color="green"></Icon>
                                        <input
                                            type="text"
                                            name="inmueble"
                                            id="inmueble"
                                            autoFocus
                                            placeholder='0.00'
                                            defaultValue={state.inputValue}
                                            onInput={handleInput()}
                                            onKeyDown={handleInputSubmit()}
                                            style={{ backgroundColor: "white", borderRadius: "15px", padding: "8px", color: "#090909", width: "100%" }}
                                        />
                                        {state.inputValue != "" && (
                                            <div
                                                onClick={handleInputClickSummit()}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Icon
                                                    f7="checkmark_alt_circle_fill"
                                                    size="25px"
                                                    color="green"
                                                    style={{ marginRight: "5px" }}
                                                ></Icon>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Message>
                        )}
                        {state.step >= 3 && (
                            <Message
                                type="received"
                                text="La vivienda que buscas es:"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.step >= 4 && (
                            <Message
                                type="sent"
                                text=""
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot="bubble-end">
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="estadovivienda" id="nueva" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleEstadoViviendaChange()} /> Obra nueva
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="estadovivienda" id="segunda" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleEstadoViviendaChange()} /> Segunda mano
                                        </div>
                                    </div>
                                </div>
                            </Message>
                        )}
                        {state.step >= 5 && (
                            <Message
                                type="received"
                                text="Genial, ¿actualmente vives en casa propia o alquilada?"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.step >= 6 && (
                            <Message
                                type="sent"
                                text=""
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot="bubble-end">
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="tipovivienda" id="rentada" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleTipoViviendaChange()} /> Alquilada
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="tipovivienda" id="propia" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleTipoViviendaChange()} /> Propia
                                        </div>
                                    </div>
                                </div>
                            </Message>
                        )}
                        {state.tipoVivienda === "rentada" && (
                            <Message
                                type="received"
                                text="¿Cuánto pagas de alquiler?"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.tipoVivienda == "rentada" && state.step >= 7 && (
                            <Message
                                type="sent"
                                text="Actualmente pago:"
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot="bubble-end">
                                    <div style={{ display: "flex", justifyItems: "center", alignItems: "center", backgroundColor: "white", borderRadius: "15px" }}>
                                        <Icon f7="money_euro" size="25px" color="green"></Icon>
                                        <input
                                            type="text"
                                            name="valorrenta"
                                            id="valorrenta"
                                            autoFocus
                                            placeholder='0.00'
                                            defaultValue={state.inputRenta}
                                            onInput={handleInputRenta()}
                                            onKeyDown={handleInputSubmitRenta()}
                                            style={{ backgroundColor: "white", borderRadius: "15px", padding: "8px", color: "#090909" }}
                                        />
                                    </div>
                                </div>
                            </Message>
                        )}
                        {state.step >= 8 && (
                            <Message
                                type="received"
                                text="¿Qué es lo más importante para ti en una financiación?"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.step >= 9 && (
                            <Message
                                type="sent"
                                text=""
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot="bubble-end">
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="tipoFinanciacion" id="ahorro" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleTipoFinanciacionChange()} /> 💰 Ahorros
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="tipoFinanciacion" id="plazo" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleTipoFinanciacionChange()} /> ⌛ Plazo
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input type="radio" name="tipoFinanciacion" id="mensualidad" style={{ width: "1.3rem", height: "1.3rem" }} onChange={handleTipoFinanciacionChange()} /> 📅 Mensualidad
                                        </div>
                                    </div>
                                </div>
                            </Message>
                        )}
                        {state.tipoFinanciacion == "ahorro" && (
                            <Message
                                type="received"
                                text="¿Cuántos ahorros vas a aportar?"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.tipoFinanciacion == "ahorro" && state.step >= 10 && (
                            <Message
                                type="sent"
                                text="Tengo ahorrado:"
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot="bubble-end">
                                    <div style={{ display: "flex", justifyItems: "center", alignItems: "center", backgroundColor: "white", borderRadius: "15px" }}>
                                        <Icon f7="money_euro" size="25px" color="green"></Icon>
                                        <input
                                            type="text"
                                            name="valorahorro"
                                            id="valorahorro"
                                            autoFocus
                                            placeholder='0.00'
                                            defaultValue={state.inputAhorro}
                                            onInput={handleInputAhorro()}
                                            onKeyDown={handleInputSubmitAhorro()}
                                            style={{ backgroundColor: "white", borderRadius: "15px", padding: "8px", color: "#090909" }}
                                        />
                                    </div>
                                </div>
                            </Message>
                        )}
                        {state.tipoFinanciacion == "plazo" && (
                            <Message
                                type="received"
                                text="Elige el plazo que prefieres:"
                                name="pignus"
                                className='items-normal'
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}
                        {state.tipoFinanciacion == "plazo" && state.step >= 10 && (
                            <Message
                                type="sent"
                                name="client"
                                tail={true}
                                className='items-normal'
                            >
                                <div slot="start">
                                    <img width={75} src="./img/cliente.png" />
                                </div>
                                <div slot='bubble-start'>
                                    <span>Deseo tener un plazo de: <span style={{ fontWeight: "800" }}>{state.rangeValue} años</span></span>
                                </div>
                                <div slot="bubble-end" style={{ width: "16rem" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div style={{ padding: "8px", backgroundColor: "white", borderRadius: "15px", marginTop: "8px", width: "75%" }}>
                                            <Range min={5} max={30} step={5} value={state.rangeValue} onRangeChange={(e) => { state.rangeValue= e; }} label={true} color="green" />
                                        </div>
                                        <div
                                            onClick={handleFinalSubmit()}
                                            style={{ cursor: "pointer", marginTop: "8px" }}
                                        >
                                            <Icon
                                                f7="checkmark_alt_circle_fill"
                                                size="25px"
                                                color="white"
                                                style={{ marginLeft: "8px" }}
                                            ></Icon>
                                        </div>
                                    </div>
                                </div>
                            </Message>
                        )}



                        {state.step >= 11 && (
                            <Message
                                type="received"
                                text="¡Listo!, Voy a realizar algunos cálculos ahora mismo."
                                name="pignus"
                                className='items-normal'
                                last={true}
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}

                        {state.step >= 12 && (
                            <Message
                                type="received"
                                text="Tengo excelentes resultados. "
                                name="pignus"
                                className='items-normal'
                                last={true}
                                style={{ marginBottom: "1rem" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                                <div slot="bubble-end" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Button raised fill round onClick={viewResults()}>
                                        Ver resultados
                                    </Button>
                                </div>
                                <div slot="end"></div>
                                <div slot="content-start">Pignus</div>
                            </Message>
                        )}


                        {state.typingMessage && (
                            <Message
                                type="received"
                                name="pignus"
                                typing={true}
                                last={true}
                                header="Pignus esta analizando la información..."
                                style={{ alignItems: "flex-start" }}
                            >
                                <div slot="start">
                                    <img width={75} src="./img/chatbot.png" />
                                </div>
                            </Message>
                        )}
                    </Messages>
                </Block>
            </Page>
            <audio id="sound" src="./music/msg.mp3"></audio>
        </>
    );
};

export default Principal;