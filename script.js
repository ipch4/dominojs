


// Projet Domino “Cochon!”
// L’idée est de créer une application de jeu de dominos sur mobile.
// Il y aura la possibilité de choisir entre le jeu Martiniquais ou Guadeloupéen, et d’ajouter ou pas l’option Parisien.
// Graphiquement, à chaque défaite, un attribut du cochon sera ajouté au joueur qui perd (oreilles, queue, groin…), et au bout de 3 défaites, le joueur deviendra un cochon.
//
//  1. MVP Minimum Valuable Project
//
// - Connexion
// - Sessions
// - Algorithme classique du jeu de dominos
//
//
// 2. Outils
//
// Nous devons faire un choix de framework adapté, de modèle d’architecture, de technologie, via un benchmark.
//
// - Progressive Wep Apps
// - Framework hybride : utilisation des fonctionnalités du téléphone
// - Ionic




    window.game = {};

    window.game.plateau = [
      {
        domino: [6, 6],
      }, {
        domino: [5, 6],
        previousDomino: [6, 6]
      }

    ];

    window.game.firstEntry = {
      domino: [5, 6],
      index: 0
    };

    window.game.secondEntry = {
      domino: [2, 6],
      index: 0
    };

    window.game.ipcha = [
      [4, 4], [1, 5], [0, 1], [4, 5], [1, 4], [3, 5], [0, 4]
    ];

    var dominos = [
      [0,0],
      [0,1],
      [0,2],
      [0,3],
      [0,4],
      [0,5],
      [0,6],
      [1,1],
      [1,2],
      [1,3],
      [1,4],
      [1,5],
      [1,6],
      [2,2],
      [2,3],
      [2,4],
      [2,5],
      [2,6],
      [3,3],
      [3,4],
      [3,5],
      [3,6],
      [4,4],
      [4,5],
      [4,6],
      [5,5],
      [5,6],
      [6,6]
    ];

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function chooseRandomDomino(dominos) {
      var choice = getRandomIntInclusive(0, (dominos.length - 1));
      var domino = dominos[choice];


      dominos.splice(choice, 1);

      var returnParameters = {
        'domino': domino,
        'dominos': dominos,
      };

      return returnParameters
    }

    function chooseSevenDominos(dominos) {
     var sevenDominos = [];
     for(var i = 0 ; i < 7 ; i++){
       var parameters = chooseRandomDomino(dominos);
       dominos = parameters.dominos;
       sevenDominos.push(parameters.domino);
     }

      var returnParameters = {
        'sevenDominos': sevenDominos,
        'dominos': dominos,
      };

      return returnParameters
    }

    function isPlayable(domino, firstEntry, secondEntry) {
      var isPlayable = false;
      var firstEntryValue = firstEntry.domino[firstEntry.index];
      var secondEntryValue = secondEntry.domino[secondEntry.index];

      switch (domino[0]) {
        case firstEntryValue :
          isPlayable = 0;
          break;
        case secondEntryValue :
          isPlayable = 0;
          break;
      }

      switch (domino[1]) {
        case firstEntryValue :
          isPlayable = 1;
          break;
        case secondEntryValue :
          isPlayable = 1;
          break;
      }

      return isPlayable
    }

    function playableDominos(dominos, firstEntry, secondEntry) {
      var playableDominos = [];
      for (var i = 0 ; i < (dominos.length - 1); i++) {
        if(isPlayable(dominos[i], firstEntry, secondEntry) !== false) {
          playableDominos.push({
            'domino': dominos[i],
            'index': isPlayable(dominos[i], firstEntry, secondEntry)
          });
        }
      }

      return playableDominos
    }

    function isDouble(domino) {
      return domino[0] === domino[1] ? true : false;
    }

    function playDomino(domino, index, entryName, playerName) {
      window.game.plateau.push({
        'domino': domino,
        'previousDomino': window.game[entryName].domino
      });

      window.game[entryName] = {
        'domino': domino,
        'index': index === 0 ? 1 : 0,
      };

      var dominoIndex =  window.game[playerName].findIndex(function(e) {
        return e === domino;
      });

      window.game[playerName] =  window.game[playerName].splice(dominoIndex, 1);

      return isWinner(window.game[playerName]);
    }

    function addPlayers(playerName) {
      window.game[playerName] = [];
    }

    function isWinner(dominos) {
      return dominos.length === 0 ? true : false;
    }

console.log(chooseSevenDominos(dominos));
console.log(playableDominos(window.game.ipcha, window.game.firstEntry, window.game.secondEntry));
