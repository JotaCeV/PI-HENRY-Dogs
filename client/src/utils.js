function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Escriba un Nombre";
  }
  if (!input.height) {
    errors.height = "Seleccione la Altura";
  }
  if (!input.weight) {
    errors.weight = "Seleccione el Peso";
  }
  if (!input.temperament) {
    errors.temperament = "Escriba un Temperamento como minimo";
  }

  return errors;
}

export { validate };
