// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Importa o hook de usar um contexto
import { useContext } from "react";

// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

// Cria o hook para fazer login, enviandos os dados de usuario e senha pra api
// e verificando se o usuario existe na lista de usuarios
export function useVerificaLogin() {
  // importa a funcao de login do contexto
  const { login } = useContext(AuthContext);

  // state para armazenar a lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // use effect pra puxar os dados da api, assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/usuarios`);
        const users = await req.json();
        setUsuarios(users);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // funcao pra verificar se o usuário existe na lista que puxou da api
  const verificaLogin = (data) => {
    // Verifica se há um usuário com aquele email passado em data na lista que puxou da api
    const userToFind = usuarios.find((user) => {
      return user.email === data.email;
    });

    // Se o usuário existe, verifica se a senha está correta
    if (userToFind != undefined && userToFind.senha == data.senha) {
      login(userToFind);
      console.log("Usuário logado:", userToFind.nome);
      return "Login efetuado com sucesso";
    } 
    // Caso não exista ou a senha esteja errada, retorna uma mensagem de erro
    else {
      return "Usuário ou senha inválidos";
    }
  };
  // Retorna a função de verificar login 
  return { verificaLogin };
}

// Cria o hook para listar os produtos, puxando os dados da api
export function useListaProdutos() {
  //Lista com produtos
  const [produtos, setProdutos] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/produtos`);
        const produtos = await req.json();
        setProdutos(produtos);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de produtos 
  return produtos;
}

// Cria o hook para excluir um produto
export function useDeletaProduto() {
  // Recebe o id do produto a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarProduto = async (idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log("Produto deletado:", res);
     // Retorna o produto deletado
    return res;
  };
  return { deletarProduto };
}

// Cria o hook para inserir um produto
export function useInserirProduto() {
  // Recebe os dados do produto e faz a requisição para a API
  // com o método POST
  const inserirProduto = async (data) => {
    const req = await fetch(`${url}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Produto inserido:", res);
      // Retorna o produto inserido
    return res;
  };

  return { inserirProduto };
}

// Cria o hook para bucar um produto por id
export function useBuscarProdutoPorId() {
  // Receb o id do produto e faz a requisição para a api
  // com o método GET
  const buscarProdutoPorId = async (idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`);
    const res = await req.json();
    console.log("Produto encontrado:", res);
    return res;
  };
  return { buscarProdutoPorId };
}

// Cria o hook para atualizar um produto 
export function useAtualizaProduto() {
  // Envia os dados do produtos recebido via data, para o produto específico que recebeu via id produto,
  // e faz a requisição para a ai, com o método PUT
  const atualizaProduto = async (data, idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Produto atualizado:", res);
    // Retorna o produto atualizado
    return res;
  };
  return { atualizaProduto };
}



export function useVerificaEmail() {
  const { usuarios } = useListaUsuarios();
  const verificaEmail = (data) => {
    // Verifica se há aquele usuário digitados na lista
    const userToFind = usuarios.find((user) => {
      return user.email === data.email;
    });
    if (userToFind != undefined) {
      return "E-mail já cadastrado";
    } else {
      return "E-mail disponível";
    }
  };
  return { verificaEmail };
}

export function useListaCategorias() {
  //Lista com categorias
  const [categorias, setCategorias] = useState([]);
  //UseEffect pra puxar os dados da api
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(`${url}/categorias`);
        const cate = await req.json();
        console.log(cate);
        setCategorias(cate);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);
  return categorias;
}
