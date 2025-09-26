// Produção mensal (kWh) = (Potência da placa (W) × Irradiação diária (kWh/m²/dia) × Dias no mês × Eficiência do sistema) / 1000
// KWH = (W * KWH/M2/DIA * DIASMES * EFISIS) / 1000

let resposta = document.getElementById('resposta')

function principal(){
    let ppw = Number(document.getElementById('ppw').value)
    let m2dia = Number(document.getElementById('m2dia').value)
    let diasmes = Number(document.getElementById('diasmes').value)
    let efisis = Number(document.getElementById('efisis').value) / 100

    let kwh = (ppw * m2dia * diasmes * efisis) / 1000

    console.log(`A geração mensal de energia por mês é: ${kwh.toFixed(2)}`)

    resposta.innerHTML = ``
    resposta.innerHTML = `A geração mensal de energia é: ${kwh.toFixed(2)} KWH`
}