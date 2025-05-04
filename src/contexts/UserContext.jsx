// Importando o hook de criar contexto
import { createContext, useState, useEffect } from "react";

// Cria o contexto 
export const AuthContext = createContext();

// Cria o provider do contexto
// O provider é o que vai fornecer os dados para os componentes filhos
export const AuthProvider = ({ children }) => {
  // State para armazenar o nome do usuário
  const [usuarioNome, setUsuarioNome] = useState("");

  // Guarda o nome de usuário no State quando o componente é inicializado, buscando no Local Storage
  useEffect(() => {
    const nome = localStorage.getItem("userName") || "Visitante";
    setUsuarioNome(nome);
  }, []);

  // Função para fazer login do usuário, recebendo os dados de login e senha
  // e armazendo o nome e email no localStorage
  const login = (data) => {
    console.log("Dados:", data);
    localStorage.setItem("userName", data.nome);
    localStorage.setItem("email", data.email);
    setUsuarioNome(data.nome);
  };

  // Função para fazer lougout do usuário, removendo nome e email do localstorage
  // e setando o nome de usuário como "Visitante"
  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setUsuarioNome("Visitante");
  };

  // Retorna o provider com os dados do usuário e as funcoes de login e logout
  return (
    <AuthContext.Provider value={{ usuarioNome, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
