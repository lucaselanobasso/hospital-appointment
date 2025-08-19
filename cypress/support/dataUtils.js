// Função para gerar data futura no formato ISO (YYYY-MM-DD)
const dataFutura = (dias) => {
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return data.toISOString().split('T')[0];
};

// Função para gerar data com horas específicas no formato ISO
const dataComHoras = (horas) => {
    const data = new Date();
    data.setHours(data.getHours() + horas);
    return data.toISOString().split('T')[0];
};

// Função para obter data atual no formato ISO
const dataAtual = () => {
    const data = new Date();
    return data.toISOString().split('T')[0];
};

// Função para gerar data de ontem (para testes de validação)
const dataOntem = () => {
    const data = new Date();
    data.setDate(data.getDate() - 1);
    return data.toISOString().split('T')[0];
};

module.exports = {
    dataFutura,
    dataComHoras,
    dataAtual,
    dataOntem
}