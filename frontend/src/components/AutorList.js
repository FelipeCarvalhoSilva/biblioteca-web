import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

export default function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    try {
      setErro('');
      setAutores(await autorService.listar());
    } catch {
      setErro('Não foi possível carregar os autores.');
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  async function excluir(id) {
    if (!window.confirm('Deseja excluir este autor?')) return;
    try {
      await autorService.deletar(id);
      carregar();
    } catch (err) {
      setErro(err.response?.data?.erro || 'Não foi possível excluir o autor.');
    }
  }

  return (
    <section className="painel">
      <div className="titulo-pagina">
        <h2>Autores</h2>
        <Link className="botao" to="/autores/novo">Novo autor</Link>
      </div>
      {erro && <p className="erro">{erro}</p>}
      <div className="tabela-rolagem">
        <table>
          <thead><tr><th>Nome</th><th>Nacionalidade</th><th>Data de nascimento</th><th>Ações</th></tr></thead>
          <tbody>
            {autores.map(autor => (
              <tr key={autor.id}>
                <td>{autor.nome}</td>
                <td>{autor.nacionalidade || '-'}</td>
                <td>{autor.dataNascimento ? autor.dataNascimento.split('-').reverse().join('/') : '-'}</td>
                <td className="acoes">
                  <Link className="botao secundario" to={`/autores/editar/${autor.id}`}>Editar</Link>
                  <button className="botao perigo" onClick={() => excluir(autor.id)}>Excluir</button>
                </td>
              </tr>
            ))}
            {autores.length === 0 && <tr><td colSpan="4">Nenhum autor cadastrado.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
