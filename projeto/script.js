document.addEventListener("DOMContentLoaded", () => {
    const marcasSelect = document.getElementById("marcas");
    const modelosSelect = document.getElementById("modelos");
    const buscarBtn = document.getElementById("buscar");
    const carImage = document.getElementById("car-image");
    const infoDiv = document.getElementById("info");

    // Carrega marcas
    fetch("/api/marcas")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar marcas");
            }
            return response.json();
        })
        .then(marcas => {
            marcas.forEach(marca => {
                const option = document.createElement("option");
                option.value = marca.codigo;
                option.textContent = marca.nome;
                marcasSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar marcas:", error);
        });

    // Carrega modelos ao selecionar uma marca
    marcasSelect.addEventListener("change", () => {
        const marcaId = marcasSelect.value;
        modelosSelect.innerHTML = "<option>Carregando...</option>";

        fetch(`/api/modelos/${marcaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar modelos");
                }
                return response.json();
            })
            .then(data => {
                modelosSelect.innerHTML = "";
                data.modelos.forEach(modelo => {
                    const option = document.createElement("option");
                    option.value = modelo.codigo;
                    option.textContent = modelo.nome;
                    modelosSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar modelos:", error);
            });
    });

    // Busca informações ao clicar no botão
    buscarBtn.addEventListener("click", () => {
        const marcaId = marcasSelect.value;
        const modeloId = modelosSelect.value;

        if (!marcaId || !modeloId) {
            alert("Selecione a marca e o modelo!");
            return;
        }

        fetch(`/api/detalhes/${marcaId}/${modeloId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar detalhes");
                }
                return response.json();
            })
            .then(data => {
                carImage.src = data.imagem || "";
                infoDiv.innerHTML = `
                    <p><strong>Modelo:</strong> ${data.modelo}</p>
                    <p><strong>Preço Médio:</strong> ${data.valor}</p>
                    <p><strong>Ano:</strong> ${data.anoModelo}</p>
                    <p><strong>Combustível:</strong> ${data.combustivel}</p>
                    <p><strong>Código FIPE:</strong> ${data.codigoFipe}</p>
                `;
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes:", error);
            });
    });
});
