import React, { Component } from "react";
import "./App.css";

//Constante para validar que el correo tenga la estructura correcta
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

// coloca en formValid falso si hay agun error
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // Valida si las "formErrors " tienen algo escrito, si es asi,entonces cambia el a valid false
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  // Valida que no hayan espacios vacios
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      //  en formErrors se escriben los errores segun sea el caso
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  
  handleSubmit = e => {
    // Sirve para que no se vean los datos ingresados en el link
    e.preventDefault();

    //Muestra por consola los datos si no hay error
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    //Se guarda el tipo name de las etiquetas y su valor( firstName=Michelle)
    const { name, value } = e.target;
    // Se copia los atributos del formErrors
    let formErrors = { ...this.state.formErrors };
    // se validan los datos insertados
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length === 0 ? "Inserte nombre por favor" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length === 0 ? "Inserte Apellido por favor" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Correo electronico invalido";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "De ser mayor a 6 digitos" : "";
        break;
      default:
        break;
    }
    // Se modifican los valores del formErrors (los del constructor)
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlform="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                noValidate
                onChange={this.handleChange}
              />

              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlform="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlform="email">Email</label>
              <input
                type="email"
                name="email"
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlform="password">Password</label>
              <input
                type="password"
                name="password"
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit"> Create Account </button>
              <small> Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
