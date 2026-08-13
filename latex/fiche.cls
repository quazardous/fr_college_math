% =====================================================================
%  fiche.cls — fiches de révision de mathématiques, collège (6e / 5e)
%
%  Le vocabulaire des rubriques suit celui des programmes officiels :
%  « Automatismes », « Objectifs d'apprentissage », « Prolongements
%  possibles ». La seule couche éditoriale ajoutée est l'indice de
%  priorité, explicitement signalé comme tel.
%
%  AUCUNE valeur de style ici : polices, tailles, couleurs et marges
%  viennent de design.yaml, traduit en latex/design.tex par
%  tools/design.mjs. Modifier le YAML, pas ce fichier.
%
%  Moteur : XeLaTeX  (./build.sh)
% =====================================================================
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{fiche}[2026/08/13 Fiche de revision mathematiques college]
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax
\LoadClass[11pt,a4paper]{article}

% ---------------------------------------------------------------- paquets
\RequirePackage{fontspec}
\RequirePackage{unicode-math}
\RequirePackage[french]{babel}
\frenchsetup{StandardLists=true}
\RequirePackage{microtype}
\RequirePackage{geometry}
\RequirePackage[table]{xcolor}
\RequirePackage{graphicx}
\RequirePackage{array,tabularx,multirow}
\RequirePackage{enumitem}
\RequirePackage{multicol}
\RequirePackage[most]{tcolorbox}
\tcbuselibrary{skins,breakable}
\RequirePackage{tikz}
\usetikzlibrary{calc,angles,quotes,patterns,arrows.meta,positioning,
                decorations.pathreplacing,shapes.geometric,through}
\RequirePackage{cancel}
\RequirePackage{qrcode}
\RequirePackage{fancyhdr}
\RequirePackage{lastpage}
\RequirePackage{titlesec}
\RequirePackage{needspace}
\RequirePackage[hidelinks]{hyperref}

% ---------------------------------------------------------------- jetons de design
\input{design.tex}          % engendré depuis design.yaml
\RequirePackage{figures}    % figures récurrentes (utilise les couleurs ci-dessus)

\color{encre}
\setlength{\parindent}{0pt}
\linespread{1.05}
\setlist{topsep=0.4ex,itemsep=0.35ex,parsep=0pt,leftmargin=4.6mm}
\renewcommand{\labelitemi}{\textcolor{accent}{\rule[0.28ex]{1.05mm}{1.05mm}}}
\setlength{\tabcolsep}{2.3mm}
\renewcommand{\arraystretch}{1.26}

