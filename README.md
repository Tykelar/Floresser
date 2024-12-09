# Welcome to Floresser app 👋

This application aims to provide users with a system that allows them to login and access their account from anywhere and create, view, and edit the balance of users of a service based on their Tax Identification Number (NIF). It also stores the transactions performed for each user, enabling the consultation of their transaction history.

Features:

- Conection with Firebase to store all the information and acess anywhere on any device
- Individual Login/Logout with email and password
- User CRUD (Create Read Update Delete) with Tax identification number and name
- Single user search for transaction insertion (deposit or withdrawal)
- Balance change (transaction history) registry on deposit and withdrawals
- Transaction history search for individual users


Expo Version 51.0.4

Setup & Run

(Desenvolvido em VScode)

1.	Instalar node.js LTS:
   https://nodejs.org/en (check na instalação do chocolatey recomendado)

2.	Reiniciar o computador e confirmar instalação do node: node -v, versão v22.11.0

3.	Installar npm(node package manager): npm install -g npm@10.9.1

4.	Instalar o expo - npm expo install

5.	No terminal na pasta do projecto: 
	   npm install firebase
	   npm install @react-native-async-storage/async-storage
	   npx expo start  
   	(confirmar instalação dos packages do expo (y) expo, versão 51)

10.	Instalar Expo Go no telemóvel (Android) e dar scan do QR code, link apk Android (versão 51):
https://expo.dev/go?sdkVersion=51&platform=android&device=true

Check https://docs.expo.dev for Expo documentation
