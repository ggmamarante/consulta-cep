
// Elementos

var submitButton = document.querySelector('#conteudo button');
var zipCodeField = document.querySelector('#conteudo input');
var result = document.querySelector('#conteudo .box-info');

// Ação

submitButton.addEventListener('click', run);

function run(event) {
	event.preventDefault();

	var zipCode = zipCodeField.value; // Capturando o valor

	// Formatando o dados
	zipCode = zipCode.replace(' ', '');
	zipCode = zipCode.replace('.', '');
	zipCode = zipCode.replace('-', '');
	zipCode = zipCode.trim();

	// Recebendo do JSON
	axios
	.get('https://viacep.com.br/ws/' + zipCode + '/json')
	.then(function(response) {
		if (response.data.erro) {
			throw new Error('O CEP é inválido!')
		}
		result.innerHTML = '';
		createInfo(response.data.logradouro);
		createInfo(response.data.bairro + ' - ' + response.data.localidade + ' / ' + response.data.uf);
		createInfo('DDD: ' + response.data.ddd);
	})
	.catch(function(error){
		result.innerHTML = '';
		createInfo('Ops, algo deu errado!');
		console.log(error);
	})

	// Formatando os dados
	function createInfo(text) {
		var tagText = document.createElement('p');
		var infoText = document.createTextNode(text);
		tagText.appendChild(infoText);
		result.appendChild(tagText);
	}
}