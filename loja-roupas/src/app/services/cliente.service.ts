import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    dataCadastro?: Date;
}

export interface LoginRequest {
    email: string;
    senha: string;
}

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:8080/api/clientes';

    constructor(private http: HttpClient) { }

    // Buscar todos os clientes
    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    // Buscar cliente por ID
    getCliente(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
    }

    // Buscar cliente por email
    getClienteByEmail(email: string): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl}/email/${email}`);
    }

    // Criar cliente
    criarCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }

    // Atualizar cliente
    atualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
    }

    // Deletar cliente
    deletarCliente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Login de cliente
    login(loginRequest: LoginRequest): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.apiUrl}/login`, loginRequest);
    }

    // Verificar se email existe
    verificarEmail(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/check-email/${email}`);
    }
} 