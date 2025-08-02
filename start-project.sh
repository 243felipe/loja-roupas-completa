#!/bin/bash

echo "========================================"
echo "   Loja de Roupas - Sistema Completo"
echo "========================================"
echo

echo "Iniciando o backend (Spring Boot)..."
cd loja-roupas-api
gnome-terminal --title="Backend - Spring Boot" -- bash -c "mvn spring-boot:run; exec bash" &
cd ..

echo
echo "Aguardando 10 segundos para o backend inicializar..."
sleep 10

echo
echo "Iniciando o frontend (Angular)..."
cd loja-roupas
gnome-terminal --title="Frontend - Angular" -- bash -c "npm start; exec bash" &
cd ..

echo
echo "========================================"
echo "   Projeto iniciado com sucesso!"
echo "========================================"
echo
echo "Backend:  http://localhost:8080"
echo "Frontend: http://localhost:4200"
echo "Console H2: http://localhost:8080/h2-console"
echo
echo "Pressione Enter para sair..."
read 