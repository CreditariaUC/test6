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
    List,
    Range,
    ListInput,
    ListItem,
    f7
} from 'framework7-react';

export const FinalPage = (props) => {

    const { f7route, f7router } = props;

    let dialog;
    const input_name = document.getElementById("name");
    const input_ap_paterno = document.getElementById("ap_paterno");
    const input_ap_materno = document.getElementById("ap_materno");
    const input_phone = document.getElementById("phone");
    const input_email = document.getElementById("email");
    const input_autorizo = document.getElementsByName("autorizo")[0];

    if (input_name) {
        input_name.addEventListener("input", () => (input_name.value.length < 3) ? input_name.style.border = "1px solid red" : input_name.style.border = "1px solid #A4CB6A");
    }
    if (input_ap_paterno) {
        input_ap_paterno.addEventListener("input", () => (input_ap_paterno.value.length < 3) ? input_ap_paterno.style.border = "1px solid red" : input_ap_paterno.style.border = "1px solid #A4CB6A");
    }
    if (input_ap_materno) {
        input_ap_materno.addEventListener("input", () => (input_ap_materno.value.length < 3) ? input_ap_materno.style.border = "1px solid red" : input_ap_materno.style.border = "1px solid #A4CB6A");
    }
    if (input_phone) {
        input_phone.addEventListener("input", () => (input_phone.value.length < 10) ? input_phone.style.border = "1px solid red" : input_phone.style.border = "1px solid #A4CB6A");
    }
    if (input_email) {
        input_email.addEventListener("input", () => (input_email.value.length < 3) ? input_email.style.border = "1px solid red" : input_email.style.border = "1px solid #A4CB6A");

        input_email.addEventListener("change", () => {
            let regexCorreoElectronico = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            let isValid = regexCorreoElectronico.test(input_email.value.trim());
            if (!isValid) {
                input_email.style.border = "1px solid red";
            } else {
                input_email.style.border = "1px solid #A4CB6A";
            }
        });
    }

    const validateForm = () => {
        let valid = true;
        if (input_name.value === "") {
            input_name.style.border = "1px solid red";
            valid = false;
        } else {
            input_name.style.border = "1px solid #A4CB6A";
        }
        if (input_ap_paterno.value === "") {
            input_ap_paterno.style.border = "1px solid red";
            valid = false;
        } else {
            input_ap_paterno.style.border = "1px solid #A4CB6A";
        }
        if (input_ap_materno.value === "") {
            input_ap_materno.style.border = "1px solid red";
            valid = false;
        } else {
            input_ap_materno.style.border = "1px solid #A4CB6A";
        }
        if (input_phone.value === "") {
            input_phone.style.border = "1px solid red";
            valid = false;
        } else {
            input_phone.style.border = "1px solid #A4CB6A";
        }
        if (input_email.value === "") {
            input_email.style.border = "1px solid red";
            valid = false;
        } else {
            input_email.style.border = "1px solid #A4CB6A";
        }

        if (input_autorizo.checked === false) {
            f7.dialog.alert('Debes aceptar que autorizas a Pignus para tratar tus datos personales!', 'Datos incompletos');
            valid = false;
        }
        return valid;
    }

    const openCustomPreloader = () => {
        dialog = f7.dialog.preloader('Cargando...');
    };

    const closeCustomPreloader = () => {
        dialog.close();
    };

    const summitForm = async () => {
        if (validateForm()) {
            openCustomPreloader();
            let datad = props.data;
            datad.name = input_name.value;
            datad.ap_paterno = input_ap_paterno.value;
            datad.ap_materno = input_ap_materno.value;
            datad.phone = input_phone.value;
            datad.email = input_email.value;
            datad.autorizo = input_autorizo.checked;
            datad.plazo = "35";
            datad.tipo_financiacion = "cuota";

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
                        console.log("Error");
                    }
                })
                .catch((error) => {
                    f7.dialog.alert('Ocurrio un error al enviar tus datos, intenta mas tarde!', 'Error');
                    console.error('Error:', error);
                });
        } else {
            f7.dialog.alert('Debes completar todos los campos obligatorios (*)', 'Datos incompletos');
        }
    }

    return (
        <Page name="final" colorTheme="teal">
            <Block className='container-messages'>
                <Card outline style={{ backgroundColor: "white", borderColor: "#d1d1d1", boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)" }}>
                    <CardHeader valign="bottom" style={{ justifyContent: "center" }}>
                        <h4>Facilitanos tus datos y un asesor se comunicará contigo</h4>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <Block>
                            <div className='grid grid-cols-1 medium-grid-cols-2 grid-gap'>
                                <div>
                                    <h2 style={{ fontWeight: "normal" }}>Nombre(s)</h2>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder='Nombre(s) *'
                                        className='card-div'
                                        required
                                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "1rem", color: "#090909", width: "100%", border: "1px solid #CED4DA" }}
                                    />
                                </div>
                                <div>
                                    <h2 style={{ fontWeight: "normal" }}>Primer Apellido</h2>
                                    <input
                                        type="text"
                                        name="ap_paterno"
                                        id="ap_paterno"
                                        placeholder='Primer Apellido *'
                                        className='card-div'
                                        required
                                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "1rem", color: "#090909", width: "100%", border: "1px solid #CED4DA" }}
                                    />
                                </div>
                                <div>
                                    <h2 style={{ fontWeight: "normal" }}>Segundo Apellido</h2>
                                    <input
                                        type="text"
                                        name="ap_materno"
                                        id="ap_materno"
                                        placeholder='Segundo Apellido *'
                                        className='card-div'
                                        required
                                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "1rem", color: "#090909", width: "100%", border: "1px solid #CED4DA" }}
                                    />
                                </div>
                                <div>
                                    <h2 style={{ fontWeight: "normal" }}>Teléfono</h2>
                                    <input
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        placeholder='Teléfono de contacto *'
                                        className='card-div'
                                        required
                                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "1rem", color: "#090909", width: "100%", border: "1px solid #CED4DA" }}
                                    />
                                </div>
                                <div>
                                    <h2 style={{ fontWeight: "normal" }}>Correo electrónico</h2>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Correo electrónico *'
                                        className='card-div'
                                        required
                                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "1rem", color: "#090909", width: "100%", border: "1px solid #CED4DA" }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: "2rem" }}>
                                <List strongIos outlineIos dividersIos>
                                    <ListItem checkbox title="Autorizo a Pignus para que traten mis datos personales, financieros y patrimoniales, únicamente para efectos de este ejercicio y para preautorizar mi financiación.*" name="autorizo" />
                                </List>
                            </div>
                        </Block>
                    </CardContent>
                    <hr />
                    <CardFooter style={{ justifyContent: "center" }}>
                        <Button fill round large onClick={summitForm} style={{ backgroundColor: "var(--primay-color-ipoteca)", color: "#000", width: "100%" }}>
                            <h2>{"Ver mis resultados >>"}</h2>
                        </Button>
                    </CardFooter>
                </Card>
            </Block>
        </Page>
    );
};