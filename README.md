# Template para AWS Lambda usando Node JS

Exemplo completo de um projeto Node JS usando aws-serverless-express para arquiteturas serverless.
Junto ao template também estão algumas recomendações de pacotes para tratar da segurança, um exemplo usando EJS para responder páginas HTML e uma integração da Lambda com o serviço de e-mail da AWS (SES). Caso precise implementar o SES não se esqueça de autorizar a lambda. 
Também tem uma sugestão para divisão das pastas em um projeto com banco de dados.

## Project setup
```
yarn install
```

### Compiles a zip package
```
yarn zip
```

### Send zip package to AWS Lambda by AWS CLI
```
yarn deploy
```

### Lints and fixes files
```
yarn lint
```