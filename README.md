# ORM PostgreSQL com LINQ-like Queries
Este pacote é um ORM (Object-Relational Mapping) para PostgreSQL escrito em TypeScript. Ele foi projetado para ser semelhante ao Entity Framework da Microsoft, oferecendo uma API intuitiva e proteção contra SQL Injection. Além disso, ele inclui suporte a consultas LINQ-like para manipulação de dados em memória.

## Recursos Principais
	Sem SQL Exposto: Consultas são construídas dinamicamente sem expor código SQL diretamente.
	Proteção contra SQL Injection: Parâmetros preparados garantem segurança nas consultas.
	Suporte a JOINs Dinâmicos: Inclua dados relacionados com facilidade usando o método include.
	LINQ-like Queries: Manipule dados em memória com métodos como where, orderBy, select e join.
	Tipagem Forte: Totalmente implementado em TypeScript para garantir segurança de tipos.


## Instalação
Para instalar o pacote, execute o seguinte comando:

bash
1 npm install orm-postgresql

## Configuração
Antes de usar o pacote, configure as variáveis de ambiente para conexão com o banco de dados PostgreSQL. Crie um arquivo .env no diretório raiz do seu projeto com as seguintes variáveis:

env
1 DB_HOST=localhost
2 DB_PORT=5432
3 DB_USER=your_username
4 DB_PASSWORD=your_password
5 DB_NAME=your_database

## Uso Básico
1. Definindo Modelos
	Cada tabela no banco de dados deve ser representada por uma classe que estende a classe base Model. Por exemplo:

typescript
1 import { Model } from 'orm-postgresql';
2
3 class User extends Model {
4   static tableName = 'users';
5 }
6
7 class Post extends Model {
8   static tableName = 'posts';
9 }

2. Conexão com o Banco de Dados
Conecte-se ao banco de dados antes de executar qualquer operação:

typescript
1 import { Connection } from 'orm-postgresql';
2
3 (async () => {
4   const connection = Connection.getInstance();
5   await connection.connect();
6
7   // Sua lógica aqui
8
9   await connection.close();
10 })();

## Operações CRUD
### Criar um Registro
typescript
1 const newUser = await User.create({
2 	name: 'Alice',
3	email: 'alice@example.com',
4 });
5 console.log(newUser);

### Buscar Registros
Buscar Todos os Registros
typescript
1 const users = await User.findAll();
2 console.log(users);


### Buscar por ID
typescript
1 const user = await User.find(1);
2 console.log(user);

### Consultas Avançadas
#### Incluir Dados Relacionados (include)
Use o método include para carregar dados relacionados. Por exemplo, para buscar usuários e seus posts relacionados:

typescript
1 import { QueryBuilder } from 'orm-postgresql';
2
3 const queryBuilder = new QueryBuilder()
4   .select(['users.id', 'users.name'])
5   .from('users')
6   .include({
7     table: 'posts',
8     alias: 'p',
9     foreignKey: 'userId',
10    localKey: 'id',
11  });
12 const { query, params } = queryBuilder.build();
13 const usersWithPosts = await User.connection.query(query, params);
14
15 console.log(usersWithPosts);

### Manipulação de Dados em Memória (LINQ-like Queries)
O pacote inclui uma classe Linq para manipular dados em memória de forma semelhante ao LINQ da Microsoft.

#### Filtrar Dados (where)
typescript
1 import { Linq } from 'orm-postgresql';
2
3 const users = [
4   { id: 1, name: 'Alice', age: 25 },
5   { id: 2, name: 'Bob', age: 30 },
6 ];
7
8 const filteredUsers = new Linq(users)
9   .where(user => user.age > 20)
10   .toArray();
11
12 console.log(filteredUsers);


#### Ordenar Dados (orderBy)
typescript 
1 const sortedUsers = new Linq(users)
2   .orderBy(user => user.name)
3   .toArray();
4
5 console.log(sortedUsers);

#### Selecionar Propriedades Específicas (select)
typescript
1 const names = new Linq(users)
2   .select(user => user.name)
3   .toArray();
4
5 console.log(names);

#### Combinar Dados de Dois Arrays (join)
typescript
1 	const posts = [
2   	  { userId: 1, title: 'Post 1' },
3   	  { userId: 1, title: 'Post 2' },
4   	  { userId: 2, title: 'Post 3' },
5 	];
6
7 	const userPosts = new Linq(users).join(
8	  posts,
9	  user => user.id, // Chave do array externo
10	  post => post.userId, // Chave do array interno
11	  (user, post) => ({
12	    userName: user.name,
13	    postTitle: post.title,
14	  }) // Função para criar o objeto de saída
15	);
16
17	console.log(userPosts);

# Contribuição
Contribuições são bem-vindas! Se você deseja melhorar este pacote, siga estas etapas:

Faça um fork do repositório.
Crie uma branch para sua feature (git checkout -b feature/nome-da-feature).
Commit suas alterações (git commit -m 'Adiciona nova feature').
Envie sua branch (git push origin feature/nome-da-feature).
Abra um Pull Request.

# Licença
Este projeto está licenciado sob a MIT License .

# Contato
Se tiver dúvidas ou sugestões, entre em contato:

Email: dcutiyama@gmail.com
GitHub: https://github.com/utiyamo
