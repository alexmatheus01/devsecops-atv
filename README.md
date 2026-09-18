**DevSecOps - Análise de Segurança**

Projeto desenvolvido para uma atividade com o objetivo de demonstrar a aplicação de práticas DevSecOps
e Shift Left em uma aplicação Web. A aplicação foi desenvolvida com Node.js e API Express, e integrada a uma pipeline CI/CD no GitHub Actions, que realiza testes automatizados por meio de SAST, SCA e DAST.


**FERRAMENTAS UTILIZADAS**

- GitHub Actions
- SonarQube
- Snyk
- OWASP ZAP


**TIPO DE ANÁLISE**

SonarQube -> SAST: analisa o código fonte após a compilação na etapa do Build
Snyk -> SCA: verifica as dependências utilizadas no projeto, em busca de vulnerabilidades e problemas na licença de bibliotecas.
OWASP ZAP -> DAST: coloca a aplicação em produção antes do deploy para verificar possíveis vulnerabilidades que só aparecem na execução.


**FUNCIONAMENTO DA PIPELINE**
## 1 - O que dispara a pipeline? ##
Sempre que um 'push' na branch 'main', o pipeline começa para analisar o código que chegou ao repositório remoto, vindo do repositório local na máquina. O 'push' funciona como um gatilho.

## 2 - Em qual etapa ocorre a análise? ##
Após o início do pipeline e o código ser compilado na etapa de 'Build', prossegue-se para a etapa de 'Testes Automatizados' onde são realizadas as 3 análises principais.

## 3 - O que acontece quando são encontrados problemas? ##
O pipeline para de rodar e o resultado das análises ficam armazenados em logs, que permitem ver ONDE aconteceu um problema e QUAL É, para que possa ser corrigido o mais rápido possível. Depois de corrigir o problema, dispara um novo pipeline para verificar se está tudo em conformidade.


**RESULTADOS**
Através do GitHub Actions, pôde-se observar que o pipeline foi executado e antes da etapa de Build, constatou-se 2 vulnerabilidades de gravidade moderada, demonstrando a importância de implementar a segurança desde o planejamento de um projeto. A detecção prévia de inconsistências no código fonte previne não só a chegada de erros aos usuários, mas também o agravamento de tal problema a ponto de derrubar o sistema.

![1 execução](<images/Captura de Tela (152).png>)


Na etapa de SAST, com auxílio do SonarQube, os seguintes resultados foram vistos:
*Security*: 1 problema encontrado
*Reliability*: 0 (nenhum problema de conformidade)
*Maintainability*: 0 (nenhum problema na manutenção do código)
*Coverage*: 0% (sem cobertura de testes automatizados)
*Duplications*: 0% (sem código duplicado)

*Coverage* é uma espécie de métrica que avalia a quantidade de código executada durante testes automatizados, permitindo identificar regressões.

![SAST/SonarQube](<images/Captura de Tela (138).png>)
![SAST 1](<images/Captura de Tela (145).png>)


O SCA, utilizando Snyk, encontrou uma vulnerabilidade crítica em uma dependência: proxy-addr@2.0.7, ainda no Terminal no VS Code, antes de subir para o GitHub. Ela foi atualizada para uma versão mais recente:
![Snyk no Terminal](<images/Captura de Tela (139).png>)

Rodando o teste novamente na plataforma, não foi identificado problemas:
![SCA](<images/Captura de Tela (146).png>)
![Snyk Site](<images/Captura de Tela (150).png>)

Chegando à etapa de DAST, foi escolhido o OWASP ZAP para realizar a análise dinâmica da aplicação. Na primeira execução, via Terminal, foram constatados 8 alertas WARN-NEW e 59 aprovações, onde não encontrou erros críticos, apenas vulnerabilidades. Os alertas representavam: ausência de algumas políticas de segurança de conteúdo, falta de cabeçalho HTTP, entre  No fim de sua execução, foram constatados 8 alertas WARN-NEW e 59 aprovações, onde não encontrou falhas ou vulnerabilidades. Os alertas representavam políticas de segurança de conteúdo ausentes, como, falta de um cabeçalho HTTP, permissão de plugins externos e possivelmente ofensivos, injeção de scripts maliciosos, entre outros.
![DAST 1](<images/Captura de Tela (140).png>)

Após adicionar algumas políticas de segurança, incluir alguns headers e executar novamente a etapa de DAST no GitHub, restaram apenas 4 alertas para serem corrigidos e houve 63 aprovações.
![DAST 2](<images/Captura de Tela (149).png>)


*Obs: a etapa do DAST precisou ser configurada fora do Security Pipeline pois precisava executar a aplicação para realizar a análise, simulando um ambiente de produção.*


**CONCLUSÃO**
A implementação aplica os conceitos de DevSecOps quando integramos o conceito de segurança ao processo de desenvolvimento e ao pipeline, mitigando a ideia de que análises de segurança são feitas apenas no final do ciclo de desenvolvimento para validar tudo que foi feito. É aí que entra o conceito de Shift Left, pois podemos fazer verificações desde o início, na escrita do código, para identificar falhas, vulnerabilidades e também conformidade na estrutura do que está sendo/foi construído. Utilizamos 3 ferramentas para realizar testes automatizados: SAST (para análise estática), SCA (dependências e bibliotecas incluídas na aplicação) e DAST (análise dinâmica). 
DevSecOps se mostra eficiente, pois além de evitar correções frequentes de problemas intrísecos ao código, confere mais qualidade pra aplicação.




