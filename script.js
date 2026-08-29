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

// Keep AI as the first catalog category while preserving each training anchor.
const aiCategoryHeading = document.getElementById('cat-ia');
const firstDevelopmentHeading = document.getElementById('cat-conception');

if (aiCategoryHeading && firstDevelopmentHeading) {
  const aiCategoryNodes = [aiCategoryHeading];
  let nextNode = aiCategoryHeading.nextElementSibling;

  while (nextNode && nextNode.id !== 'contact') {
    aiCategoryNodes.push(nextNode);
    nextNode = nextNode.nextElementSibling;
  }

  firstDevelopmentHeading.before(...aiCategoryNodes);
}

// Sidebar toggle for mobile
const sidebarMenuToggle = document.getElementById('sidebarMenuToggle');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarNav = document.getElementById('sidebarNav');
const formationsSidebar = document.querySelector('.formations-sidebar');

if (sidebarMenuToggle && formationsSidebar) {
  sidebarMenuToggle.addEventListener('click', () => {
    const isOpen = formationsSidebar.classList.toggle('open');
    sidebarMenuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (sidebarToggle && sidebarNav) {
  sidebarToggle.addEventListener('click', () => {
    sidebarNav.parentElement.classList.remove('open');
    if (sidebarMenuToggle) {
      sidebarMenuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close sidebar when clicking a link
  sidebarNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        formationsSidebar.classList.remove('open');
        if (sidebarMenuToggle) {
          sidebarMenuToggle.setAttribute('aria-expanded', 'false');
        }
      }
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
  },
  'vibe-coding': {
    jours: [
      {
        titre: "Découvrir la logique et les bases du code",
        modules: [
          { titre: "Comprendre un programme", points: ["Algorithmes, instructions et erreurs", "Variables, types et opérateurs", "Conditions et boucles"] },
          { titre: "Organiser les traitements", points: ["Fonctions et paramètres", "Entrées et sorties simples", "Cycle éditer, exécuter, tester et corriger"] }
        ],
        atelier: "Créer un quiz ou une calculatrice interactive avec variables, conditions et boucles."
      },
      {
        titre: "Structurer un projet et manipuler des données",
        modules: [
          { titre: "Structures de données", points: ["Tableaux et listes", "Dictionnaires et objets", "Lecture de données JSON ou CSV"] },
          { titre: "Qualité d'un petit projet", points: ["Nommage et découpage", "Fonctions réutilisables", "Vérifications et tests simples", "Sauvegarde et affichage formaté"] }
        ],
        atelier: "Construire une liste de tâches ou une application de notes avec sauvegarde locale."
      },
      {
        titre: "Vibe coding et mini-application assistée par IA",
        modules: [
          { titre: "L'IA comme copilote", points: ["Générer, expliquer et corriger du code", "Formuler un prompt utile", "Comparer et valider les propositions"] },
          { titre: "Finaliser l'application", points: ["Créer des composants et variantes", "Améliorer l'interactivité", "Refactorer avec l'IA", "Présenter le projet et le rôle de l'IA"] }
        ],
        atelier: "Réaliser puis présenter une mini-application interactive co-créée avec une IA générative."
      }
    ],
    public: "Débutants complets, étudiants, collaborateurs non techniques et profils métiers souhaitant découvrir le développement par la pratique.",
    prerequis: "Aucune expérience en programmation ; être à l'aise avec l'usage courant d'un ordinateur.",
    tp: "Environ 60 % de pratique, avec défis progressifs et mini-projet fil rouge.",
    outils: ["Visual Studio Code", "Navigateur moderne", "JSON ou CSV", "Assistant IA générative"]
  },
  'ia-prompt-engineering': {
    jours: [
      {
        titre: "Fondamentaux, modèles et outils",
        modules: [
          { titre: "Comprendre l'IA", points: ["Algorithmes, machine learning et deep learning", "NLP, vision et multimodalité", "LLM, Transformers, modèles de fondation et fenêtre de contexte", "Principe du RAG"] },
          { titre: "Panorama des solutions", points: ["Modèles propriétaires et open source", "ChatGPT, Gemini, Claude, Llama et Mistral", "Performances, coûts, transparence et réutilisation", "Interfaces de chat et playgrounds"] }
        ],
        atelier: "Comparer plusieurs modèles sur une même demande métier et analyser les écarts de résultat."
      },
      {
        titre: "Prompt engineering, usages et maîtrise des risques",
        modules: [
          { titre: "Concevoir des prompts robustes", points: ["Contexte, rôle, contraintes et format de sortie", "Zero-shot et few-shot", "Chaînage, raisonnement guidé et techniques d'itération", "Contrôle du style et génération structurée"] },
          { titre: "Intégrer avec discernement", points: ["Cas d'usage dans les processus de travail", "Biais, hallucinations et explicabilité", "Propriété intellectuelle et données personnelles", "Sécurité des prompts et informations sensibles"] }
        ],
        atelier: "Construire, tester puis améliorer une bibliothèque de prompts adaptée à des situations professionnelles réelles."
      }
    ],
    public: "Professionnels, managers et responsables d'équipe souhaitant intégrer les IA génératives textuelles dans leur activité.",
    prerequis: "Être à l'aise avec des outils numériques utilisés dans un contexte professionnel.",
    tp: "Ateliers de comparaison de modèles, conception de prompts, analyse critique et transposition à des cas métiers.",
    outils: ["ChatGPT", "Gemini", "Claude", "Mistral", "Playgrounds de modèles", "Outils de RAG en démonstration"]
  },
  'claude-code-developpeurs': {
    jours: [
      {
        titre: "Développer avec un agent de code en terminal",
        modules: [
          { titre: "Prise en main", points: ["Installation et authentification", "Navigation dans un dépôt", "Contexte projet et fichiers d'instructions", "Commandes, permissions et modes d'interaction"] },
          { titre: "Mener une tâche de bout en bout", points: ["Explorer avant de modifier", "Planifier une évolution multi-fichiers", "Générer et refactorer du code", "Lancer les tests et analyser les erreurs", "Contrôler le diff avant validation"] },
          { titre: "Usage professionnel", points: ["Prompts précis et critères d'acceptation", "Protection des secrets et des données", "Limites, hallucinations et supervision humaine", "Intégration au workflow Git"] }
        ],
        atelier: "Faire réaliser une évolution sur un projet existant, puis auditer les changements et corriger les écarts avec l'agent."
      }
    ],
    public: "Développeurs souhaitant utiliser Claude Code pour des tâches de programmation et de maintenance de projet.",
    prerequis: "Maîtriser un langage de programmation, Git et les commandes de base d'un terminal.",
    tp: "Manipulations guidées puis cas pratique complet sur un dépôt de démonstration.",
    outils: ["Claude Code", "Terminal", "Git", "Éditeur de code", "Framework de tests du projet"]
  },
  'github-copilot-debutant': {
    jours: [
      {
        titre: "Découverte et premières générations",
        modules: [
          { titre: "Comprendre GitHub Copilot", points: ["Origine, fonctionnement et cas d'usage", "Rôle des LLM", "Avantages et limites", "Démonstration en direct"] },
          { titre: "Installer et configurer", points: ["Extension VS Code et licence", "Langue et langage cible", "Raccourcis essentiels", "Navigation entre suggestions et Copilot Chat"] },
          { titre: "Maîtriser le contexte", points: ["Fichier, commentaires et imports", "Suggestion inline ou chat", "Fenêtre de contexte", "Accepter, refuser et comparer"] },
          { titre: "Générer du code simple", points: ["Variables et structures", "Fonctions guidées par des commentaires", "Python, JavaScript et Java", "Patterns courants"] }
        ],
        atelier: "Configurer l'environnement puis réaliser plusieurs fonctions simples en comparant les suggestions."
      },
      {
        titre: "Approfondissement et bonnes pratiques",
        modules: [
          { titre: "Fonctions, classes et API", points: ["Paramètres et retours", "Classes et méthodes", "Appels HTTP et parseurs", "JSDoc et docstrings"] },
          { titre: "Refactoring assisté", points: ["Simplification et renommage", "Extraction de fonctions", "Instructions en langage naturel", "Comparaison avant/après sur du code legacy"] },
          { titre: "Premiers tests unitaires", points: ["Génération à partir du code", "Organisation des tests", "Assertions et mocks simples", "Vérification de la cohérence"] },
          { titre: "Valider le code généré", points: ["Logique, performance et sécurité", "Hallucinations fréquentes", "Propriété intellectuelle", "Revue de code en équipe"] }
        ],
        atelier: "Refactorer une base de code, générer ses tests et appliquer une checklist de revue humaine."
      }
    ],
    public: "Développeurs débutant avec GitHub Copilot, jeunes développeurs et professionnels découvrant les assistants de code.",
    prerequis: "Connaissances de base en programmation ; aucune expérience préalable avec GitHub Copilot.",
    tp: "40 % de pratique autour de la génération, du refactoring, des tests et de la revue du code produit.",
    outils: ["Visual Studio Code", "GitHub Copilot et Copilot Chat", "Python, JavaScript ou Java", "Framework de tests"]
  },
  'github-copilot-avance': {
    jours: [
      {
        titre: "Prompting, architecture, qualité et intégration d'équipe",
        modules: [
          { titre: "Prompt engineering avancé", points: ["Contexte, contraintes et exemples", "Prompts multi-étapes", "Commentaires structurés", "Copilot Chat ou suggestions inline"] },
          { titre: "Modules et architectures", points: ["Arborescence, modules et interfaces", "API REST complète", "Patterns Repository, Service et Factory", "Dépendances et documentation"] },
          { titre: "Stratégie de tests", points: ["Cas limites et cas négatifs", "Tests unitaires et d'intégration", "Mocks et stubs", "Analyse de couverture"] },
          { titre: "Refactoring et performance", points: ["Anti-patterns", "SOLID et découplage", "Modernisation de code legacy", "Comparaison d'implémentations"] },
          { titre: "Sécurité du code IA", points: ["Injections et exposition de données", "Dépendances vulnérables", "Checklist OWASP", "Licences et conformité"] },
          { titre: "Workflow d'équipe", points: ["Templates de prompts", "Pull Requests et revue", "Scripts et pipelines CI/CD", "Charte d'utilisation responsable"] }
        ],
        atelier: "Produire une fonctionnalité complète avec code, tests, documentation et audit de sécurité, puis la défendre en revue."
      }
    ],
    public: "Développeurs expérimentés, seniors et Tech Leads utilisant déjà GitHub Copilot régulièrement.",
    prerequis: "Utiliser GitHub Copilot depuis plusieurs semaines, maîtriser un langage, les tests unitaires et la revue de code.",
    tp: "Six ateliers successifs autour d'une API fil rouge, jusqu'à son audit et son intégration CI/CD.",
    outils: ["GitHub Copilot", "Visual Studio Code", "Frameworks Jest, pytest, JUnit ou équivalents", "Git", "CI/CD", "Référentiel OWASP"]
  },
  'copilot-agentic-workflows': {
    jours: [
      {
        titre: "Fondations GenAI et maîtrise des modèles",
        modules: [
          { titre: "Évolution des LLM", points: ["Modèles prédictifs et modèles de raisonnement", "Fenêtres de contexte et attention", "Prévention de la perte d'information"] },
          { titre: "Prompting expert", points: ["Few-shot structuré", "Raisonnement guidé", "Meta-prompting appliqué à l'ingénierie logicielle"] },
          { titre: "LLM open source", points: ["Llama, Mistral et modèles locaux", "Déterminisme, créativité et hallucinations", "Interaction par API"] }
        ],
        atelier: "Déployer un modèle local et l'interroger via une API."
      },
      {
        titre: "Agentique et systèmes autonomes",
        modules: [
          { titre: "Mode agent", points: ["Perception, réflexion, action et critique", "Tool use et function calling", "Interaction avec terminal, fichiers et API"] },
          { titre: "Patterns agentiques", points: ["Réflexion et auto-correction", "Planification", "Collaboration multi-agents Dev, QA et SecOps"] }
        ],
        atelier: "Créer un workflow agentique qui analyse un log, formule une hypothèse et propose un correctif."
      },
      {
        titre: "Cadrage, architecture et refactoring .NET",
        modules: [
          { titre: "Contexte et workspace", points: ["Ancrage dans l'architecture existante", "Variables workspace, fichier et sélection", "Détection des cas limites"] },
          { titre: "Architecture et dette technique", points: ["User stories vers microservices C#", "Refactoring de code legacy", "Design patterns et migrations .NET", "Premier niveau de code review IA"] }
        ],
        atelier: "Quatre ateliers dans l'IDE : contexte, architecture, refactoring et revue de code."
      },
      {
        titre: "Qualité, sécurité et écosystème agentique",
        modules: [
          { titre: "Tests et sécurité", points: ["Stratégies xUnit ou NUnit", "Tests unitaires et d'intégration", "Audit OWASP dans l'IDE"] },
          { titre: "Agents personnalisés", points: ["Orchestration multi-agents avec Semantic Kernel", "Skills et hooks", "Prototypage UI/UX", "Rapports et documentation automatisés"] }
        ],
        atelier: "Six ateliers de tests, sécurité, agents, personnalisation, UI/UX et documentation."
      }
    ],
    public: "Équipes de développement .NET souhaitant maîtriser les systèmes agentiques et GitHub Copilot à l'échelle du SDLC.",
    prerequis: "Expérience de développement .NET/C#, GitHub Copilot activé et environnement Visual Studio Code fonctionnel.",
    tp: "Dix ateliers et labs pratiques répartis sur quatre journées intensives.",
    outils: ["GitHub Copilot", ".NET et C#", "Llama ou Mistral", "LangChain", "Microsoft Semantic Kernel", "xUnit ou NUnit", "OWASP"]
  },
  'accompagner-integration-ia': {
    jours: [
      {
        titre: "Comprendre l'IA et ses impacts",
        modules: [
          { titre: "Fondamentaux et tendances", points: ["IA symbolique, machine learning, deep learning et IA générative", "Données, traitement et décision", "Automatisation, prédiction et création de contenu", "Transformation des processus et compétences"] },
          { titre: "Opportunités et risques", points: ["Productivité, innovation et qualité de service", "Limites techniques", "Risques humains, éthiques et organisationnels", "RGPD et AI Act"] },
          { titre: "Leadership et changement", points: ["Posture managériale", "Expliquer l'IA aux non-techniciens", "Traiter les résistances", "Communication interne et expérimentation"] }
        ],
        atelier: "Cartographier les usages IA, analyser un scénario d'intégration et simuler la présentation d'un projet aux équipes."
      },
      {
        titre: "Mettre en œuvre et mobiliser les équipes",
        modules: [
          { titre: "Retour d'intersession", points: ["Présentation de cas d'usage", "Valeur, risques et contraintes", "Leviers de mobilisation", "Enrichissement collectif"] },
          { titre: "Sécurité et confiance numérique", points: ["Protection des données sensibles", "Deepfakes et faux contenus", "Transparence et auditabilité", "Culture de confiance"] },
          { titre: "Feuille de route", points: ["Étapes du déploiement", "Actions à court, moyen et long terme", "Parties prenantes", "Formation, suivi et évaluation"] }
        ],
        atelier: "Auditer un projet IA fictif puis co-construire un plan d'action adapté à son organisation."
      }
    ],
    public: "Managers, responsables et dirigeants amenés à conduire l'adoption de l'IA.",
    prerequis: "Aucun prérequis.",
    tp: "Plus de 60 % d'activités participatives : mapping, études de cas, simulations, audit et feuille de route.",
    outils: ["Canvas d'adoption IA", "Matrice de risques", "Cas d'usage sectoriels", "Référentiels RGPD et AI Act"]
  },
  'chatgpt-prise-en-main': {
    jours: [
      {
        titre: "Comprendre, expérimenter et cadrer ChatGPT",
        modules: [
          { titre: "Comprendre l'IA générative", points: ["Repères historiques", "Fonctionnement simplifié", "Domaines d'application", "Classification des outils"] },
          { titre: "Éthique et limites", points: ["Ressources et droits d'auteur", "Rapport à la vérité", "Hallucinations et deepfakes", "Confidentialité des données"] },
          { titre: "Produire de meilleurs résultats", points: ["Scénario contextualisé", "Instructions précises", "Itérations et comparaison", "Charte d'utilisation en entreprise"] }
        ],
        atelier: "Rédiger en groupe un scénario professionnel complexe, améliorer les réponses puis formaliser les règles d'usage."
      }
    ],
    public: "Tout professionnel souhaitant comprendre le potentiel de ChatGPT et l'utiliser dans son activité.",
    prerequis: "Aucun prérequis particulier.",
    tp: "Démonstrations, expérimentation des limites et deux cas pratiques de prompting professionnel.",
    outils: ["ChatGPT", "Microsoft Copilot en démonstration", "Grille de conception de prompt", "Modèle de charte IA"]
  },
  'ia-generative-managers': {
    jours: [
      {
        titre: "Fondamentaux des technologies d'IA",
        modules: [
          { titre: "Panorama technique accessible", points: ["Algorithmes, machine learning et deep learning", "Réseaux de neurones, NLP et vision", "LLM, Transformers et modèles de fondation", "Multimodalité et RAG"] },
          { titre: "Enjeux pour l'entreprise", points: ["Évolution des usages", "Opportunités d'automatisation", "Données et qualité", "Attentes et objectifs des participants"] }
        ],
        atelier: "Analyser des cas d'usage et relier chaque besoin à une famille de technologies."
      },
      {
        titre: "Outils, prompting et maîtrise des limites",
        modules: [
          { titre: "Comparer les outils", points: ["ChatGPT, Gemini, Claude, Llama et Mistral", "Performance, coût et transparence", "Interfaces de chat et playgrounds"] },
          { titre: "Personnaliser les usages", points: ["Zero-shot et few-shot", "Chaînage et raisonnement guidé", "Intégration aux processus métier"] },
          { titre: "Risques", points: ["Biais et hallucinations", "Explicabilité", "Propriété intellectuelle", "Sécurité et données sensibles"] }
        ],
        atelier: "Construire et comparer des prompts appliqués à plusieurs processus de l'organisation."
      },
      {
        titre: "Stratégie d'adoption et déploiement",
        modules: [
          { titre: "Choisir les opportunités", points: ["Analyse des activités", "Travail remplacé, complété ou assisté", "Valeur et risques", "Priorisation"] },
          { titre: "Organiser le déploiement", points: ["Étapes, responsabilités et ressources", "Intégration aux processus", "Formation et gestion des talents", "Communication et résistances"] }
        ],
        atelier: "Étudier une adoption réussie puis construire un scénario de déploiement et de conduite du changement."
      },
      {
        titre: "Pilotage, réglementation et gouvernance",
        modules: [
          { titre: "Mesurer la performance", points: ["KPI et impact", "Suivi et amélioration continue", "Retour sur investissement"] },
          { titre: "Adopter de façon responsable", points: ["Éthique et réglementation", "AI Act et RGPD", "Gouvernance des données et modèles", "Décisions appuyées par l'IA"] }
        ],
        atelier: "Définir les indicateurs, arbitrer un cas sensible et présenter une feuille de route de gouvernance IA."
      }
    ],
    public: "Managers, leaders, professionnels de la stratégie, de l'innovation et de la conduite du changement.",
    prerequis: "Expérience en management ou leadership et compréhension générale des processus de l'entreprise.",
    tp: "Études de cas, ateliers de réflexion, simulations de changement et exercices de décision.",
    outils: ["ChatGPT", "Gemini", "Claude", "Mistral", "Canvas stratégique", "Tableau de KPI", "Référentiels AI Act et RGPD"]
  },
  'ia-product-owner': {
    jours: [
      {
        titre: "Fondamentaux IA pour Product Owners",
        modules: [
          { titre: "Comprendre et évaluer", points: ["Familles de modèles et cas d'usage", "Capacités et limites", "Données, biais, sécurité et gouvernance", "Valeur et faisabilité d'une opportunité IA"] },
          { titre: "Cadrer une fonctionnalité", points: ["Workflow données, modèle, intégration et UX", "Place de l'humain et gestion de l'incertitude", "Critères d'acceptation adaptés", "Risques et métriques produit"] }
        ],
        atelier: "Transformer un besoin en user story IA complète, réaliste et testable avec ses critères d'acceptation."
      }
    ],
    public: "Product Owners débutants, chefs de projet et personnes impliquées dans la conception fonctionnelle d'un produit numérique.",
    prerequis: "Connaître la gestion de produit et les principes clés de l'IA au niveau grand public.",
    tp: "Analyse d'un backlog, sélection d'une opportunité et rédaction d'une user story IA.",
    outils: ["Backlog produit", "Canevas de cadrage IA", "User stories", "Critères d'acceptation", "Matrice valeur/faisabilité"]
  },
  'ia-gestion-projet': {
    jours: [
      {
        titre: "Comprendre l'IA et ses usages en gestion de projet",
        modules: [
          { titre: "Introduction à l'IA", points: ["Définitions et exemples", "IA, automatisation et robotisation", "Usages quotidiens et professionnels"] },
          { titre: "Cas d'usage projet", points: ["Planification et suivi", "Reporting et communication", "IA dans Outlook, Teams, Notion et Trello"] }
        ],
        atelier: "Explorer Notion AI ou ClickUp AI et générer le plan d'un projet simple."
      },
      {
        titre: "Automatiser, collaborer et adopter les bonnes pratiques",
        modules: [
          { titre: "Assistance au pilotage", points: ["Comptes rendus automatiques", "Suivi des tâches et alertes", "Résumés de réunions", "Communication projet"] },
          { titre: "Limites et adoption", points: ["Biais et erreurs", "Confidentialité", "Validation humaine", "Accompagnement du changement"] }
        ],
        atelier: "Créer un mini-projet assisté par IA couvrant planification, suivi, compte rendu et restitution."
      }
    ],
    public: "Chefs de projet débutants ou non techniques, collaborateurs projet, responsables RH et professionnels curieux des usages de l'IA.",
    prerequis: "Aucun prérequis technique ; connaître les bases du cycle de vie, de la planification et du suivi de projet.",
    tp: "Deux ateliers guidés et un mini-projet présenté au groupe.",
    outils: ["Notion AI ou ClickUp AI", "Microsoft Copilot", "Teams ou Outlook", "Outil de transcription de réunion"]
  },
  'ia-ressources-humaines': {
    jours: [
      {
        titre: "Mettre l'IA générative au service des RH",
        modules: [
          { titre: "Contexte et cas d'usage", points: ["Transformation numérique des RH", "Recrutement et rédaction d'offres", "Administration, paie et absences", "Talents, formation, GPEC et chatbots RH"] },
          { titre: "Prompt engineering RH", points: ["Fiches de poste et analyse de CV", "Vocabulaire inclusif", "Questions non discriminantes", "Confidentialité et itération"] },
          { titre: "Feuille de route", points: ["Priorisation, budget et calendrier", "Charte interne", "Gestion des risques et validation", "Formation des équipes et accompagnement"] }
        ],
        atelier: "Optimiser une offre, analyser des candidatures fictives, produire un script d'entretien et débattre des biais algorithmiques."
      }
    ],
    public: "Assistants et gestionnaires RH, managers et responsables de processus RH.",
    prerequis: "Maîtriser les outils bureautiques et connaître les bases de la gestion RH ou avoir suivi une acculturation à l'IA.",
    tp: "Cas pratiques de recrutement, automatisation RH, réflexion éthique et construction d'un plan d'action.",
    outils: ["Assistant IA générative", "Grille d'analyse de CV", "Modèle de charte", "Matrice de risques RGPD", "Canevas de feuille de route"]
  },
  'ia-communication-marketing': {
    jours: [
      {
        titre: "Fondamentaux des IA génératives",
        modules: [
          { titre: "Technologies et modèles", points: ["Machine learning, deep learning et NLP", "LLM, Transformers et RAG", "Voix, image et multimodalité"] },
          { titre: "Écosystème", points: ["ChatGPT, Gemini, Claude, Llama et Mistral", "Performance, fonctionnalités, coût et transparence", "Interfaces et playgrounds"] }
        ],
        atelier: "Comparer les modèles et produire une première série de contenus sur un brief commun."
      },
      {
        titre: "Prompting, processus et maîtrise des risques",
        modules: [
          { titre: "Personnaliser les résultats", points: ["Instructions, ton et structure", "Zero-shot et few-shot", "Chaînage et itérations", "Intégration au workflow éditorial"] },
          { titre: "Valider les productions", points: ["Biais et hallucinations", "Transparence", "Droits d'auteur et données personnelles", "Sécurité et modération"] }
        ],
        atelier: "Créer une grille de prompts réutilisables et une checklist de validation éditoriale."
      },
      {
        titre: "Applications marketing et communication",
        modules: [
          { titre: "Création et personnalisation", points: ["Slogans, titres, réseaux sociaux et emails", "Scripts vidéo et podcast", "Plans de communication", "Segmentation et parcours clients"] },
          { titre: "Veille et production multimédia", points: ["Analyse des tendances et de la concurrence", "Images, voix, vidéo et présentations", "Mesure de la pertinence et de l'engagement"] }
        ],
        atelier: "Concevoir une campagne complète, personnaliser les contenus, produire une veille et améliorer les résultats après revue."
      }
    ],
    public: "Professionnels du marketing et de la communication, stratèges de contenu, créateurs et responsables de communication.",
    prerequis: "Connaître les bases du marketing et de la communication et savoir conceptualiser une stratégie de contenu.",
    tp: "Ateliers de contenu, personnalisation, veille concurrentielle et campagne marketing fil rouge.",
    outils: ["ChatGPT, Gemini, Claude ou Mistral", "Outil de génération d'images", "Outil de voix ou vidéo", "Outil de présentation", "Grille de validation éditoriale"]
  }
};

const commonMethods = [
  "Alternance d'apports ciblés, de démonstrations et de mises en pratique contextualisées",
  "Progression structurée avec exercices, études de cas ou projet fil rouge",
  "Supports numériques et ressources de référence remis aux participants"
];

const commonEvaluation = [
  "Positionnement initial et recueil des attentes",
  "Évaluation continue au moyen de questions, exercices, QCM et mises en situation",
  "Validation des acquis en fin de parcours et bilan individuel"
];

const programComplements = {
  'programmation-objet': { prerequis: "Connaître les bases de la programmation structurée.", outils: ["UML", "Java ou Python", "Visual Studio Code ou IntelliJ", "Git", "Assistant IA générative"] },
  'uml': { prerequis: "Connaître les principes généraux d'un projet logiciel ; une première expérience de développement est utile.", outils: ["Notation UML 2", "Outil de modélisation UML", "Études de cas métier"] },
  'bases-donnees': { prerequis: "Aucun prérequis en base de données ; une culture informatique générale est recommandée.", outils: ["SGBDR", "Modèle conceptuel et logique", "SQL", "Outil de modélisation"] },
  'sql': { prerequis: "Connaître les principes d'une base de données relationnelle et savoir utiliser un poste informatique.", outils: ["SQL standard", "Oracle, PostgreSQL, MySQL ou SQL Server", "Client SQL"] },
  'java-fondamentaux': { prerequis: "Connaître la logique de programmation et les notions de variables, conditions, boucles et fonctions.", outils: ["JDK", "IntelliJ IDEA ou Visual Studio Code", "JDBC", "API Collections et Stream", "Git"] },
  'java-avance': { prerequis: "Maîtriser la syntaxe Java, la programmation objet, les exceptions et les collections.", outils: ["JDK", "JVM", "JDBC/JPA", "NIO.2", "Maven ou Gradle", "Outils de diagnostic"] },
  'java-8': { prerequis: "Développer couramment en Java et connaître les collections.", outils: ["Java 8", "Expressions lambda", "API Stream", "API Date & Time"] },
  'java-11-17': { prerequis: "Maîtriser Java 8 et disposer d'une expérience de développement d'applications Java.", outils: ["JDK 11 et 17", "JPMS", "Records", "Classes scellées", "IDE Java"] },
  'junit': { prerequis: "Savoir développer en Java et connaître les bases de la programmation objet.", outils: ["JUnit 5", "Maven ou Gradle", "IDE Java", "Outil de couverture", "Chaîne CI"] },
  'javafx': { prerequis: "Maîtriser les fondamentaux de Java et de la programmation objet.", outils: ["JavaFX", "FXML", "Scene Builder", "CSS", "API concurrentes Java"] },
  'certification-java-8-niveau-1': { prerequis: "Connaître les fondamentaux de Java SE 8 et pratiquer régulièrement le langage.", outils: ["Java SE 8", "QCM d'entraînement", "Examens blancs"] },
  'certification-java-8-niveau-2': { prerequis: "Avoir le niveau Associate Java SE 8 ou une expérience équivalente.", outils: ["Java SE 8", "API avancées", "QCM chronométrés", "Examens blancs"] },
  'certification-java-11-partie-1': { prerequis: "Posséder de bonnes bases en Java et une expérience pratique de Java SE.", outils: ["Java SE 11", "Référentiel 1Z0-819", "QCM", "Exercices de code"] },
  'certification-java-11-partie-2': { prerequis: "Avoir suivi la première partie ou maîtriser les thèmes Java 11 correspondants.", outils: ["Java SE 11", "Référentiel 1Z0-819", "Simulations d'examen"] },
  'tdd': { prerequis: "Maîtriser un langage de programmation et savoir écrire des tests unitaires simples.", outils: ["Framework de test adapté au langage", "IDE", "Outil de couverture", "Intégration continue"] },
  'git': { prerequis: "Savoir utiliser la ligne de commande et connaître l'organisation générale d'un projet logiciel.", outils: ["Git", "GitLab ou GitHub", "Terminal", "Outil de comparaison"] },
  'figma': { prerequis: "Être à l'aise avec un navigateur et les principes élémentaires d'une interface numérique.", outils: ["Figma", "FigJam", "Auto Layout", "Composants et variants", "Prototypage interactif"] },
  'figma-perfectionnement': { prerequis: "Utiliser déjà Figma et savoir créer des composants, des prototypes et des mises en page Auto Layout.", outils: ["Figma", "Variables et design tokens", "Dev Mode", "Bibliothèques partagées", "Plugins IA"] },
  'photoshop': { prerequis: "Aucun prérequis graphique ; être à l'aise avec l'environnement informatique.", outils: ["Adobe Photoshop", "Calques et masques", "Outils de sélection", "Filtres", "Formats d'export"] },
  'langage-c': { prerequis: "Connaître les principes de base de la programmation et de l'algorithmique.", outils: ["Compilateur C", "Éditeur ou IDE", "Débogueur", "Norme ANSI C", "Outils d'analyse mémoire"] },
  'cpp': { prerequis: "Connaître les bases de la programmation ; une pratique du langage C facilite la progression.", outils: ["Compilateur C++", "STL", "Débogueur", "Pointeurs intelligents", "CMake ou outil de build"] },
  'panorama-technologies-informatiques': { prerequis: "Aucun prérequis technique.", outils: ["Schémas d'architecture", "Démonstrations systèmes et réseaux", "Exemples Web, API et mobile"] },
  'ia-booster-performances': { prerequis: "Connaître les bases de la programmation et de la conception d'applications.", outils: ["GitHub Copilot", "VS Code", "Assistants IA de code", "Git secrets ou Gitleaks", "Pipeline CI/CD"] },
  'ia-code-assiste': { prerequis: "Pratiquer au moins un langage de programmation et savoir utiliser un IDE.", outils: ["Assistant IA de code", "IDE", "Framework de tests", "Git"] }
};

Object.entries(programs).forEach(([slug, program]) => {
  Object.assign(program, {
    methodes: commonMethods,
    evaluation: commonEvaluation,
    ...programComplements[slug]
  });
});

const modal = document.getElementById('programModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocusedElement = null;

function renderList(items, className = '') {
  if (!items?.length) return '';
  return `<ul${className ? ` class="${className}"` : ''}>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function renderSection(title, content) {
  if (!content || (Array.isArray(content) && !content.length)) return '';
  return `<section class="modal-section"><h4>${title}</h4>${Array.isArray(content) ? renderList(content) : `<p>${content}</p>`}</section>`;
}

function renderDay(day, index) {
  if (typeof day === 'string') {
    return `<article class="modal-day"><h5>Jour ${index + 1}</h5><p>${day}</p></article>`;
  }

  const modules = day.modules?.map((module) => `
    <div class="modal-module">
      <h6>${module.titre}</h6>
      ${renderList(module.points)}
    </div>
  `).join('') || '';

  return `
    <article class="modal-day">
      <h5>Jour ${index + 1}${day.titre ? ` — ${day.titre}` : ''}</h5>
      ${modules}
      ${day.atelier ? `<p class="modal-workshop"><strong>Atelier :</strong> ${day.atelier}</p>` : ''}
    </article>
  `;
}

function buildModalBody(program) {
  const days = program.jours.map(renderDay).join('');
  return `
    ${renderSection('Objectifs pédagogiques', program.objectifs)}
    ${renderSection('Public concerné', program.public)}
    ${renderSection('Prérequis', program.prerequis)}
    <section class="modal-section">
      <h4>Programme jour par jour</h4>
      <div class="modal-days">${days}</div>
    </section>
    ${renderSection('Travaux pratiques', program.tp)}
    ${renderSection('Outils et technologies', program.outils)}
    ${renderSection('Méthodes pédagogiques', program.methodes)}
    ${renderSection('Évaluation des acquis', program.evaluation)}
  `;
}


function openModal(trainingButton) {
  const slug = trainingButton.getAttribute('data-training');
  const program = programs[slug];
  if (!program) return;

  const section = trainingButton.closest('.training');
  const title = section.querySelector('h3').textContent;
  const meta = section.querySelector('.training-meta').textContent;
  const objectives = Array.from(section.querySelectorAll('.training-objectives li'), (item) => item.textContent);

  modalTitle.textContent = title;
  modalMeta.textContent = meta;
  modalBody.innerHTML = buildModalBody({ ...program, objectifs: program.objectifs || objectives });

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

