// Calculadora.js
// Contém a lógica de cálculo extraída e adaptada de Calculator.jsx

/**
 * Helper para converter uma string (que pode conter vírgula como separador decimal)
 * para um número de ponto flutuante.
 * @param {string|number} value - O valor a ser convertido.
 * @returns {number} O valor convertido para float, ou NaN se a conversão falhar.
 */
const num = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return parseFloat(value.replace(',', '.'));
  }
  return NaN; // Retorna NaN para tipos não suportados ou undefined/null
};

/**
 * Realiza os cálculos de gasto com combustível, lucro bruto e gasto por KM.
 * Esta função é uma extração da lógica de `performCalculation` de `Calculator.jsx`.
 * 
 * @param {string|number} km - A quilometragem rodada.
 * @param {string|number} faturamento - O faturamento obtido.
 * @param {string|number} precoCombustivel - O preço do combustível por litro.
 * @param {string|number} consumo - O consumo do veículo em KM/L.
 * @returns {object|null} Um objeto com { gastoCombustivel, lucroBruto, gastoPorKm }
 *                          ou null se os inputs forem inválidos.
 */
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

  // As fórmulas centrais extraídas
  const gastoCombustivel = (numKm / numCons) * numPreco;
  const lucroBruto = numFat - gastoCombustivel;
  const gastoPorKm = numKm > 0 ? gastoCombustivel / numKm : 0; // Evita divisão por zero

  return {
    gastoCombustivel,
    lucroBruto,
    gastoPorKm
  };
};

// Exemplo de como o arquivo poderia ser exportado para uso em outros módulos:
// CommonJS (Node.js)
// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = { calcularIndicadoresFinanceiros, num };
// }
// ES6 Modules (Navegador e Node.js moderno)
// export { calcularIndicadoresFinanceiros, num };
// export default calcularIndicadoresFinanceiros; // Se apenas uma função principal for exportada
