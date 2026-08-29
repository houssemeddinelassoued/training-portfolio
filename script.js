// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after choosing a link
  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Programmes détaillés jour par jour (affichés dans une popup) =====
const programs = {
  'programmation-objet': {
    jours: [
      "Des fonctions isolées à la pensée objet : limites de l'approche structurée, vocabulaire clé (classe, instance, attribut, méthode, encapsulation)",
      "Héritage, composition et polymorphisme à travers des cas concrets ; introduction aux patrons de conception les plus courants",
      "Traduction d'un modèle métier en diagramme de classes UML, projet fil rouge et regard critique sur l'usage de l'IA générative en conception"
    ],
    public: "Développeurs juniors ou personnes venant d'un langage procédural, souhaitant acquérir de solides bases objet.",
    tp: "Atelier fil rouge : modélisation puis codage d'un petit système de gestion de commandes, enrichi au fil des séances."
  },
  'uml': {
    jours: [
      "Rôle de chaque diagramme selon la phase du projet (analyse, conception) et positionnement d'UML dans une démarche projet",
      "Diagramme de cas d'utilisation : capter et formaliser le besoin fonctionnel",
      "Diagramme de classes et diagramme d'objets",
      "Diagrammes de séquence et de communication, bonnes pratiques de modélisation et pièges fréquents"
    ],
    public: "Analystes, développeurs ou chefs de projet impliqués dans la conception d'applications.",
    tp: "Mise en situation sur un projet complet, de l'expression du besoin jusqu'au diagramme de classes final."
  },
  'bases-donnees': {
    jours: [
      "Principes du modèle relationnel : entités, relations, clés primaires et étrangères",
      "Étapes de conception : modèle conceptuel puis modèle logique des données",
      "Passage au modèle physique, normalisation et compromis avec la performance",
      "Premiers pas en SQL, fonctionnement interne d'un moteur et spécificités des architectures client/serveur ou web"
    ],
    public: "Toute personne découvrant la conception de bases de données relationnelles.",
    tp: "Conception pas à pas d'une base de données à partir d'un cas métier, puis mise en œuvre des requêtes associées."
  },
  'sql': {
    jours: [
      "Architecture d'un SGBDR, vocabulaire associé et premières requêtes de sélection, filtres et tris",
      "Mise à jour des données : insertion, modification, suppression",
      "Jointures internes, externes et leurs cas d'usage",
      "Requêtes ensemblistes et sous-requêtes imbriquées",
      "Modélisation d'une requête complexe à l'aide d'un arbre logique avant sa traduction en SQL"
    ],
    public: "Utilisateurs ou développeurs souhaitant interroger et manipuler des bases de données relationnelles.",
    tp: "Nombreux exercices progressifs, des requêtes simples jusqu'aux requêtes multi-tables avancées."
  },
  'java-fondamentaux': {
    jours: [
      "Prise en main de l'environnement de développement (IDE) et premiers pas dans la syntaxe Java",
      "Classes, attributs, méthodes, héritage et interfaces",
      "Gestion des collections et des flux de données avec l'API Stream",
      "Connexion et interrogation d'une base de données via JDBC",
      "Consolidation sur l'application fil rouge et panorama des nouveautés récentes du langage"
    ],
    public: "Développeurs débutants en Java, à l'aise avec la logique de programmation.",
    tp: "Application fil rouge enrichie progressivement, du simple objet métier jusqu'à la persistance des données."
  },
  'java-avance': {
    jours: [
      "Fonctionnement interne de la machine virtuelle Java (JVM) et diagnostic de performance",
      "Conception d'applications multi-threadées et synchronisation des accès concurrents",
      "Manipulation de fichiers et répertoires avec les API modernes, traitement de flux volumineux avec l'API Stream",
      "Organisation d'un projet Java en modules et industrialisation avec un outil de build (Maven/Gradle)"
    ],
    public: "Développeurs Java ayant déjà suivi une première formation ou possédant une expérience équivalente.",
    tp: "Exercices de diagnostic de performance, de correction de bugs de concurrence et d'industrialisation d'un projet."
  },
  'java-8': {
    jours: [
      "Principes de la programmation fonctionnelle, expressions lambda et références de méthode",
      "API Stream (filtrage, transformation, agrégation), méthodes par défaut et nouvelle API Date&Time"
    ],
    public: "Développeurs Java souhaitant mettre à jour leurs pratiques avec les apports de Java 8.",
    tp: "Réécriture de traitements existants avec les Streams et les expressions lambda."
  },
  'java-11-17': {
    jours: [
      "Panorama des nouveautés introduites entre les versions 9 et 11, modularisation des applications (JPMS)",
      "Nouveautés de Java 17 (records, classes scellées, simplifications syntaxiques) et migration d'un projet existant"
    ],
    public: "Développeurs Java souhaitant actualiser leurs connaissances vers les dernières versions LTS.",
    tp: "Migration progressive d'un petit projet Java 8 vers les fonctionnalités de Java 17."
  },
  'junit': {
    jours: [
      "Rôle et limites des tests unitaires, écriture de cas de tests avec JUnit, assertions et cycle de vie des tests",
      "Mise en place de tests d'intégration et utilisation de JUnit dans une chaîne d'intégration continue"
    ],
    public: "Développeurs Java souhaitant fiabiliser leur code grâce aux tests automatisés.",
    tp: "Couverture progressive d'une petite application par des tests unitaires puis d'intégration."
  },
  'javafx': {
    jours: [
      "Composants graphiques de base et organisation d'une interface JavaFX",
      "Description d'interfaces avec le langage FXML et prise en main de l'outil SceneBuilder",
      "Cohabitation avec Swing et utilisation des threads pour garder une interface réactive"
    ],
    public: "Développeurs Java souhaitant créer des interfaces graphiques modernes.",
    tp: "Construction progressive d'une application de bureau complète avec plusieurs écrans."
  },
  'certification-java-8-niveau-1': {
    jours: [
      "Rappel structuré des fondamentaux attendus à l'examen et repérage des pièges classiques",
      "Entraînement sur des questions types à choix multiples",
      "Examen blanc et stratégie de gestion du temps le jour de l'épreuve"
    ],
    public: "Développeurs souhaitant valider officiellement leurs bases en Java 8.",
    tp: "Sessions d'examens blancs corrigées et commentées."
  },
  'certification-java-8-niveau-2': {
    jours: [
      "Approfondissement des sujets avancés couverts par l'examen, cas pratiques sur les mécanismes subtils du langage",
      "Entraînement intensif sur des QCM proches du format réel et bilan personnalisé avant l'épreuve"
    ],
    public: "Développeurs ayant déjà le premier niveau de certification ou un niveau équivalent.",
    tp: "Séries d'exercices chronométrés dans les conditions de l'examen."
  },
  'certification-java-11-partie-1': {
    jours: [
      "Cadrage de l'examen 1Z0-819 et de sa structure, révision des fondamentaux du langage version Java 11",
      "Premiers modules du programme officiel de certification (partie 1)",
      "Poursuite des modules et exercices guidés associés",
      "Choix stratégiques pour aborder sereinement l'épreuve et bilan intermédiaire"
    ],
    public: "Développeurs Java expérimentés visant la certification professionnelle Java 11.",
    tp: "Exercices guidés couvrant la première moitié du programme de certification."
  },
  'certification-java-11-partie-2': {
    jours: [
      "Suite du programme officiel de certification, sujets complémentaires non couverts en partie 1",
      "Approfondissement de ces sujets à travers des cas pratiques",
      "Entraînement global sur l'ensemble du référentiel de certification",
      "Simulation finale dans les conditions de l'examen et correction détaillée"
    ],
    public: "Développeurs ayant suivi la première partie de la préparation ou disposant d'un niveau équivalent.",
    tp: "Examen blanc complet suivi d'une correction détaillée."
  },
  'tdd': {
    jours: [
      "Principe du cycle court (écrire un test, le faire passer, refactorer) et avantages du TDD",
      "Conception guidée par les tests sur un cas simple",
      "Application des techniques de TDD sur du code existant (legacy) et intégration dans une démarche agile"
    ],
    public: "Développeurs, quel que soit le langage, souhaitant améliorer la fiabilité de leur code.",
    tp: "Développement complet d'une petite application en suivant strictement la démarche TDD."
  },
  'git': {
    jours: [
      "Principes d'un système de contrôle de versions distribué, commandes de base (dépôt, commit, historique)",
      "Stratégies de branches, workflows de collaboration en équipe, résolution des conflits de fusion et découverte d'une plateforme collaborative"
    ],
    public: "Toute personne débutant avec le versionnement de code source en environnement d'équipe.",
    tp: "Mise en place d'un dépôt partagé et simulation d'un travail collaboratif à plusieurs contributeurs."
  },
  'figma': {
    jours: [
      "Découverte de l'interface, des outils de dessin vectoriel, des composants et variants",
      "Mise en page responsive, prototypes interactifs cliquables et collaboration en temps réel"
    ],
    public: "Designers, développeurs ou chefs de produit souhaitant prendre en main Figma.",
    tp: "Conception complète d'une maquette d'application, du wireframe au prototype interactif."
  },
  'figma-perfectionnement': {
    jours: [
      "Structuration d'une bibliothèque de composants réutilisables, variables et tokens de design",
      "Prototypage avancé, Dev Mode pour le partage avec les développeurs et plugins IA"
    ],
    public: "Utilisateurs de Figma souhaitant structurer un design system complet et professionnel.",
    tp: "Construction d'un design system réutilisable à partir d'une maquette existante."
  },
  'photoshop': {
    jours: [
      "Découverte de l'espace de travail, outils de sélection et réglages de colorimétrie",
      "Travail par calques et masques, retouches courantes (recadrage, tampon, correction de défauts)",
      "Application de filtres, finalisation et export des visuels"
    ],
    public: "Débutants souhaitant s'initier à la retouche d'image avec Photoshop.",
    tp: "Retouche complète de plusieurs photographies fournies en support d'exercice."
  },
  'langage-c': {
    jours: [
      "Structures de contrôle, types de données et écriture des premières fonctions",
      "Compilation, édition de liens et organisation d'un projet C",
      "Gestion manuelle de la mémoire : pile, tas et pointeurs",
      "Écriture d'un code portable respectant la norme ANSI et bonnes pratiques de sécurité mémoire",
      "Consolidation sur un projet modulaire complet"
    ],
    public: "Développeurs souhaitant s'initier à un langage bas niveau, notamment pour l'embarqué.",
    tp: "Suite d'exercices progressifs aboutissant à un petit programme modulaire complet."
  },
  'cpp': {
    jours: [
      "Passage du C au C++ : ce que la dimension objet apporte, premières classes",
      "Constructeurs, destructeurs et surcharge d'opérateurs",
      "Apports des normes récentes du langage (dont C++11) et introduction à la STL",
      "Gestion sécurisée de la mémoire avec les pointeurs intelligents",
      "Conception puis implémentation d'un projet applicatif complet"
    ],
    public: "Développeurs ayant des bases en C ou dans un autre langage, souhaitant apprendre le C++.",
    tp: "Conception orientée objet puis implémentation d'un petit projet applicatif en C++."
  },
  'panorama-technologies-informatiques': {
    jours: [
      "Module 1 — Matériel et systèmes d'exploitation : composants, virtualisation, cloud",
      "Module 2 — Réseaux, Web et sécurité : infrastructure, protocoles, menaces courantes",
      "Module 3 — Développement logiciel : langages, IDE, bases de données, architectures",
      "Module 4 — Web et mobile : front-end, back-end, API, applications natives et hybrides"
    ],
    public: "Profils non techniques (management, support, avant-vente) souhaitant acquérir une culture informatique transversale.",
    tp: "Alternance d'apports théoriques, de démonstrations et d'échanges de questions/réponses sur chaque module."
  },
  'ia-booster-performances': {
    jours: [
      "Panorama des outils d'IA pour développeurs (IDE cloud, assistants conversationnels, outils spécialisés) et premiers usages : prototypage, réécriture de code, documentation, génération de tests ; puis intégration de l'IA à tout le cycle de développement (conception, codage, tests, documentation) et repérage des limites techniques du code généré (qualité, licences, contexte projet)",
      "Retour sur un cas d'usage préparé en intersession, puis approfondissement de la cybersécurité liée à l'IA (fuite de données, clés API, RGPD), méthodes pour évaluer et fiabiliser le code généré (relecture croisée, analyse statique) et construction d'un plan d'action personnel"
    ],
    public: "Développeurs, RSSI ou toute personne impliquée dans des projets informatiques.",
    tp: "Ateliers sur des outils IA en ligne (génération de code, tests, documentation), mini-projet réalisé en intersession entre les deux journées, audit collaboratif d'un code généré par IA."
  },
  'ia-code-assiste': {
    jours: [
      "Découverte des assistants de code basés sur l'IA (complétion, génération de fonctions, suggestions contextuelles) et techniques de formulation de prompts adaptées au développement",
      "Génération assistée de tests et de documentation, puis relecture critique du code produit par l'IA et intégration raisonnée dans un projet réel"
    ],
    public: "Développeurs souhaitant intégrer des assistants IA dans leur pratique quotidienne de programmation.",
    tp: "Exercices de programmation assistée sur des cas concrets, comparaison de plusieurs suggestions IA, atelier de relecture critique et de correction du code généré."
  }
};

const modal = document.getElementById('programModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocusedElement = null;

function buildModalBody(program) {
  const days = program.jours
    .map((item, index) => `<li><strong>Jour ${index + 1}</strong> — ${item}</li>`)
    .join('');
  return `
    <h4>Programme jour par jour</h4>
    <ul class="modal-days">${days}</ul>
    <h4>Public concerné</h4>
    <p>${program.public}</p>
    <h4>Travaux pratiques</h4>
    <p>${program.tp}</p>
  `;
}


function openModal(trainingButton) {
  const slug = trainingButton.getAttribute('data-training');
  const program = programs[slug];
  if (!program) return;

  const section = trainingButton.closest('.training');
  const title = section.querySelector('h3').textContent;
  const meta = section.querySelector('.training-meta').textContent;

  modalTitle.textContent = title;
  modalMeta.textContent = meta;
  modalBody.innerHTML = buildModalBody(program);

  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('.training-link[data-training]').forEach((button) => {
  button.addEventListener('click', () => openModal(button));
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

