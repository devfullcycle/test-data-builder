# Test Data builder

Código-fonte ministrado na aula do Youtube: 

O tests data builder é design pattern que se basea no design pattern builder, que serve para criação de objetos, mas
com foco direto em criar objetos que vão ajudar trabalhar com os testes automatizados.

O padrão foi proposto no livro Growing Object-Oriented Software, Guided by Tests, do Steve FreeMan.
Inclusive este livro tem um prefácio feito pelo famoso Kent Beck criador do TDD (Test driven development).
Este livro é muito legal se você quer melhorar sua habilitades ao criar testes nas suas aplicações.

A ideia deste padrão é criar uma classe Builder que facilitará a criação do objeto necessário, seja ele

- algo do seu modelo de dados ou do seu domínio
- ou qualquer outro objeto que acaba sendo muito utilizado nos testes e que seja bem complicado ficar recriado-o do zero toda hora.

Ou seja, o objetivo é criar um objeto que vai facilitar a criação de objetos que são muito utilizados nos testes.

É possível implementar o padrão de várias formas, em qualquer framework ou linguagem de programação.

