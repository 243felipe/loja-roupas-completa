package com.lojaroupas.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lojaroupas.api.dao.ClienteDao;
import com.lojaroupas.api.dto.ClienteDto;
import com.lojaroupas.api.dto.LoginRequestDto;
import com.lojaroupas.api.models.Cliente;
import com.lojaroupas.api.repositories.ClienteRepository;
import jakarta.persistence.Tuple;

@Service
public class ClienteService {

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private ClienteRepository clienteRepository;

    // Métodos que usam o DAO com queries nativas
    public List<ClienteDto> getAllClientes() {
        List<Tuple> tuples = clienteDao.getAllClientes();
        return converterTuplesParaDto(tuples);
    }

    public Optional<ClienteDto> getClientePorId(Long id) {
        List<Tuple> tuples = clienteDao.getClientePorId(id);
        if (!tuples.isEmpty()) {
            return Optional.of(converterTupleParaDto(tuples.get(0)));
        }
        return Optional.empty();
    }

    public Optional<ClienteDto> getClientePorEmail(String email) {
        List<Tuple> tuples = clienteDao.getClientePorEmail(email);
        if (!tuples.isEmpty()) {
            return Optional.of(converterTupleParaDto(tuples.get(0)));
        }
        return Optional.empty();
    }

    public Optional<ClienteDto> login(LoginRequestDto loginRequest) {
        List<Tuple> tuples =
                clienteDao.getClienteLogin(loginRequest.getEmail(), loginRequest.getSenha());
        if (!tuples.isEmpty()) {
            return Optional.of(converterTupleParaDto(tuples.get(0)));
        }
        return Optional.empty();
    }

    public boolean emailExists(String email) {
        return clienteDao.emailExists(email);
    }

    // Métodos que usam o Repository para operações CRUD
    public ClienteDto criarCliente(ClienteDto clienteDto) {
        Cliente cliente = converterDtoParaModel(clienteDto);
        Cliente clienteSalvo = clienteRepository.save(cliente);
        return converterModelParaDto(clienteSalvo);
    }

    public Optional<ClienteDto> atualizarCliente(Long id, ClienteDto clienteDto) {
        if (!clienteRepository.existsById(id)) {
            return Optional.empty();
        }
        Cliente cliente = converterDtoParaModel(clienteDto);
        cliente.setId(id);
        Cliente clienteAtualizado = clienteRepository.save(cliente);
        return Optional.of(converterModelParaDto(clienteAtualizado));
    }

    public boolean deletarCliente(Long id) {
        if (!clienteRepository.existsById(id)) {
            return false;
        }
        clienteRepository.deleteById(id);
        return true;
    }

    // Métodos auxiliares para conversão
    private List<ClienteDto> converterTuplesParaDto(List<Tuple> tuples) {
        List<ClienteDto> clientes = new ArrayList<>();
        for (Tuple tuple : tuples) {
            clientes.add(converterTupleParaDto(tuple));
        }
        return clientes;
    }

    private ClienteDto converterTupleParaDto(Tuple tuple) {
        ClienteDto dto = new ClienteDto();
        dto.setId(((Number) tuple.get("id")).longValue());
        dto.setNome((String) tuple.get("nome"));
        dto.setEmail((String) tuple.get("email"));
        dto.setTelefone((String) tuple.get("telefone"));
        dto.setEndereco((String) tuple.get("endereco"));
        dto.setCidade((String) tuple.get("cidade"));
        dto.setEstado((String) tuple.get("estado"));
        dto.setCep((String) tuple.get("cep"));
        return dto;
    }

    private Cliente converterDtoParaModel(ClienteDto dto) {
        Cliente cliente = new Cliente();
        cliente.setId(dto.getId());
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setSenha(dto.getSenha());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEndereco(dto.getEndereco());
        cliente.setCidade(dto.getCidade());
        cliente.setEstado(dto.getEstado());
        cliente.setCep(dto.getCep());
        return cliente;
    }

    private ClienteDto converterModelParaDto(Cliente cliente) {
        ClienteDto dto = new ClienteDto();
        dto.setId(cliente.getId());
        dto.setNome(cliente.getNome());
        dto.setEmail(cliente.getEmail());
        dto.setSenha(cliente.getSenha());
        dto.setTelefone(cliente.getTelefone());
        dto.setEndereco(cliente.getEndereco());
        dto.setCidade(cliente.getCidade());
        dto.setEstado(cliente.getEstado());
        dto.setCep(cliente.getCep());
        return dto;
    }
}
