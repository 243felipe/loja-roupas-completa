package com.lojaroupas.api.services;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import com.lojaroupas.api.models.Produto;
import com.lojaroupas.api.repositories.ProdutoRepository;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public void run(String... args) throws Exception {
        if (produtoRepository.count() == 0) {
            popularProdutos();
        }
    }

    private void popularProdutos() {
        List<Produto> produtos = Arrays.asList(criarProduto("Cotton T Shirt +5",
                "Basic Slim Fit T-Shirt com tecido 100% algodão, confortável e durável. Perfeita para o dia a dia, com corte slim que valoriza a silhueta.",
                new BigDecimal("199.00"), new BigDecimal("249.00"), "Camisetas",
                Arrays.asList("assets/image/1.jpg", "assets/image/2.jpg", "assets/image/3.jpg",
                        "assets/image/4.jpg"),
                Arrays.asList("Branco", "Preto", "Azul", "Vermelho", "Verde"),
                Arrays.asList("XS", "S", "M", "L", "XL", "2X"), true, 20, 127, 4.5),
                criarProduto("V-Neck T-Shirt",
                        "Embroidered Seersucker Shirt com decote V e bordado elegante. Tecido leve e arejado, ideal para climas quentes.",
                        new BigDecimal("199.00"), null, "Camisetas",
                        Arrays.asList("assets/image/2.jpg", "assets/image/3.jpg",
                                "assets/image/4.jpg", "assets/image/5.jpg"),
                        Arrays.asList("Cinza", "Preto"), Arrays.asList("S", "M", "L", "XL"), true,
                        null, 89, 4.3),
                criarProduto("Henley T-Shirt +3",
                        "Blurred Print T-Shirt com gola Henley e estampa desfocada. Design único e moderno para quem busca estilo diferenciado.",
                        new BigDecimal("199.00"), new BigDecimal("229.00"), "Camisetas",
                        Arrays.asList("assets/image/3.jpg", "assets/image/4.jpg",
                                "assets/image/5.jpg", "assets/image/6.jpg"),
                        Arrays.asList("Bege", "Preto", "Azul"), Arrays.asList("M", "L", "XL"), true,
                        13, 156, 4.7),
                criarProduto("Crewneck T-Shirt +2",
                        "Full Sleeve Zipper com gola redonda e zíper decorativo. Perfeita para combinar com jeans ou calças casuais.",
                        new BigDecimal("199.00"), null, "Camisetas",
                        Arrays.asList("assets/image/4.jpg", "assets/image/5.jpg",
                                "assets/image/6.jpg", "assets/image/7.jpg"),
                        Arrays.asList("Bege", "Preto"), Arrays.asList("S", "M", "L", "XL", "2X"),
                        true, null, 203, 4.6),
                criarProduto("Polo Shirt",
                        "Classic Fit Polo com gola polo tradicional. Elegante e versátil, perfeita para ocasiões casuais e semi-formais.",
                        new BigDecimal("249.00"), null, "Camisas Polo",
                        Arrays.asList("assets/image/5.jpg", "assets/image/6.jpg",
                                "assets/image/7.jpg", "assets/image/8.jpg"),
                        Arrays.asList("Azul", "Branco", "Preto"),
                        Arrays.asList("S", "M", "L", "XL"), false, null, 78, 4.4),
                criarProduto("Jeans Classic",
                        "Slim Fit Jeans com corte moderno e confortável. Denim de alta qualidade com elasticidade para máximo conforto.",
                        new BigDecimal("399.00"), new BigDecimal("499.00"), "Jeans",
                        Arrays.asList("assets/image/6.jpg", "assets/image/7.jpg",
                                "assets/image/8.jpg", "assets/image/9.jpg"),
                        Arrays.asList("Azul", "Preto"), Arrays.asList("30", "32", "34", "36", "38"),
                        false, 20, 234, 4.8),
                criarProduto("Casual Jacket",
                        "Stylish Casual Jacket com design moderno e confortável. Perfeita para transições de estação e looks casuais elegantes.",
                        new BigDecimal("599.00"), null, "Jaquetas",
                        Arrays.asList("assets/image/7.jpg", "assets/image/8.jpg",
                                "assets/image/9.jpg", "assets/image/10.jpg"),
                        Arrays.asList("Preto", "Marrom"), Arrays.asList("S", "M", "L", "XL"), true,
                        null, 67, 4.2),
                criarProduto("Formal Suit",
                        "Elegant Formal Suit com corte italiano e tecido premium. Ideal para ocasiões formais e profissionais.",
                        new BigDecimal("899.00"), null, "Ternos",
                        Arrays.asList("assets/image/8.jpg", "assets/image/9.jpg",
                                "assets/image/10.jpg", "assets/image/11.jpg"),
                        Arrays.asList("Cinza", "Preto", "Azul"), Arrays.asList("S", "M", "L", "XL"),
                        false, null, 45, 4.9),
                criarProduto("Summer Dress",
                        "Light Summer Dress com tecido leve e fluido. Perfeita para dias quentes e ocasiões especiais.",
                        new BigDecimal("349.00"), new BigDecimal("429.00"), "Vestidos",
                        Arrays.asList("assets/image/9.jpg", "assets/image/10.jpg",
                                "assets/image/11.jpg", "assets/image/1.jpg"),
                        Arrays.asList("Branco", "Azul", "Rosa"), Arrays.asList("XS", "S", "M", "L"),
                        true, 19, 112, 4.6),
                criarProduto("Winter Coat",
                        "Warm Winter Coat com forro acolchoado e capuz removível. Proteção total contra o frio com estilo.",
                        new BigDecimal("799.00"), null, "Casacos",
                        Arrays.asList("assets/image/10.jpg", "assets/image/11.jpg",
                                "assets/image/1.jpg", "assets/image/2.jpg"),
                        Arrays.asList("Preto", "Cinza"), Arrays.asList("M", "L", "XL"), false, null,
                        89, 4.7),
                criarProduto("Sport Shorts",
                        "Comfortable Sport Shorts com tecido respirável e elástico. Ideal para atividades físicas e lazer.",
                        new BigDecimal("149.00"), null, "Shorts",
                        Arrays.asList("assets/image/11.jpg", "assets/image/1.jpg",
                                "assets/image/2.jpg", "assets/image/3.jpg"),
                        Arrays.asList("Preto", "Azul", "Cinza"), Arrays.asList("S", "M", "L", "XL"),
                        true, null, 156, 4.4));

        produtoRepository.saveAll(produtos);
        System.out.println("Produtos populados com sucesso!");
    }

    private Produto criarProduto(String nome, String descricao, BigDecimal preco,
            BigDecimal precoOriginal, String categoria, List<String> imagens, List<String> cores,
            List<String> tamanhos, boolean novo, Integer desconto, Integer avaliacoes,
            Double rating) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setPreco(preco);
        produto.setPrecoOriginal(precoOriginal);
        produto.setCategoria(categoria);
        produto.setImagens(imagens);
        produto.setCores(cores);
        produto.setTamanhos(tamanhos);
        produto.setNovo(novo);
        produto.setDesconto(desconto);
        produto.setAvaliacoes(avaliacoes);
        produto.setRating(rating);

        // Simular estoque em JSON
        String estoqueJson =
                "{\"Branco\":{\"XS\":10,\"S\":15,\"M\":20,\"L\":18,\"XL\":12,\"2X\":8},\"Preto\":{\"XS\":8,\"S\":12,\"M\":18,\"L\":15,\"XL\":10,\"2X\":6}}";
        produto.setEstoque(estoqueJson);

        return produto;
    }
}
