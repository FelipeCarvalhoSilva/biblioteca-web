import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { autorService } from '../services/api';

export default function AutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', nacionalidade: '', dataNascimento: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!id) return;
    autorService.buscar(id)
      .then(autor => setForm({
        nome: autor.nome || '',
        nacionalidade: autor.nacionalidade || '',
        dataNascimento: autor.dataNascimento || ''
      }))
      .catch(() => setErro('Não foi possível carregar o autor.'));
  }, [id]);

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();
    setErro('');
    try {
      const dados = { ...form, dataNascimento: form.dataNascimento || null };
      if (id) await autorService.atualizar(id, dados);
      else await autorService.criar(dados);
      navigate('/autores');
    } catch {
      setErro('Não foi possível salvar o autor. Verifique os campos.');
    }
  }

  return (
    <section className="painel formulario-painel">
      <h2>{id ? 'Editar autor' : 'Novo autor'}</h2>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={salvar}>
        <label>Nome *
          <input name="nome" value={form.nome} onChange={alterar} maxLength={100} required />
        </label>
        <label>Nacionalidade
          <input name="nacionalidade" value={form.nacionalidade} onChange={alterar} maxLength={50} />
        </label>
        <label>Data de nascimento
          <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={alterar} />
        </label>
        <div className="botoes">
          <button className="botao" type="submit">Salvar</button>
          <Link className="botao secundario" to="/autores">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
