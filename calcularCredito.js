export function calcularCredito(renda, idade, clt, divida) {
  if (divida) {
    return { aprovado: false, percentual: 0, valor: 0 };
  }

  let percentual = 0;

  if (idade <= 24) {
    percentual = 25;
  } else if (idade <= 49) {
    percentual = 40;
  } else if (idade <= 64) {
    percentual = 30;
  } else {
    percentual = 15;
  }

  if (!clt) {
    percentual = percentual / 2;
  }

  const valor = (renda * percentual) / 100;

  return { aprovado: true, percentual: percentual, valor: valor };
}
