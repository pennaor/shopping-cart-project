# Shopping Cart Project

## Demo

<details>
</details>

## Welcome!!

<details>
<summary><strong>The Project</strong></summary>

- Simula uma página de compras que possui ações básicas.

- Projeto de aprendizado desenvolvido ao longo do curso de desenvolvimento Web da [Trybe](https://www.betrybe.com/).

- Desenvolvido sob o modelo **TDD** (Test Driven Development).

</details>

<details>

<summary><strong>Ferramentas utilizadas</strong></summary>

- JavaScript
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- HTML
- CSS
- [MaterializeCSS](https://materializecss.com)

</details>

<details>

<summary><strong>Features</strong></summary>

- Cria lista de produtos buscados na API do Mercado Livre

- Adiciona ou remove itens em um carrinho de compras

- Limpa o carrinho de compras

- Cálculo preciso do valor total dos itens quando o carrinho é atualizado

- Carrega o carrinho de compras ao iniciar a página

- Mostra texto de `carregando` durante uma requisição à API

- Página estilizada com código própio, MaterializeCSS e Google Fonts

</details>

<details>

<summary><strong>Estrutura</strong></summary>

`index.html`: página de compras,</br>
`style.css`: estilização da página,</br>
`script.js`: implementa funcionalidades da página,</br>
`tests/`: testes unitários feito em `jest`,</br>
`Decimal.js`: biblioteca usada para corrigir imprecisão dos cálculos

</details>

<details>
<summary><strong>API utilizada</strong></summary>

- [Mercado Livre](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas)

⚠️ **Atenção:** a simulação da API para o consumo no ambiente de testes foi implementada pela Trybe. Nesse contexto, além dos testes, eu implementei `fetchProducts`, `fetchItem`.

</details>

<details>
<summary><strong>Trybe</strong></summary>

  - A simulação da API para o consumo no ambiente de testes foi implementada pela [Trybe](https://www.betrybe.com/).
	
  - As seguintes funções são de autoria da [Trybe](https://www.betrybe.com/):
  	- `createProductImageElement`
  	- `createCustomElement`
  	- `createProductItemElement`
  	- `getSkuFromProductItem`
  	- `cartItemClickListener`
  	- `createCartItemElement`

</details>