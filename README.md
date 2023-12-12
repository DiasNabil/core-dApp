
## CORE DAPP
Cette application, destinée aux ONG, permet à quiconque, n'importe où dans le monde, d'effectuer un don pour une ONG, peu importe le montant. De plus, les organisations auront la possibilité, via nos services, de créer du rendement, leur offrant ainsi une nouvelle source de revenu.

### SMART CONTRACT
Afin de se rapprocher le plus possible de la situation réelle, les smart contracts ont été déployés sur Sepolia. Des pools d'échange ont également été créés sur Uniswap pour permettre l'échange contre de l'USDC, préservant ainsi la valeur des dons dans le temps.

- **CoreLending :** Smart contract permettant la mise en lending de fonds dans un pool du protocole Aave V3 sur le token USDC. L'organisation éligible a la possibilité de déposer un montant, de profiter de rendements et d'effets composés. Les tokens n'ont pas de période de blocage et sont disponibles au retrait à tout moment.
- **CoreNFT :** Création d'un ERC721 afin de récompenser les donateurs pour leur générosité. À l'avenir, conception d'une collection unique avec un graphiste engagé.

### BACKEND
Dans un contexte de test de produit, en plus de la contrainte du temps, les informations nécessaires à l'utilisation de l'application ont été inscrites en dur. Vous trouverez toutes les ressources nécessaires à l'utilisation de l'application dans le dossier frontend/core-front/helpers. À l'avenir, l'utilisation d'un headless CMS comme Strapi conviendrait à l'utilisation. J'étais parti sur cela à la base, mais j'ai rencontré des problèmes lors du déploiement du backend.

### FRONTEND
Portail reliant donateur - organisation - web3. L'objectif est de créer un cercle vertueux avec ces trois composantes pour lesquelles l'application a été conçue.
- Côté donateur : Il sera possible de rechercher une organisation en particulier, de se renseigner, et s'il a une cause à cœur, il pourra faire un don directement en cryptomonnaie. Pour le test, les tokens disponibles sont : DAI, USDC, USDT, WETH, mais sur mainnet, les possibilités sont élargies.
- Côté organisations : Elles peuvent accéder à un tableau de bord leur permettant de suivre l'historique de leurs dons et de leurs récompenses. La possibilité de mettre un montant dans le pool du smart contract et de le retirer est également envisagée. La possibilité de sortir du protocole est également envisagée, notamment via les services 'RAMP' ou 'mtPelerin'.

### TEST UNITAIRE 
<img width="446" alt="image" src="https://github.com/DiasNabil/core-repo/assets/103931817/9810d6df-5ca8-41ef-ac8d-b96d84375d42"> </br>
les tests unitaires sur sepolia coutant chère en gas, j'ai donc fait une copie du contrat avec la création d'un token ERC20 afin de tester ses principales fonctionnalités. 

Contrats :
- CoreLending contract:0x931A7028D24B0468a9b86c2f1d33f81A81D19a2c
- CoreNFT contract:0x43AF95a415Ca1f06B5505C2B87E90375d5A80252
- PoolAave contract: 0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951
- aUSDC contract:0x16dA4541aD1807f4443d92D26044C1147406EB80
- USDC contract:0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8

Déployé sur Sepolia
Domaine: https://core-repo.vercel.app/
video de demonstration: 
