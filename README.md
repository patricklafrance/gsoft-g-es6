=========================================
Setup pour le développement
=========================================

1- Setup de l'environnement

	** Je vous suggère fortement d'installer les tools suivants à l'aide de Chocolatey. Vous trouverez
	   les instructions pour installer Chocolatey à l'adresse suivante: https://chocolatey.org/

	a) Installer ANSICON. Pour le développement j'ai utilisé la version 1.6.6. ("choco install ansicon" ou https://github.com/adoxa/ansicon)
	b) Installer node-pac
		i) Ouvrir une console
		2) Aller dans le répertoire du projet JavaScript (par exemple C:\Dev\gsoft-g\Source\G\GSoft.G.Web.JavaScript)
		3) Lancer la commande "npm install pac@0.0.1 -g"
	c) Dans la même console, au même emplacement, lancer la commande "pac install" pour installer les packages Node nécessaire pour gsoft.js
	d) Rebuilder les packages node à l'aide de la commande "npm rebuild"
	e) Compiler gsoft.js (c'est à dire, rouler les outils de qualités JSHint et JSCS, les tests et créer les bundles) à l'aide de la commande "gulp"

	Les commandes en résumé:
		> cd C:\Dev\gsoft-g\Source\G\GSoft.G.Web.JavaScript
		> npm install pac@0.0.1 -g
		> pac install
		> npm rebuild
		> gulp

2- Setup de Visual Studio

	a) Ajouter une external command dans Visual Studio pour lancer Gulp
		i) ​    Aller dans Tools/External Tools
		ii)    Appuyer sur le bouton Add pour ajouter une nouvelle commande
		iii)   Entrer les informations suivantes:
				- Title: Gulp
				- Command: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
				- Arguments: .bin\node.cmd node_modules\gulp\bin\gulp.js --visual-studio
				- Initial directory: $(ProjectDir)​
				- Cocher Use Output window
		iv) ​   Assigner la commande externe au shortcut CTRL + SHIFT + M
				- Ouvrir le gestionnaire de shortcuts: Tools/Options/Environment/Keyboard.
			​	- Show command containing: Tools.ExternalCommand​.
				- Choisir la commande dont le chiffre à la fin correspond à la position de la commande Gulp dans votre liste de commande externe. Par exemple si ma commande externe est à la position 7, je vais choisir la commande Tools.ExternalCommand7.​
				- Dans la boîte Press shortcut keys saisir CTRL+SHIFT+M.
		v) ​Pour lancer la commande, sélectionner le GSoft.G.Web.JavaScript (ou un fichier du GSoft.G.Web.JavaScript) et taper CTRL+SHIFT+M.

=========================================
Installer un nouveau package Node
=========================================

1- Installer tous les packages en tant que devDependencies. La commande à utiliser est "npm install <package> --save-dev" ou "npm install <package>@<version> --save-dev".
2- Une fois votre package installé, il faut l'ajouter à node-pac, pour ce faire, lancer la commande "pac".

Les commandes en résumé:
	> cd C:\Dev\gsoft-g\Source\G\GSoft.G.Web.JavaScript
	> npm install <package> --save-dev
	> pac

=========================================
Supprimer un package Node
=========================================

1- Supprimer le package. La commande à utiliser est "npm uninstall <package>".
2- Supprimer le package de node-pac avec la commande "pac".

Les commandes en résumé:
	> cd C:\Dev\gsoft-g\Source\G\GSoft.G.Web.JavaScript
	> npm uninstall <package>
	> pac

=========================================
Pourquoi node-pac ?
=========================================

Un package Node installé à l'aide de NPM utilise une hiérarchie de répertoire dépassant rapidement la longueur maximum de 256 caractères pour le chemin 
d'un fichier sur Windows:

   /app
	  /node_modules
	     /module1
		    /dependency1
				/dependency1.1
				   /dependency1.1.1
				      /...

NPM gère bien ce type de hiérarchie car ils utilisent des paths UNC. Malheureusement ce n'est pas le cas de Git et TeamCity. Par conséquent il faut zipper les modules
et leur dépendence dans des fichiers tarballs.

NPM offre la commande "pack", sauf que "pack" n'inclus pas les dépendences du module dans le fichier tarball et NPM doit fetcher les dépendences à partir du serveur distant
de NPM ce qui créé une dépendence sur les serveurs distant de NPM, chose qu'on ne veut pas.

Par conséquent, node-pac est utilisé pour zipper les modules dans des fichiers tarballs puisque ce dernier inclus le module ainsi que l'ensemble de ses dépendences.