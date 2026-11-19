import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { autorService, livroService } from '../services/api';

export default function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [form, setForm] = useState({
    titulo: '', isbn: '', anoPublicacao: '', genero: '', autorId: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    autorService.listar().then(setAutores)
      .catch(() => setErro('Não foi possível carregar os autores.'));
    if (!id) return;
    livroService.buscar(id)
      .then(livro => setForm({
        titulo: livro.titulo || '',
        isbn: livro.isbn || '',
        anoPublicacao: livro.anoPublicacao ?? '',
        genero: livro.genero || '',
        autorId: String(livro.autor?.id || '')
      }))
      .catch(() => setErro('Não foi possível carregar o livro.'));
  }, [id]);

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    const dados = {
      titulo: form.titulo,
      isbn: form.isbn,
      anoPublicacao: form.anoPublicacao === '' ? null : Number(form.anoPublicacao),
      genero: form.genero,
      autor: { id: Number(form.autorId) }
    };
    try {
      if (id) await livroService.atualizar(id, dados);
      else await livroService.criar(dados);
      navigate('/livros');
    } catch {
      setErro('Não foi possível salvar o livro. Verifique os campos e o autor.');
    }
  }

  return (
    <section className="painel formulario-painel">
      <h2>{id ? 'Editar livro' : 'Novo livro'}</h2>
      {erro && <p className="erro">{erro}</p>}
      {autores.length === 0 && <p>Cadastre um autor antes de adicionar livros. <Link to="/autores/novo">Cadastrar autor</Link></p>}
      <form onSubmit={salvar}>
        <label>Título *
          <input name="titulo" value={form.titulo} onChange={alterar} maxLength={200} required />
        </label>
        <label>Autor *
          <select name="autorId" value={form.autorId} onChange={alterar} required>
            <option value="">Selecione um autor</option>
            {autores.map(autor => <option key={autor.id} value={autor.id}>{autor.nome}</option>)}
          </select>
        </label>
        <label>ISBN
          <input name="isbn" value={form.isbn} onChange={alterar} maxLength={20} />
        </label>
        <label>Ano de publicação
          <input type="number" name="anoPublicacao" value={form.anoPublicacao} onChange={alterar} />
        </label>
        <label>Gênero
          <input name="genero" value={form.genero} onChange={alterar} maxLength={50} />
        </label>
        <div className="botoes">
          <button className="botao" type="submit" disabled={autores.length === 0}>Salvar</button>
          <Link className="botao secundario" to="/livros">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
