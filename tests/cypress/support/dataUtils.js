const dataFutura = (dias) => {
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return data.toISOString().split('T')[0];
};

const dataComHoras = (horas) => {
    const data = new Date();
    data.setHours(data.getHours() + horas);
    return data.toISOString().split('T')[0];
};

const dataAtual = () => {
    const data = new Date();
    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const yyyy = data.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

const dataOntem = () => {
    const data = new Date();
    data.setDate(data.getDate() - 1);
    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const yyyy = data.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

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

const dataDDMMYYYY = (dias = 0) => {
    const data = new Date();
    data.setDate(data.getDate() + Number(dias));
    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const yyyy = data.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

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