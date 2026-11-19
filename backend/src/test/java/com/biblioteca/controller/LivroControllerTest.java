package com.biblioteca.controller;

import com.biblioteca.model.Autor;
import com.biblioteca.model.Livro;
import com.biblioteca.repository.AutorRepository;
import com.biblioteca.repository.LivroRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LivroController.class)
class LivroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LivroRepository livroRepository;

    @MockBean
    private AutorRepository autorRepository;

    @Test
    void deveCriarLivro() throws Exception {
        Autor autor = new Autor();
        autor.setId(1L);
        autor.setNome("Machado de Assis");
        Livro livro = new Livro();
        livro.setId(2L);
        livro.setTitulo("Dom Casmurro");
        livro.setAutor(autor);

        when(autorRepository.findById(1L)).thenReturn(Optional.of(autor));
        when(livroRepository.save(any(Livro.class))).thenReturn(livro);

        mockMvc.perform(post("/api/livros")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titulo\":\"Dom Casmurro\",\"autor\":{\"id\":1}}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Dom Casmurro"))
                .andExpect(jsonPath("$.autor.nome").value("Machado de Assis"));
    }

    @Test
    void deveRetornar404ParaLivroInexistente() throws Exception {
        when(livroRepository.findById(99L)).thenReturn(Optional.empty());
        mockMvc.perform(get("/api/livros/99"))
                .andExpect(status().isNotFound());
    }
}
