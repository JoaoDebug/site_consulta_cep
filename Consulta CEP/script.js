async function consultarCep() {
  const cep = document.getElementById("cep").value.replace(/\D/g, '')

  if (cep.length !== 8) {
    alert("CEP inválido! Digite 8 números.")
    return
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) {
      document.getElementById("resultado").innerHTML = "<p>CEP não encontrado.</p>"
      return
    }

    const resultado = `
      <p><strong>CEP:</strong> ${data.cep}</p>
      <p><strong>Logradouro:</strong> ${data.logradouro || "N/A"}</p>
      <p><strong>Complemento:</strong> ${data.complemento || "N/A"}</p>
      <p><strong>Bairro:</strong> ${data.bairro || "N/A"}</p>
      <p><strong>Cidade:</strong> ${data.localidade || "N/A"}</p>
      <p><strong>Estado:</strong> ${data.uf || "N/A"}</p>
      <p><strong>IBGE:</strong> ${data.ibge || "N/A"}</p>
      <p><strong>DDD:</strong> ${data.ddd || "N/A"}</p>
      <p><strong>SIAFI:</strong> ${data.siafi || "N/A"}</p>
    `;

    document.getElementById("resultado").innerHTML = resultado
  } catch (error) {
    document.getElementById("resultado").innerHTML = "<p>Erro ao consultar o CEP.</p>"
  }
}
