# ORM PostgreSQL com LINQ-like Queries
Este pacote é um ORM (Object-Relational Mapping) para PostgreSQL escrito em TypeScript. Ele foi projetado para ser semelhante ao Entity Framework da Microsoft, oferecendo uma API intuitiva e proteção contra SQL Injection. Além disso, ele inclui suporte a consultas LINQ-like para manipulação de dados em memória.

## Recursos Principais
1. Sem SQL Exposto: Consultas são construídas dinamicamente sem expor código SQL diretamente.
2. Proteção contra SQL Injection: Parâmetros preparados garantem segurança nas consultas.
3. Suporte a JOINs Dinâmicos: Inclua dados relacionados com facilidade usando o método include.
4. LINQ-like Queries: Manipule dados em memória com métodos como where, orderBy, select e join.
5. Tipagem Forte: Totalmente implementado em TypeScript para garantir segurança de tipos.


## Instalação
Para instalar o pacote, execute o seguinte comando:

### bash
	npm install orm-postgresql

## Configuração
Antes de usar o pacote, configure as variáveis de ambiente para conexão com o banco de dados PostgreSQL. Crie um arquivo .env no diretório raiz do seu projeto com as seguintes variáveis:

### env
	DB_HOST=localhost
	DB_PORT=5432
	DB_USER=your_username
	DB_PASSWORD=your_password
	DB_NAME=your_database

## Uso Básico
1. Definindo Modelos
	Cada tabela no banco de dados deve ser representada por uma classe que estende a classe base Model. Por exemplo:

### typescript
	import { Model } from 'orm-postgresql';

	class User extends Model {
	static tableName = 'users';
	}

	class Post extends Model {
	static tableName = 'posts';
	}

2. Conexão com o Banco de Dados
Conecte-se ao banco de dados antes de executar qualquer operação:

### typescript
	import { Connection } from 'orm-postgresql';

	(async () => {
	const connection = Connection.getInstance();
	await connection.connect();
	// Sua lógica aqui

	await connection.close();
	})();

## Operações CRUD
### Criar um Registro
#### typescript
	const newUser = await User.create({
		name: 'Alice',
		email: 'alice@example.com',
	});
	console.log(newUser);

### Buscar Registros
Buscar Todos os Registros
#### typescript
	const users = await User.findAll();
	console.log(users);


### Buscar por ID
#### typescript
	const user = await User.find(1);
	console.log(user);

### Consultas Avançadas
#### Incluir Dados Relacionados (include)
Use o método include para carregar dados relacionados. Por exemplo, para buscar usuários e seus posts relacionados:

##### typescript
import { QueryBuilder } from 'orm-postgresql';

	const queryBuilder = new QueryBuilder()
	.select(['users.id', 'users.name'])
	.from('users')
	.include({
		table: 'posts',
		alias: 'p',
		foreignKey: 'userId',
		localKey: 'id',
	});
	const { query, params } = queryBuilder.build();
	const usersWithPosts = await User.connection.query(query, params);

	console.log(usersWithPosts);

### Manipulação de Dados em Memória (LINQ-like Queries)
O pacote inclui uma classe Linq para manipular dados em memória de forma semelhante ao LINQ da Microsoft.

#### Filtrar Dados (where)
##### typescript
	import { Linq } from 'orm-postgresql';

	const users = [
		{ id: 1, name: 'Alice', age: 25 },
		{ id: 2, name: 'Bob', age: 30 },
	];

	const filteredUsers = new Linq(users)
		.where(user => user.age > 20)
		.toArray();

	console.log(filteredUsers);


#### Ordenar Dados (orderBy)
##### typescript 
	const sortedUsers = new Linq(users)
		.orderBy(user => user.name)
		.toArray();
	console.log(sortedUsers);

#### Selecionar Propriedades Específicas (select)
##### typescript
	const names = new Linq(users)
		.select(user => user.name)
		.toArray();

	console.log(names);

#### Combinar Dados de Dois Arrays (join)
##### typescript
	const posts = [
   	  { userId: 1, title: 'Post 1' },
   	  { userId: 1, title: 'Post 2' },
   	  { userId: 2, title: 'Post 3' },
 	];

 	const userPosts = new Linq(users).join(
	  posts,
	  user => user.id, // Chave do array externo
	  post => post.userId, // Chave do array interno
	  (user, post) => ({
	    userName: user.name,
	    postTitle: post.title,
	  }) // Função para criar o objeto de saída
	);

	console.log(userPosts);

# Contribuição
Contribuições são bem-vindas! Se você deseja melhorar este pacote, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (git checkout -b feature/nome-da-feature).
3. Commit suas alterações (git commit -m 'Adiciona nova feature').
4. Envie sua branch (git push origin feature/nome-da-feature).
5. Abra um Pull Request.

# Licença
Este projeto está licenciado sob a MIT License .

# Contato
Se tiver dúvidas ou sugestões, entre em contato:

Email: dcutiyama@gmail.com
GitHub: https://github.com/utiyamo
