@echo off
echo ========================================
echo    Loja de Roupas - Sistema Completo
echo ========================================
echo.

echo Iniciando o backend (Spring Boot)...
cd loja-roupas-api
start "Backend - Spring Boot" cmd /k "mvn spring-boot:run"
cd ..

echo.
echo Aguardando 10 segundos para o backend inicializar...
timeout /t 10 /nobreak > nul

echo.
echo Iniciando o frontend (Angular)...
cd loja-roupas
start "Frontend - Angular" cmd /k "npm start"
cd ..

echo.
echo ========================================
echo    Projeto iniciado com sucesso!
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:4200
echo Console H2: http://localhost:8080/h2-console
echo.
echo Pressione qualquer tecla para sair...
pause > nul 