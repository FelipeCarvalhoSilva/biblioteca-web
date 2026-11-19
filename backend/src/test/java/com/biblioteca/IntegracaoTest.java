package com.biblioteca;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class IntegracaoTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void deveVincularLivroAAutor() throws Exception {
        MvcResult resultado = mockMvc.perform(post("/api/autores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"Machado de Assis\",\"nacionalidade\":\"Brasileira\"}"))
                .andExpect(status().isCreated())
                .andReturn();

        Number autorId = JsonPath.read(resultado.getResponse().getContentAsString(), "$.id");
        String jsonLivro = "{\"titulo\":\"Dom Casmurro\",\"anoPublicacao\":1899,\"autor\":{\"id\":"
                + autorId.longValue() + "}}";

        mockMvc.perform(post("/api/livros")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonLivro))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.autor.id").value(autorId.intValue()));

        mockMvc.perform(get("/api/livros/autor/" + autorId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value("Dom Casmurro"));
    }
}