% ---------------------------------------------------------------- métadonnées
\newcommand{\@surtitre}{}   \newcommand{\surtitre}[1]{\renewcommand{\@surtitre}{#1}}
\newcommand{\@titrefiche}{} \newcommand{\titrefiche}[1]{\renewcommand{\@titrefiche}{#1}}
\newcommand{\@accroche}{}   \newcommand{\accroche}[1]{\renewcommand{\@accroche}{#1}}
\newcommand{\@niveaux}{}    \newcommand{\niveaux}[1]{\renewcommand{\@niveaux}{#1}}
\newcommand{\@pourquoi}{}   \newcommand{\pourquoi}[1]{\renewcommand{\@pourquoi}{#1}}
\newcommand{\@domaine}{}    \newcommand{\domaine}[1]{\renewcommand{\@domaine}{#1}}
\newcommand{\@duree}{}      \newcommand{\duree}[1]{\renewcommand{\@duree}{#1}}
\newcommand{\@priorite}{2}  \newcommand{\priorite}[1]{\renewcommand{\@priorite}{#1}}
% Nom court du document, porté par le pied de page de toutes les pages.
\newcommand{\@nomcourt}{}  \newcommand{\nomcourt}[1]{\renewcommand{\@nomcourt}{#1}}
% Version du document, déclarée dans l'en-tête YAML de la source. Elle
% s'affiche en page 1, à la place du nom court — lequel n'y ferait que
% répéter le grand titre.
\newcommand{\@versiondoc}{} \newcommand{\versiondoc}[1]{\renewcommand{\@versiondoc}{#1}}

\newcommand{\couleurpriorite}{%
  \ifnum\@priorite=3 prioritetrois\else\ifnum\@priorite=2 prioritedeux\else prioriteun\fi\fi}
\newcommand{\motpriorite}{%
  \ifnum\@priorite=3 Incontournable\else\ifnum\@priorite=2 Important\else Complément\fi\fi}

% Jauge de priorité : trois pastilles, remplies jusqu'au niveau atteint.
\newcommand{\jaugecoul}[2]{%
  \tikz[baseline=-0.32ex]{%
    \foreach \i in {1,2,3}{%
      \ifnum\i>#2
        \draw[#1,line width=0.22mm] ({(\i-1)*1.6mm},0) circle (0.52mm);
      \else
        \fill[#1] ({(\i-1)*1.6mm},0) circle (0.66mm);
      \fi}}}
\newcommand{\jauge}{\jaugecoul{\couleurpriorite}{\@priorite}}

% Jauge à nombre de crans libre : \jaugen{couleur}{atteint}{total}
\newcommand{\jaugen}[3]{%
  \tikz[baseline=-0.32ex]{%
    \foreach \i in {1,...,#3}{%
      \ifnum\i>#2
        \draw[#1,line width=0.22mm] ({(\i-1)*1.6mm},0) circle (0.52mm);
      \else
        \fill[#1] ({(\i-1)*1.6mm},0) circle (0.66mm);
      \fi}}}

% Couleur associée à une difficulté de 1 à 5.
\newcommand{\couleurdifficulte}[1]{%
  \ifnum#1>3 prioritetrois\else\ifnum#1>1 prioritedeux\else prioriteun\fi\fi}

% ---------------------------------------------------------------- en-tête / pied
% Le nom du document est en pied de page, donc présent dès la page 1 —
% qui n'a pas d'en-tête. L'en-tête des pages suivantes ne reprend donc que
% la jauge de priorité et le niveau, pour ne rien afficher deux fois.
\newcommand{\piedgauche}{%
  \sffamily\fsPiedPage\color{encredouce}%
  \ifx\@nomcourt\empty\@titrefiche\else\@nomcourt\fi}
\newcommand{\pieddroit}{%
  \sffamily\fsPiedPage\color{encredouce}\thepage\,/\,\pageref{LastPage}}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\fancyhead[L]{\sffamily\fsEntetePage\color{encredouce}\jauge}
\fancyhead[R]{\sffamily\fsEntetePage\color{encredouce}\@niveaux}
\fancyfoot[L]{\piedgauche}
\fancyfoot[R]{\pieddroit}

% Page 1 : le titre s'affiche déjà en grand dans le cartouche, inutile de le
% répéter en pied. Le nom court sert à identifier une feuille détachée, donc
% seulement à partir de la page 2.
\newcommand{\piedversion}{%
  \sffamily\fsPiedPage\color{encredouce}%
  \ifx\@versiondoc\empty\else version~\@versiondoc\fi}

\fancypagestyle{premiere}{%
  \fancyhf{}\renewcommand{\headrulewidth}{0pt}%
  \fancyfoot[L]{\piedversion}%
  \fancyfoot[R]{\pieddroit}}

% ---------------------------------------------------------------- cartouche de tête
\newcommand{\etiquette}[1]{%
  {\sffamily\fsEtiquette\bfseries\color{encredouce}\MakeUppercase{#1}\par\vspace{0.6mm}}}

\newcommand{\entetefiche}{%
  \thispagestyle{premiere}%
  {\color{accent}\rule{\linewidth}{\filetsection}}\par\vspace{2.4mm}
  {\sffamily\fsSurtitre\bfseries\color{accent}\MakeUppercase{\@surtitre}\par}
  \vspace{1.4mm}
  {\sffamily\fsTitreFiche\bfseries\@titrefiche\par}
  \ifx\@accroche\empty\else
    \vspace{1.6mm}{\fsAccroche\color{encredouce}\@accroche\par}\fi
  \vspace{3.2mm}
  \begin{tcolorbox}[enhanced,sharp corners,boxrule=0.4pt,colframe=trait,colback=white,
                    left=0mm,right=0mm,top=1.8mm,bottom=1.8mm]
    \noindent
    \begin{tabular}{@{\hspace{3mm}}>{\raggedright\arraybackslash}p{0.345\linewidth}@{\hspace{2.6mm}}!{\color{traitfin}\vrule}@{\hspace{2.6mm}}>{\raggedright\arraybackslash}p{0.105\linewidth}@{\hspace{2.6mm}}!{\color{traitfin}\vrule}@{\hspace{2.6mm}}>{\raggedright\arraybackslash}p{0.115\linewidth}@{\hspace{2.6mm}}!{\color{traitfin}\vrule}@{\hspace{2.6mm}}>{\raggedright\arraybackslash}p{0.235\linewidth}@{}}
      \etiquette{Priorité}
      {\jauge\hspace{1.8mm}\sffamily\fsCartoucheValeur\bfseries
       \color{\couleurpriorite}\MakeUppercase{\motpriorite}\par}
      \ifx\@pourquoi\empty\else
        \vspace{1mm}{\sffamily\fsCartouchePourquoi\color{encredouce}\@pourquoi\par}\fi
      &
      \etiquette{Niveau}{\sffamily\fsCartoucheValeur\bfseries\@niveaux\par}
      &
      \etiquette{Révision}{\sffamily\fsCartoucheValeur\bfseries\@duree\par}
      &
      \etiquette{Domaine}{\sffamily\fsCartoucheDomaine\bfseries\@domaine\par}
    \end{tabular}
  \end{tcolorbox}
  \vspace{1.6mm}}

% ---------------------------------------------------------------- titres
\titleformat{\section}
  {\needspace{4\baselineskip}\sffamily\fsSection\bfseries\color{encre}}
  {\thesection.}{2.2mm}{}[{\vspace{0.5mm}\color{accent}\titlerule[\filetsection]}]
\titlespacing*{\section}{0pt}{5mm plus 1mm minus 1mm}{2mm}

\titleformat{\subsection}
  {\needspace{3\baselineskip}\sffamily\fsSousSection\bfseries\color{accent}}
  {\thesubsection}{2mm}{}
\titlespacing*{\subsection}{0pt}{3.2mm plus 0.8mm}{1mm}

% ---------------------------------------------------------------- rubriques officielles
% « Automatismes » : terme du programme désignant ce que l'élève doit
% restituer de manière automatique.
\newtcolorbox{boiteautomatismes}{%
  breakable,enhanced,sharp corners,
  colback=prioritetroisfond,colframe=prioritetrois,boxrule=0.9pt,
  colbacktitle=prioritetrois,coltitle=white,
  left=3.2mm,right=3.2mm,top=2.4mm,bottom=2.6mm,
  toptitle=1.1mm,bottomtitle=1.1mm,lefttitle=3.2mm,
  title={\sffamily\fsAutomatismesTitre\bfseries\MakeUppercase{Automatismes}%
    \normalfont\sffamily\fsAutomatismesSoustitre
    \hspace{2mm}— à restituer immédiatement, sans poser de calcul}}

\newenvironment{automatismes}[1][2]
  {\begin{boiteautomatismes}\fsAutomatismesCorps\raggedright\setlength{\parskip}{0pt}%
   \begin{multicols}{#1}\begin{itemize}[leftmargin=4mm,itemsep=0.55ex,topsep=0pt]}
  {\end{itemize}\end{multicols}%
   \par\vspace{1.4mm}{\color{prioritetrois}\rule{\linewidth}{0.3pt}}\par\vspace{1mm}
   {\sffamily\fsBadgeSource\color{encredouce}%
    \textbf{6\ieme{}} ou \textbf{5\ieme{}} : niveau auquel l'attendu figure au programme.
    \quad \textbf{Règle} : formulation de synthèse.\par}
   \end{boiteautomatismes}}

% \auto[niveau]{contenu}
\newcommand{\srcbadge}[1]{%
  \hspace{0.5mm}\raisebox{0.12ex}{\colorbox{traitfin}{%
    \sffamily\fsBadgeSource\bfseries\color{encredouce}%
    \hspace{0.2mm}\MakeUppercase{#1}\hspace{0.2mm}}}}
\newcommand{\auto}[2][]{\item #2\if\relax\detokenize{#1}\relax\else\srcbadge{#1}\fi}

% ---------------------------------------------------------------- encadrés
% `before upper` doit rétablir explicitement la taille du corps :
% \normalfont ne restaure que la famille, pas la taille.
\newcommand{\enteteencart}[2]{%
  \sffamily\fsEncartEtiquette\bfseries\color{#2}\MakeUppercase{#1}\par
  \vspace{1mm}\normalfont\fsEncartCorps\color{encre}}

\newtcolorbox{retenir}[1][À retenir]{breakable,enhanced,sharp corners,
  colback=prioritetroisfond,colframe=prioritetroisfond,boxrule=0pt,
  borderline west={\filetencart}{0pt}{prioritetrois},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.2mm,
  before upper={\enteteencart{#1}{prioritetrois}}}

\newtcolorbox{methode}[1][Méthode]{breakable,enhanced,sharp corners,
  colback=accentclair,colframe=accentclair,boxrule=0pt,
  borderline west={\filetencart}{0pt}{accent},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.2mm,
  before upper={\enteteencart{#1}{accent}}}

\newtcolorbox{piege}[1][Piège fréquent]{breakable,enhanced,sharp corners,
  colback=prioritedeuxfond,colframe=prioritedeuxfond,boxrule=0pt,
  borderline west={\filetencart}{0pt}{prioritedeux},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.2mm,
  before upper={\enteteencart{#1}{prioritedeux}}}

\newtcolorbox{definition}[1][Définition]{breakable,enhanced,sharp corners,
  colback=white,colframe=trait,boxrule=0.4pt,
  borderline west={\filetencart}{0pt}{encre},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.2mm,
  before upper={\enteteencart{#1}{encre}}}

% « Prolongements possibles » : rubrique officielle du programme.
\newtcolorbox{prolongement}[1][Prolongements possibles]{breakable,enhanced,sharp corners,
  colback=prioriteunfond,colframe=prioriteunfond,boxrule=0pt,
  borderline west={\filetencart}{0pt}{prioriteun},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.2mm,
  before upper={\enteteencart{#1}{prioriteun}}}

% ---------------------------------------------------------------- problèmes
% \enteteprobleme{numéro}{titre}{difficulté 1-5}{durée}{notions}
\newcommand{\enteteprobleme}[5]{%
  \needspace{6\baselineskip}%
  \par\vspace{4mm}%
  {\color{accent}\rule{\linewidth}{\filetsection}}\par\vspace{1.8mm}%
  {\sffamily\fsSurtitre\bfseries\color{accent}\MakeUppercase{Problème~#1}\par}%
  \vspace{0.8mm}%
  {\sffamily\fsSection\bfseries #2\par}%
  \vspace{1.4mm}%
  {\sffamily\fsBadgeSource\color{encredouce}%
    \jaugen{\couleurdifficulte{#3}}{#3}{5}\hspace{1.6mm}%
    \textbf{difficulté #3/5}\quad·\quad #4\quad·\quad #5\par}%
  \vspace{1.6mm}%
  \par}

% ---------------------------------------------------------------- exercices
\newcounter{exo}
\newtcolorbox[use counter=exo]{exo}[1][]{%
  breakable,enhanced,sharp corners,
  colback=white,colframe=trait,boxrule=0.4pt,
  borderline west={\filetencart}{0pt}{accent},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.4mm,
  before upper={%
    \sffamily\fsEncartEtiquette\bfseries\color{accent}%
    \MakeUppercase{Exercice~\theexo}%
    \if\relax\detokenize{#1}\relax\else
      \normalfont\sffamily\fsBadgeSource\color{encredouce}\hspace{2mm}#1\fi
    \par\vspace{1.2mm}\normalfont\fsEncartCorps\color{encre}}}

% Espace de rédaction : des lignes pointillées pour écrire à la main.
\newcommand{\lignes}[1][3]{%
  \par\vspace{1.4mm}%
  \foreach \n in {1,...,#1}{%
    \textcolor{trait}{\rule[-0.6ex]{\linewidth}{0.35pt}}\par\vspace{4.4mm}}}

\newtcolorbox{solution}[1][]{breakable,enhanced,sharp corners,
  colback=prioriteunfond,colframe=prioriteunfond,boxrule=0pt,
  borderline west={\filetencart}{0pt}{prioriteun},
  left=3.2mm,right=3mm,top=2.2mm,bottom=2.2mm,
  before upper={\sffamily\fsEncartEtiquette\bfseries\color{prioriteun}%
    \MakeUppercase{Corrigé\if\relax\detokenize{#1}\relax\else~#1\fi}\par
    \vspace{1mm}\normalfont\fsEncartCorps\color{encre}}}

% ---------------------------------------------------------------- tableaux
% Types de colonnes maison : toutes de type « p », donc toutes alignées
% en haut. Mélanger `l` et `X` désaligne la ligne d'en-tête.
\newcolumntype{G}[1]{>{\raggedright\arraybackslash}p{#1}}   % largeur fixe
\newcolumntype{Y}{>{\raggedright\arraybackslash}X}          % extensible
\newcolumntype{Z}{>{\centering\arraybackslash}X}            % extensible centrée
\newcommand{\entetecell}[1]{\sffamily\fsTableauEntete\bfseries\color{white}#1}
\newcommand{\ligneentete}{\rowcolor{accent}}
\newenvironment{tableaufiche}[1]
  {\par\vspace{0.6mm}\noindent\fsTableau\rowcolors{2}{fondtendre}{white}%
   \tabularx{\linewidth}{#1}}
  {\endtabularx\par\vspace{1.2mm}}

% ---------------------------------------------------------------- vidéos
\newenvironment{videos}
  {\needspace{6\baselineskip}\par\vspace{2mm}
   {\sffamily\fsSection\bfseries\color{encre}Regarder la leçon\par}
   \vspace{0.5mm}{\color{accent}\rule{\linewidth}{\filetsection}}\par\vspace{1.4mm}
   {\fsEncartCorps Scanne un QR code avec l'appareil photo du téléphone.
    Vidéos courtes, choisies sur des chaînes de référence.\par}\vspace{1.2mm}\par\noindent}
  {\par}

% \video{identifiant}{titre}{chaîne}{durée}{vues}
\newcommand{\video}[5]{%
  \begin{tcolorbox}[enhanced,sharp corners,boxrule=0.4pt,colframe=trait,
      colback=white,left=2.4mm,right=2.4mm,top=2.2mm,bottom=2.2mm,
      width=0.487\linewidth,box align=top,nobeforeafter,valign=center]
    \begin{minipage}[c]{16.5mm}\qrcode[height=16.5mm,level=M]{https://youtu.be/#1}\end{minipage}%
    \hspace{2.4mm}%
    \begin{minipage}[c]{\dimexpr\linewidth-19.8mm\relax}
      {\sffamily\fsVideoTitre\bfseries #2\par}
      \vspace{0.7mm}
      {\sffamily\fsVideoMeta\color{encredouce}#3 · #4 · #5 vues\par}
      \vspace{0.5mm}
      {\ttfamily\fsVideoLien\color{accent}youtu.be/\detokenize{#1}\par}
    \end{minipage}
  \end{tcolorbox}\hfill}

% ---------------------------------------------------------------- divers
% Pastille de niveau. L'argument est le chiffre seul : \niv{5}.
% Trois teintes de l'accent, de la plus claire (6e) à la plus dense (4e) :
% l'échelle est ordonnée mais reste distincte de celle des priorités, pour
% que le niveau et l'importance ne se disputent pas la lecture.
\newcommand{\pastilleniveau}[3]{%
  \raisebox{0.15ex}{\colorbox{#1}{%
    \sffamily\fsBadgeNiveau\bfseries\color{#2}%
    \hspace{0.4mm}#3\ieme{}\hspace{0.4mm}}}}
\newcommand{\niv}[1]{%
  \ifnum#1=4 \pastilleniveau{accent}{white}{#1}%
  \else\ifnum#1=5 \pastilleniveau{accentmoyen}{accent}{#1}%
  \else \pastilleniveau{accentclair}{accent}{#1}\fi\fi}
\newcommand{\motcle}[1]{\textbf{#1}}
\newcommand{\separateur}{\par\vspace{1.2mm}{\color{trait}\rule{\linewidth}{0.4pt}}\par\vspace{1mm}}
\newcommand{\fleche}{\ensuremath{\rightarrow}}

\AtBeginDocument{\fsCorps}

\endinput
