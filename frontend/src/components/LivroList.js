import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../services/api';

export default function LivroList() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    try {
      setErro('');
      setLivros(await livroService.listar());
    } catch {
      setErro('Não foi possível carregar os livros.');
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  async function excluir(id) {
    if (!window.confirm('Deseja excluir este livro?')) return;
    try {
      await livroService.deletar(id);
      carregar();
    } catch {
      setErro('Não foi possível excluir o livro.');
    }
  }

  return (
    <section className="painel">
      <div className="titulo-pagina">
        <h2>Livros</h2>
        <Link className="botao" to="/livros/novo">Novo livro</Link>
      </div>
      {erro && <p className="erro">{erro}</p>}
      <div className="tabela-rolagem">
        <table>
          <thead><tr><th>Título</th><th>Autor</th><th>ISBN</th><th>Ano</th><th>Gênero</th><th>Ações</th></tr></thead>
          <tbody>
            {livros.map(livro => (
              <tr key={livro.id}>
                <td>{livro.titulo}</td>
                <td>{livro.autor?.nome || '-'}</td>
                <td>{livro.isbn || '-'}</td>
                <td>{livro.anoPublicacao || '-'}</td>
                <td>{livro.genero || '-'}</td>
                <td className="acoes">
                  <Link className="botao secundario" to={`/livros/editar/${livro.id}`}>Editar</Link>
                  <button className="botao perigo" onClick={() => excluir(livro.id)}>Excluir</button>
                </td>
              </tr>
            ))}
            {livros.length === 0 && <tr><td colSpan="6">Nenhum livro cadastrado.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
