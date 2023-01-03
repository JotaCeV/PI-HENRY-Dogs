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

  return errors;
}

export { validate };
