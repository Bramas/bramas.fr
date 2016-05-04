Teaching
========
 

ProgRes (2015/2016)
--------

**Soutenance prévue pour le 10 mai 23h59 par email  a tous les intervants de l'UE**
 - Document de 5 pages maximum expliquant les choix techniques effectués
 - Archive du code source
 - Vidéo de démonstration (minimum 5 minutes par étudiant par projet. Maximum 20 minutes)

Pour installer un package pour python 3, sur les machines de l'umpc, il faut utiliser la commande suivante:

```bash
python3 -m pip install --user <le-nom-du-package>
```
si le module pip n'est pas installé, il faut executer les commandes suivantes:

```bash
wget https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py --user
```

### Web Api

[Cours 1](/teaching/Web Service - Introduction.pdf)
[Cours 2](/teaching/Advanced Rest Api.pdf)


### NodeJs

Node js est installer dans le dossier `/Vrac/ProgRes/local/bin`. Pour l'utiliser facilement, ajoutez-le au Path:

```bash
echo 'export PATH=/Vrac/ProgRes/local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

[Cours 1](/teaching/introduction-to-js-and-nodejs.pdf)
[Cours 2](/teaching/real-time-networking-game-with-nodejs.pdf)
[TP](/teaching/TP-Nodejs.pdf)
[Projet](/teaching/NodeJS-projet.pdf)
