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

// Função para obter data por extenso no formato DD/MM/AAAA as HH:MM, somando dias e horas
const dataPorExtenso = (dias = 0, horas = 0) => {
    const data = new Date();
    data.setDate(data.getDate() + Number(dias));
    data.setHours(data.getHours() + Number(horas));

    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const yyyy = data.getFullYear();
    const hh = String(data.getHours()).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} as ${hh}:${min}`;
};

// Novo: apenas data no formato DD/MM/AAAA, somando dias
const dataDDMMYYYY = (dias = 0) => {
    const data = new Date();
    data.setDate(data.getDate() + Number(dias));
    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const yyyy = data.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

// Novo: apenas hora no formato HH:MM, somando horas
const horaHHMM = (horas = 0) => {
    const data = new Date();
    data.setHours(data.getHours() + Number(horas));
    const hh = String(data.getHours()).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');
    return `${hh}:${min}`;
};

module.exports = {
    dataFutura,
    dataComHoras,
    dataAtual,
    dataOntem,
    dataPorExtenso,
    dataDDMMYYYY,
    horaHHMM
}