package com.lojaroupas.api.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lojaroupas.api.dto.ClienteDto;
import com.lojaroupas.api.dto.LoginRequestDto;
import com.lojaroupas.api.services.ClienteService;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // Listar todos os clientes
    @GetMapping
    public ResponseEntity<List<ClienteDto>> getAllClientes() {
        List<ClienteDto> clientes = clienteService.getAllClientes();
        return ResponseEntity.ok(clientes);
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDto> getClienteById(@PathVariable Long id) {
        Optional<ClienteDto> cliente = clienteService.getClientePorId(id);
        return cliente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar cliente por email
    @GetMapping("/email/{email}")
    public ResponseEntity<ClienteDto> getClienteByEmail(@PathVariable String email) {
        Optional<ClienteDto> cliente = clienteService.getClientePorEmail(email);
        return cliente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Criar novo cliente
    @PostMapping
    public ResponseEntity<ClienteDto> createCliente(@RequestBody ClienteDto clienteDto) {
        ClienteDto clienteSalvo = clienteService.criarCliente(clienteDto);
        return ResponseEntity.ok(clienteSalvo);
    }

    // Atualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<ClienteDto> updateCliente(@PathVariable Long id,
            @RequestBody ClienteDto clienteDto) {
        Optional<ClienteDto> clienteAtualizado = clienteService.atualizarCliente(id, clienteDto);
        return clienteAtualizado.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Deletar cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        boolean deletado = clienteService.deletarCliente(id);
        return deletado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Login de cliente
    @PostMapping("/login")
    public ResponseEntity<ClienteDto> login(@RequestBody LoginRequestDto loginRequest) {
        Optional<ClienteDto> cliente = clienteService.login(loginRequest);
        return cliente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Verificar se email existe
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        boolean exists = clienteService.emailExists(email);
        return ResponseEntity.ok(exists);
    }
}
