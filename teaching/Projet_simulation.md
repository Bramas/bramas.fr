# Projet PROGRES - 2017 - Simulation
On suppose qu'un noeud en particulier (la source) possède une donnée. Un algorithme de broadcast est un algorithme qui s'exécute sur chaque noeud dans le but que tous les noeuds du réseaux reçoivent la donnée. Le but du projet est d'étudier les performances de plusieurs algorithmes de broadcast, dans différents environements.

Vous devez:
* Créer une simulation en utilisant JBotSim permettant de simuler le fonctionnement des algorithmes de broadcast
* Implémenter plusieurs algorthimes de broadcast
* Recuillir à l'aide de votre simulation les performances des différents algorithmes de broadcast
* Rendre la topology dynamique à l'aide d'un modèle de mobilité ou en utilisant des traces réelles.
* Afficher des courbes montrant les performances des différents algorithmes en fonction du modèle de mobitilité utilisé.

Les performances qu'il serait intéressant d'analyser sont: le nombre de messages envoyés contenant la donnée ; le temps écoulé entre l'envoie de la donnée par la source et la réception de la donnée par l'ensemble des noeuds ;  le temps pour que X % des noeuds reçoivent la données.
Ces performances doivent être mesurer pour chaque algorithme en utilisant plusieurs topologies. Il faudra choisir plusieur topologies aléatoires, en faisant varier le nombre de noeuds et la densité du réseau, mais aussi introduire des réseaux dynamiques (où les noeuds sont en mouvement) et aussi des topologies issues de traces réelles.

## Algorithme de broadcast
Un algorithme de broadcast correspond à une classe qui hérite de `Node`.

### Dans le cas d'une topologie statique
#### Flooding
Le premier algorithme de broadcast qu'il faut implémenter est l'algorithme Flooding (dans une classe appelée `FloodingBroadcast` par exemple).
Cette algorithme fonctionne ainsi. La source du message envoie la donnée une fois au début de la simulation.
Dès qu'un noeud reçoit la donnée, si c'est la première fois que la donnée est reçue, elle est retransmise, sinon rien ne se passe.

Avec cet algorithme, lorsque la topologie est statique (les noeuds ne bouge pas) et connexe, tous les noeuds sont garantis de recevoir la donnée.

#### Probabilistic flooding
Le fonctionnement est le même que pour le Flooding, mais lorsqu'un noeud reçoit la donnée pour la première fois, il la retransmet avec une certaine probabilité.
Il faut choisir plus plusieurs valeurs différente de cette probabilité et inclure chacune des versions dans le comparatif (par exemple Probabilistic Flooding avec p = 0.4,  Probabilistic Flooding avec p = 0.6,  Probabilistic Flooding avec p = 0.8, etc.)
#### RNG

### Dans le cas d'une topologie dynamique
#### Continuous Flooding
Similaire au Flooding, mais un noeuds qui possède la donnée la retransmet a chaque instant pendant un certain temps (et pas seulement une fois juste après l'avoir reçue pour la première fois).

#### Continuous Probabilistic Flooding
Similaire au Probabilistic Flooding, mais un noeuds qui possède la donnée essaie de la retransmettre à chaque instant, avec une certaine probabilité, pendant un certain temps (et pas seulement une fois juste après l'avoir reçue pour la première fois).

## Mise en place de la simulation

Une des manière de procéder (vous êtes libre de choisir une autre architecture), est de créer une classe `Simulation` qui ne contient que des fonctions statiques, notamment le point d'entrée du programme avec la création de la topologie et le choix de l'algorithme de broadcast.
Cette classe peut écouter les événements qui se produisent dans le réseau pour sauvegarder les statistiques nécessaire à notre étude. Par exemple, on pourra faire en sorte que tous les message contenant la donnée sont en Java des messages `Message` contenant la chaine `"data"`, ainsi la classe Simulation peut écouter tous les messages envoyés dans le réseau (`MessageListener`) et détecter quand tous les noeuds ont reçu la données pour redémmarrer la simulation.

Les statistiques doivent être des moyennes sur un nombre suffisament grand de simulation (dans le cas ou la topologie est aléatoire). Le format du fichier log doit être décrit dans le rapport.
## Affichage des Résultats
La comparaison des performances des différents algorithmes de broadcast doit être présentée sous forme de coubres avec une courte description des résultats (dans le rapport).
