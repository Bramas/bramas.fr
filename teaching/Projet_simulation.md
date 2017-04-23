# Projet PROGRES - 2017 - Simulation

**Pour ce projet, le rapport n'a pas de limite de pages, et il n'y a pas besoin de faire de vidéo**

On considère un réseaux composé de plusieurs noeuds. On suppose qu'un noeud en particulier (la source) possède une donnée. Un algorithme de broadcast est un algorithme qui s'exécute sur chaque noeud dans le but que tous les noeuds du réseaux reçoivent cette donnée. Le but du projet est d'étudier les performances de plusieurs algorithmes de broadcast, dans différents environnements.

Vous devez:
* Créer une simulation en utilisant JBotSim permettant de simuler le fonctionnement des algorithmes de broadcast
* Implémenter plusieurs algorithmes de broadcast
* Recueillir à l'aide de votre simulation les performances des différents algorithmes de broadcast
* Rendre la topologie dynamique à l'aide d'un modèle de mobilité ou en utilisant des traces réelles.
* Afficher des courbes montrant les performances des différents algorithmes en fonction du modèle de mobilité utilisé.

Les performances qu'il serait intéressant d'analyser sont : le nombre de messages envoyés contenant la donnée ; le temps écoulé entre l'envoi  de la donnée par la source et la réception de la donnée par l'ensemble des noeuds ;  le temps pour que X % des noeuds reçoivent la donnée (avec X = 50, 75, 90, ou même voir l'évolution des performances pour chaque X entre 0 et 100).

Ces performances doivent être mesurées pour chaque algorithme en utilisant plusieurs topologies. Il faudra choisir plusieurs topologies aléatoires, en faisant varier le nombre de noeuds et la densité du réseau, mais aussi introduire des réseaux dynamiques (où les noeuds sont en mouvement) et aussi des topologies issues de traces réelles.

## Algorithme de broadcast
Un algorithme de broadcast correspond à une classe qui hérite de `Node`.

### Dans le cas d'une topologie statique
Pour ces algorithmes on supposera que le réseau est connecté.

#### Flooding
Le premier algorithme de broadcast qu'il faut implémenter est l'algorithme Flooding (dans une classe appelée `FloodingBroadcast` par exemple).
Cet algorithme fonctionne ainsi. La source du message envoie la donnée une fois au début de la simulation.
Dès qu'un noeud reçoit la donnée, si c'est la première fois que la donnée est reçue, elle est retransmise, sinon rien ne se passe.

Avec cet algorithme, lorsque la topologie est statique (les noeuds ne bougent pas) et connexe, tous les noeuds sont garantis de recevoir la donnée.

#### Probabilistic flooding
Le fonctionnement est le même que pour le Flooding, mais lorsqu'un noeud reçoit la donnée pour la première fois, il la retransmet avec une certaine probabilité.
Il faut choisir plus plusieurs valeurs différentes de cette probabilité et inclure chacune des versions dans le comparatif (par exemple Probabilistic Flooding avec p = 0.4,  Probabilistic Flooding avec p = 0.6,  Probabilistic Flooding avec p = 0.8, etc.)
#### Broadcast sur un arbre couvrant
Cet algorithme de broadcast consiste d'abord à  créer un arbre couvrant enraciné en la source du broadcast (en utilisant des messages de contrôles qui ne sont pas comptés dans les statistiques du nombre de messages contenant la donnée). Un fois l'arbre créé, tous les noeuds **qui ne sont pas des feuilles** appliquent l'algorithme Flooding.

### Dans le cas d'une topologie dynamique
Les algorithmes suivant doivent être exécutés lorsque les noeuds sont en mouvement. Il faudra donc implémenter une classe qui a chaque instant modifie la position des noeuds.

#### Continuous Flooding
Similaire au Flooding, mais un noeud qui possède la donnée la retransmet à chaque instant pendant un certain temps (et pas seulement une fois juste après l'avoir reçue pour la première fois).

#### Continuous Probabilistic Flooding
Similaire au Probabilistic Flooding, mais un noeud qui possède la donnée essaie de la retransmettre à chaque instant, avec une certaine probabilité, pendant un certain temps (et pas seulement une fois juste après l'avoir reçue pour la première fois).

## Mise en place de la simulation

Une des manières de procéder (vous êtes libre de choisir une autre architecture), est de créer une classe `Simulation` qui ne contient que des fonctions statiques, notamment le point d'entrée du programme avec la création de la topologie et le choix de l'algorithme de broadcast.
Cette classe peut écouter les événements qui se produisent dans le réseau pour sauvegarder les statistiques nécessaires à notre étude. Par exemple, on pourra faire en sorte que tous les messages contenant la donnée sont en Java des messages `Message` contenant la chaine `"data"`, ainsi la classe Simulation peut écouter tous les messages envoyés dans le réseau (`MessageListener`) et détecter quand tous les noeuds ont reçu la donnée pour enregistrer le temps écoulé et redémarrer la simulation.

Les statistiques doivent être des moyennes sur un nombre suffisamment grand de simulations (dans le cas ou la topologie est aléatoire). Le format du fichier log doit être décrit dans le rapport.

## Affichage des Résultats
La comparaison des performances des différents algorithmes de broadcast doit être présentée sous forme de courbes générées en `Python` avec la librairie `matplotlib` avec une courte description des résultats (dans le rapport).
