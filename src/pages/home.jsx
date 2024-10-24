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
  List,
  ListGroup,
  ListItem,
  ListIndex
} from 'framework7-react';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      inputValue: '',
      tipoVivienda: '',
      tipoFinanciacion: 'mensualidad',
      inputRenta: '',
      inputAhorro: '',
      typingMessage: false,
      rangeValue: 15,
      estadovivienda: '',
      listProvicens: [],
      selectProvince: 0,
      mensualidad: 0,
      inpuestos_gastos: 0,
      ahorro_minimo: 0,
      photoCliente: "./img/cliente03.png",
      access_token: (this.props.f7route.query.token) ? this.props.f7route.query.token : null,
      name: '',
      phone: '',
      email: '',
      dialog: null,
      is_user: false,
      isMobile: window.innerWidth <= 768,
    };
    this.reproducirSonido();
    this.datenow = new Date();
    this.f7router = this.props.f7router;
    this.handleGetMonntoAhorroMinimo();

    if (this.state.access_token) {
      fetch('https://test.pignus.es/api/portal/get/partner/'+this.state.access_token, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          if (data.email && data.email.trim() !== '') {
            this.setState({ name: data.name, phone: data.phone, email: data.email, is_user: true });
          } else {
            this.setState({ is_user: false });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ step: 2 });
    }, 1000);
  }

  changePhotoCliente = () => {
    if (this.state.photoCliente === "./img/cliente03.png") {
      this.setState({ photoCliente: "./img/cliente04.png" });
    } else {
      this.setState({ photoCliente: "./img/cliente03.png" });
    }
  }

  getFormatMonetary = (value) => {
    if (value === "") return 0;
    value = value.toFixed(0);
    value = value.replace(/[^\d]/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return value;
  }

  handleGetMonntoAhorroMinimo = async () => {
    await fetch('https://test.pignus.es/api/get/ahorro/minimo', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipe: 'porcentaje' }) 
      })
      .then(res => res.json())
      .then(data => {
        if (data.result.status === 200) {
          this.setState({ ahorro_minimo: data.result.ahorro_minimo });
        }
      })
      .catch((error) => {
        this.setState({ ahorro_minimo: 20 });
        console.error('Error:', error);
      });
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInput = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    let inputAhorro = parseInt(this.formatStringMonetary(inputValue)*(this.state.ahorro_minimo/100), 10).toString();
    
    inputAhorro =  inputAhorro.replace(/[^\d]/g, '');
    inputAhorro =  inputAhorro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.setState({
      inputValue: inputValue,
      inputAhorro: inputAhorro
    });

  };

  handleInputRenta = (event) => {
    let inputRenta = event.target.value;
    inputRenta = inputRenta.replace(/[^\d]/g, '');
    inputRenta = inputRenta.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.setState({
      inputRenta: inputRenta
    });
  };

  handleInputAhorro = (event) => {
    let inputAhorro = event.target.value;
    inputAhorro = inputAhorro.replace(/[^\d]/g, '');
    inputAhorro = inputAhorro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.setState({
      inputAhorro: inputAhorro
    });
  };

  handleInputSubmit = (e) => {
    if (e.keyCode === 13) {
      if (this.state.inputValue != "" && this.state.inputValue != "0") {
        this.setState({ step: 3, tipoVivienda: '', tipoFinanciacion: '' });
        this.reproducirSonido();
        setTimeout(() => {
          this.setState({ step: 4 });
          this.reproducirSonido();
        }, 2000);
      } else {
        this.openError();
      }
    }
  };

  handleInputClickSummit = (e) => {
    if (this.state.inputValue != "" && this.state.inputValue != "0") {
      this.setState({ step: 3, tipoVivienda: '', tipoFinanciacion: '' });
      this.reproducirSonido();
      setTimeout(() => {
        this.setState({ step: 4 });
        this.reproducirSonido();
      }, 2000);
    }else{
      this.openError();
    }
  };

  formatValueMonetary = (value) => {
    return value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatStringMonetary = (value) => {
    return parseInt(value.replaceAll('.', ''), 10);
  }

  formatMonetaryLocal = (value) => {
    let format = parseInt(value, 10);
    format = format.toString();
    format = format.replace(/[^\d]/g, '');
    format = format.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return format;
  }

  handleInputSubmitRenta = async (e) => {
    if (e.keyCode === 13) {
      if (this.state.inputRenta != "") {
        await fetch('https://test.pignus.es/api/consult/alquiler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mensualidad: this.state.inputRenta })
        })
          .then(res => res.json())
          .then(data => {
            if (data.result.status === 200) {
              this.dialogViviendaParaAlquiler(this.formatMonetaryLocal(data.result.valor_inmueble));
            } else {
              this.setStep(10);
              this.reproducirSonido();
              this.handleScrollDown();
              setTimeout(() => {
                this.setStep(11);
                this.reproducirSonido();
                this.handleScrollDown();
              }, 1500);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            this.setStep(10);
            this.reproducirSonido();
            this.handleScrollDown();
            setTimeout(() => {
              this.setStep(11);
              this.reproducirSonido();
              this.handleScrollDown();
            }, 1500);
          });
      } else {
        f7.dialog.alert('Ingrese un valor antes de continuar', 'Campo vació');
      }
    }
  };

  handleInputClickSummitRenta = async (e) => {
    if (this.state.inputRenta != "") {
      await fetch('https://test.pignus.es/api/consult/alquiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensualidad: this.state.inputRenta })
      })
        .then(res => res.json())
        .then(data => {
          if (data.result.status === 200) {
            this.dialogViviendaParaAlquiler(this.formatMonetaryLocal(data.result.valor_inmueble));
          } else {
            this.setStep(10);
            this.reproducirSonido();
            this.handleScrollDown();
            setTimeout(() => {
              this.setStep(11);
              this.reproducirSonido();
              this.handleScrollDown();
            }, 1500);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          this.setStep(10);
          this.reproducirSonido();
          this.handleScrollDown();
          setTimeout(() => {
            this.setStep(11);
            this.reproducirSonido();
            this.handleScrollDown();
          }, 1500);
        });
    } else {
      f7.dialog.alert('Ingrese un valor antes de continuar', 'Campo vació');
    }
  }

  handleInputSubmitAhorro = (e) => {
    if (e.keyCode === 13) {
      if (parseInt(this.formatStringMonetary(this.state.inputAhorro), 10) < parseInt(this.formatStringMonetary(this.state.inputValue)*(this.state.ahorro_minimo/100), 10)) {
        alert("El valor de los ahorros debe ser mayor o igual al "+this.state.ahorro_minimo+"% del valor del inmueble");
        this.printMessageErrorAhorro();
      } else {
        this.reproducirSonido();
        this.setState({ step: 12 });
        this.handleScrollDown();
        setTimeout(() => {
          this.setState({ step: 13 });
          this.reproducirSonido();
          this.handleScrollDown();
        }, 2000);
      }
    }
  };

  printMessageErrorAhorro = () => {
    f7.dialog.alert(('El valor de los ahorros debe ser mayor o igual al '+this.state.ahorro_minimo+'% del valor del inmueble'), 'Monto minimo');
  }

  handleInputClickSummitAhorro = (e) => {
    if (parseInt(this.formatStringMonetary(this.state.inputAhorro), 10) < parseInt(this.formatStringMonetary(this.state.inputValue)*(this.state.ahorro_minimo/100), 10)) {
      this.printMessageErrorAhorro();
    } else {
      this.reproducirSonido();
      this.setState({ step: 12 });
      this.handleScrollDown();
      setTimeout(() => {
        this.setState({ step: 13 });
        this.reproducirSonido();
        this.handleScrollDown();
      }, 2000);
    }
  }

  sendDataToApi = async () => {
    const data = {
      valor_inmueble: this.state.inputValue,
      tipo_vivienda: this.state.tipoVivienda,
      valor_renta: this.state.inputRenta,
      valor_ahorro: this.state.inputAhorro,
      provincia: this.state.selectProvince,
      estado_vivienda: this.state.estadovivienda,
    }
    
    await fetch('https://test.pignus.es/api/credito/ipoteca', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.status === 200) {
          this.setState({ typingMessage: false, step: 15, mensualidad: data.result.mensualidad, inpuestos_gastos: data.result.inpuestos_gastos });
          this.reproducirSonido();
          this.handleScrollDown();
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleFinalSubmit = (e) => {
    this.reproducirSonido();
    this.setState({ step: 13 });
    this.handleScrollDown();
    setTimeout(() => {
      this.setState({ typingMessage: true });
      this.handleScrollDown();
      setTimeout(() => {
        this.sendDataToApi();
      }, 1000);
    }, 2000);
  }

  handleTipoViviendaChange = (event) => {
    this.setState({ tipoVivienda: event.target.id });
    this.revizarValoresActivos();
    this.reproducirSonido();
    if (event.target.id === "rentada") {
      setTimeout(() => {
        this.setState({ step: 9 });
        this.reproducirSonido();
        this.handleScrollDown();
      }, 1200);
    } else {
      this.setState({ step: 10 });
      this.reproducirSonido();
      this.handleScrollDown();
      setTimeout(() => {
        this.setState({ step: 11 });
        this.reproducirSonido();
        this.handleScrollDown();
      }, 1500);
    }
  };

  handleEstadoViviendaChange = async (event) => {
    await fetch('https://test.pignus.es/api/provinces', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          this.state.listProvicens = data.provinces;
          this.state.selectProvince = data.provinces[0].id;
          this.setState({ estadovivienda: event.target.id });
          this.revizarValoresActivos();
          this.reproducirSonido();
          this.setState({ step: 5 });
          this.handleScrollDown();
          setTimeout(() => {
            this.setState({ step: 6 });
            this.reproducirSonido();
            this.handleScrollDown();
          }, 1200);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.state.listProvicens = [
          {"id": 2,"name": "Andaluc\u00eda"},
          {"id": 3,"name": "Arag\u00f3n"},
          {"id": 4,"name": "Asturias"},
          {"id": 5,"name": "Baleares"},
          {"id": 6,"name": "Canarias"},
          {"id": 7,"name": "Cantabria"},
          {"id": 8,"name": "Castilla y Le\u00f3n"},
          {"id": 9,"name": "Castilla - La Mancha"},
          {"id": 10,"name": "Catalu\u00f1a"},
          {"id": 11,"name": "Comunidad Valenciana"},
          {"id": 12,"name": "Extremadura"},
          {"id": 13,"name": "Galicia"},
          {"id": 14,"name": "Madrid"},
          {"id": 15,"name": "Murcia"},
          {"id": 16,"name": "Navarra"},
          {"id": 17,"name": "Pa\u00eds Vasco"},
          {"id": 18,"name": "La Rioja"},
          {"id": 19,"name": "Ceuta"},
          {"id": 20,"name": "Melilla"}
        ];
        this.setState({ estadovivienda: event.target.id });
        this.revizarValoresActivos();
        this.reproducirSonido();
        this.setState({ step: 5 });
        this.handleScrollDown();
        setTimeout(() => {
          this.setState({ step: 6 });
          this.reproducirSonido();
          this.handleScrollDown();
        }, 1200);
      });
  }

  handleSetProvince = (event) => {
    this.setState({ selectProvince: event.target.value });
  }

  handleSubmitProvince = () => {
    this.revizarValoresActivos();
    this.reproducirSonido();
    this.setState({ step: 7 });
    this.handleScrollDown();
    setTimeout(() => {
      this.setState({ step: 8 });
      this.reproducirSonido();
      this.handleScrollDown();
    }, 1200);
  }

  handleTipoFinanciacionChange = (event) => {
    this.revizarValoresActivos();
    this.setState({ step: 14 });
    this.handleScrollDown();
    this.setState({ tipoFinanciacion: event.target.id });
    this.reproducirSonido();
    setTimeout(() => {
      this.setState({ typingMessage: true });
      this.handleScrollDown();
      setTimeout(() => {
        this.sendDataToApi();
      }, 1000);
    }, 1200);
  }

  revizarValoresActivos = () => {
    (this.state.tipoFinanciacion != "") ? this.setState({ tipoFinanciacion: "" }) : null;
    (this.state.typingMessage) ? this.setState({ typingMessage: false }) : null;
  }

  handleScrollDown = () => {
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

  reproducirSonido = () => {
    const sound = document.getElementById('sound');
    (sound) ? sound.play() : null;
  };

  dialogViviendaParaAlquiler = (monto) => {
    f7.dialog.create({
      title: '<h3>¿Sabías que?...</h3>',
      text: '<span style="font-size: 1.1rem;">Con lo que pagas de alquiler, a través de <span style="font-weight: 800; color: #142D46;">Pignus</span>, podrías financiarte un inmueble de aproximadamente <span style="font-weight: 800; color: #142D46;">€'+monto+'</span></span>',
      buttons: [
        {
          text: 'Continuar',
          onClick: () => {
            this.setStep(10);
            this.reproducirSonido();
            this.handleScrollDown();
            setTimeout(() => {
              this.setStep(11);
              this.reproducirSonido();
              this.handleScrollDown();
            }, 1500);
            f7.dialog.close();
          }
        },
      ],
    }).open();
  };

  openError = () => {
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

  setStep = (step) => {
    this.setState({ step: step });
  }

  viewResults = () => {
    this.f7router.navigate('/results/', {
      props: {
        data: {
          preferencia_de_financiacion: this.state.tipoFinanciacion,
          valor_vivienda: this.state.inputValue,
          tipo_vivienda: this.state.tipoVivienda,
          valor_renta: this.state.inputRenta,
          monto_ahorro: this.state.inputAhorro,
          estado_vivienda: this.state.estadovivienda,
          provincia: this.state.selectProvince,
          mensualidad: this.formatValueMonetary(this.state.mensualidad),
          inpuestos_gastos: this.formatMonetaryLocal(this.state.inpuestos_gastos),
          monto_credito: this.formatMonetaryLocal(this.formatStringMonetary(this.state.inputValue) - this.formatStringMonetary(this.state.inputAhorro)),
          access_token: this.state.access_token,
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          is_user: this.state.is_user,
        },
      }
    });
  }

  render() {
    return (
      <>
        <Page name="home" colorTheme="teal" style={{ backgroundImage: "url('./img/fondo.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
          <Block className='container-messages'>
            <Messages id="homepage">
              <MessagesTitle>
                <div><img src="./img/PIGNUS_COLOR.png" alt="logo" width={180}/></div>
                <b>{this.datenow.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</b>
              </MessagesTitle>
              {this.state.step >= 1 && (
                <Message
                  type="received"
                  text={"¡Hola! Para empezar, ¿me puedes decir cuánto vale el inmueble que te interesa?"}
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.step >= 2 && (
                <Message
                  type="sent"
                  text="El valor del inmueble que busco es de:"
                  name="client"
                  tail={true}
                  className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end">
                    <div style={{ display: "flex", justifyItems: "center", alignItems: "center", backgroundColor: "white", borderRadius: "15px" }}>
                      <Icon f7="money_euro" size="25px" color="blue"></Icon>
                      <input
                        type="text"
                        name="inmueble"
                        id="inmueble"
                        autoFocus
                        placeholder='0.00'
                        value={this.state.inputValue}
                        onInput={this.handleInput}
                        onKeyDown={this.handleInputSubmit}
                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "8px", color: "#090909", width: "90%" }}
                      />
                      {this.state.inputValue != "" && (
                        <div
                          onClick={this.handleInputClickSummit}
                          style={{ cursor: "pointer" }}
                        >
                          <Icon
                            f7="arrow_right_circle_fill"
                            size="25px"
                            color="blue"
                            style={{ marginRight: "5px" }}
                          ></Icon>
                        </div>
                      )}
                    </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}
              {this.state.step >= 3 && (
                <Message
                  type="received"
                  text="La vivienda que buscas es:"
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.step >= 4 && (
                <Message
                  type="sent"
                  text=""
                  name="client"
                  tail={true}
                  className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end">
                    <div style={{ textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="estadovivienda" id="nueva" style={{ width: "1.3rem", height: "1.3rem" }} onChange={this.handleEstadoViviendaChange} /> Obra nueva
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="estadovivienda" id="segunda" style={{ width: "1.3rem", height: "1.3rem" }} onChange={this.handleEstadoViviendaChange} /> Segunda mano
                      </div>
                    </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}
              {this.state.step >= 5 && (
                <Message
                  type="received"
                  text={this.state.estadovivienda === "nueva" ? "¿En qué lugar quieres comprar tu nueva casa?" : "¿En qué lugar quieres comprar tu casa?"}
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.step >= 6 && (
                <Message
                  type="sent"
                  text="Seleciona la localización:"
                  name="client"
                  tail={true}
                  className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end" style={{display: "flex", alignItems: "center"}}>
                    <List>
                      <ListItem title="En:" textColor='black' smartSelect smartSelectParams={{ openIn: 'sheet' }} >
                        <select name="superhero" onChange={this.handleSetProvince}>
                          {this.state.listProvicens.map((item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                          ))}
                        </select>
                      </ListItem>
                    </List>
                    <div
                        onClick={this.handleSubmitProvince}
                        style={{ cursor: "pointer" }}
                      >
                        <Icon
                          f7="arrow_right_circle_fill"
                          size="25px"
                          color="white"
                          style={{ marginLeft: "4px" }}
                        ></Icon>
                      </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}
              {this.state.step >= 7 && (
                <Message
                  type="received"
                  text="Genial, ¿actualmente vives en casa propia o alquilada?"
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.step >= 8 && (
                <Message
                  type="sent"
                  text=""
                  name="client"
                  tail={true}
                  className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end">
                    <div style={{ textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="tipovivienda" id="rentada" style={{ width: "1.3rem", height: "1.3rem" }} onChange={this.handleTipoViviendaChange} /> Alquilada
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="tipovivienda" id="propia" style={{ width: "1.3rem", height: "1.3rem" }} onChange={this.handleTipoViviendaChange} /> Propia
                      </div>
                    </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}
              {this.state.tipoVivienda === "rentada" && (
                <Message
                  type="received"
                  text="¿Cuánto pagas de alquiler?"
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.tipoVivienda == "rentada" && this.state.step >= 9 && (
                <Message
                  type="sent"
                  text="Actualmente pago:"
                  name="client"
                  tail={true}
                  className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end">
                    <div style={{ display: "flex", justifyItems: "center", alignItems: "center", backgroundColor: "white", borderRadius: "15px" }}>
                      <Icon f7="money_euro" size="25px" color="blue"></Icon>
                      <input
                        type="text"
                        name="valorrenta"
                        id="valorrenta"
                        autoFocus
                        placeholder='0.00'
                        value={this.state.inputRenta}
                        onInput={this.handleInputRenta}
                        onKeyDown={this.handleInputSubmitRenta}
                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "8px", color: "#090909", width: "90%" }}
                      />
                      {this.state.inputRenta != "" && (
                        <div
                          onClick={this.handleInputClickSummitRenta}
                          style={{ cursor: "pointer" }}
                        >
                          <Icon
                            f7="arrow_right_circle_fill"
                            size="25px"
                            color="blue"
                            style={{ marginRight: "5px" }}
                          ></Icon>
                        </div>
                      )}
                    </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}
              
              {this.state.step >= 10 && (
                <Message
                  type="received"
                  text="¿Cuánto ahorros vas a aportar inicialmente?"
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot='bubble-end' style={{display: "contents", fontSize: "small"}}>
                    <span>Ten en cuenta que debes aportar al menos el {this.state.ahorro_minimo}%</span>
                    <span>del valor del inmueble, pero también puedes</span>
                    <span>contribuir con más si lo deseas.</span>
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.step >= 11 && (
                <Message
                  type="sent"
                  text="Mi aporte de ahorros es:"
                  name="client"
                  tail={true}
                  className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end">
                    <div style={{ display: "flex", justifyItems: "center", alignItems: "center", backgroundColor: "white", borderRadius: "15px" }}>
                      <Icon f7="money_euro" size="25px" color="blue"></Icon>
                      <input
                        type="text"
                        name="valorahorro"
                        id="valorahorro"
                        autoFocus
                        placeholder='0.00'
                        value={this.state.inputAhorro}
                        onInput={this.handleInputAhorro}
                        onKeyDown={this.handleInputSubmitAhorro}
                        style={{ backgroundColor: "white", borderRadius: "15px", padding: "8px", color: "#090909", width: "90%" }}
                      />
                      {this.state.inputAhorro != "" && (
                        <div
                          onClick={this.handleInputClickSummitAhorro}
                          style={{ cursor: "pointer" }}
                        >
                          <Icon
                            f7="arrow_right_circle_fill"
                            size="25px"
                            color="blue"
                            style={{ marginRight: "5px" }}
                          ></Icon>
                        </div>
                      )}
                    </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}
              {this.state.step >= 12 && (
                <Message
                  type="received"
                  text="¿Con cuál de las siguientes frases te sientes más identificado?"
                  name="pignus"
                  className='items-normal'
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>

                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}
              {this.state.step >= 13 && (
                <Message
                type="sent"
                text=""
                name="client"
                tail={true}
                className='items-normal'
                >
                  <div slot="start">
                    { (this.state.isMobile) ?
                      <></>
                      :
                      <img width={75} src={this.state.photoCliente} onClick={this.changePhotoCliente} />
                    }
                  </div>
                  <div slot="bubble-end">
                    <div style={{ textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="tipoFinanciacion" id="mensualidad" style={{ width: "1.3rem", height: "1.3rem" }} onChange={this.handleTipoFinanciacionChange} /> Me gusta estar siempre en movimiento, buscando nuevas oportunidades y desafíos.
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="tipoFinanciacion" id="importe" style={{ width: "1.3rem", height: "1.3rem" }} onChange={this.handleTipoFinanciacionChange} /> Me gusta la tranquilidad y la vida en familia, busco estabilidad
                      </div>
                    </div>
                  </div>
                  <div slot="content-start">{this.state.name}</div>
                </Message>
              )}

              {this.state.step >= 14 && (
                <Message
                  type="received"
                  text="¡Listo!, Voy a realizar algunos cálculos ahora mismo."
                  name="pignus"
                  className='items-normal'
                  last={true}
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}

              {this.state.step >= 15 && (
                <Message
                  type="received"
                  text="Tengo excelentes resultados. "
                  name="pignus"
                  className='items-normal'
                  last={true}
                  style={{ marginBottom: "1rem" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                  <div slot="bubble-end" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button raised fill round onClick={this.viewResults} style={{ backgroundColor: "var(--primay-color-ipoteca)", color: "#000" }}>
                      Ver resultados
                    </Button>
                  </div>
                  <div slot="end"></div>
                  <div slot="content-start">Pignus</div>
                </Message>
              )}

              {this.state.typingMessage && (
                <Message
                  type="received"
                  name="pignus"
                  typing={true}
                  last={true}
                  header="Pignus está analizando la información..."
                  style={{ alignItems: "flex-start" }}
                >
                  <div slot="start">
                    <img width={75} src="./img/pignus_avatar_03.png" />
                  </div>
                </Message>
              )}
            </Messages>
          </Block>
        </Page>
        <audio id="sound" src="./music/msg.mp3"></audio>
      </>
    );
  }
};
export default HomePage;