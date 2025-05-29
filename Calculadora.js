// Calculadora.js
// Contém a lógica de cálculo extraída e adaptada de Calculator.jsx

// Garantindo que a entrada seja um número.
const num = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return parseFloat(value.replace(',', '.'));
  }
  return NaN; // Retorna NaN para tipos não suportados ou undefined/null
};

// ------------------------------------------------------------ //
// Filtrando melhor os números //
// ------------------------------------------------------------ //

const calcularIndicadoresFinanceiros = (km, faturamento, precoCombustivel, consumo) => {
  // Validação inicial de preenchimento (semelhante à original, mas sem setErro)
  if (km === undefined || km === '' || 
      faturamento === undefined || faturamento === '' || 
      precoCombustivel === undefined || precoCombustivel === '' || 
      consumo === undefined || consumo === '') {
    // console.error('Todos os campos devem ser preenchidos!');
    return null; // Indica erro de preenchimento
  }

  const numKm = num(km);
  const numFat = num(faturamento);
  const numPreco = num(precoCombustivel);
  const numCons = num(consumo);

  // Validação de valores numéricos (semelhante à original)
  if ([numKm, numFat, numPreco, numCons].some(isNaN)) {
    // console.error('Valores inválidos. Verifique os números digitados.');
    return null; // Indica erro de valor não numérico
  }
  if (numKm <= 0 || numPreco <= 0 || numCons <= 0) {
    // console.error('KM, Preço Combustível e Consumo devem ser maiores que zero.');
    return null; // Indica erro de valor não positivo onde esperado
  }
  if (numFat < 0) {
    // console.error('Faturamento não pode ser negativo.');
    return null; // Indica erro de faturamento negativo
  }

 // ----------------------------------------------------------//
  // FÓRMULA USADA NOS CÁLCULOS // 
 // ----------------------------------------------------------//
  
  const gastoCombustivel = (numKm / numCons) * numPreco;
  const lucroBruto = numFat - gastoCombustivel;
  const gastoPorKm = numKm > 0 ? gastoCombustivel / numKm : 0; // Evita divisão por zero

  return {
    gastoCombustivel,
    lucroBruto,
    gastoPorKm
  };
};
