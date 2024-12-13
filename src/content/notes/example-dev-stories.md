title: Desiging DX strategy: my favourties success indicators KPIs how I describe them with developer stories

I consider Developer Experience as something that extends User Experience. Therefore I map and apply UX principles in Developer Experience. Because DX is ussability applied to developer env. While in UX we improve ussabilityt for users and clients. 

podonmie jak w UX prace prace nad developer experiece zaczynam od ustalenia strategii dla DX
dx strategy: A plan of actions designed to reach an improved future state of the organization's user experience over an established period of time
so first of all we need to have in mind this desired future state. 

we can describe this state with KPIs and stories: 
- Similar like in User Experinece we define user stories to work with, its valuable to define  developer storied when designing Developer Experience. 
- Similar like un UX , in DX we want to define DX KPIS: (Key Performance Indicators) are metrics that are collected and evaluated to measure the success of UX (here DX) activities.

So here are my recommended KPIs and favoirded developer stories describing them.  
I love to give as example whenerver I perform worhsops about developer experience.

# w ogole pod jakie srodiwisko, pod jaka przyszlosc projektu developer portal
strategia musi byc osadzona w jakies rzeczywistowsci. moglbym oamawiac terazniejszosc i wspolnczesne typowe problemy korporacji, ale to oferuje na warsztach z klientami, aby rozmawiac o ich potrzeach kontretnych. tutaj puszczam wodze fantazji i ekstrpoluje trendy aby pokzac Ci pod jaka przylosc ja bym rekomendowal projekowac developer portal, wierze ze zainsputuje Cie to do tego w jaki sposob mozesz organizowac prace zespolow IT w nowy sposob dzieki portalom developerskich 

to sa bardzo futurolgiczne przyklady ale przedstawiam je bo wierze ze pokazuja kierunek rozwoju oprogrwmoania,  dzis buduje infastukturew cyfrowa pod przyszle potrzeby. develoepr portale sa stosunkowo nowe, bo wyrazana potrzeba na nie zaznaczyla sie niedawno. aby nie wyzylac sie pokazuac jak maja sie do potrzeb terazniejszosci pozwalam sobie esktrapolowac trendy i pokazac jak moim zdaniem developer portale maja sie do przyszosci, lub do coraz czestrszuych sytiuacj gdzie przyszlosc zarysowyje sie juz dzis. 

musze po prostu troche przeyrsowac realia, wyekstrapolowac trendy dla ktorych powstalo i wokol ktorych rozwija sie developer expriece, bo w nich te principles maja jeszcze wiecej sensu i bedziesz mogl tez od razu projektowac nowoczesne rozwiaznaia pod wspolczneste problemy - futire-proof

futurologcznie:  wierze ze sztuczna inteligancja doprowadzi do takiego wzrostu wydajnosci tworzenia orprogramowania ze developerzy i zespolu przywiazane na stale do projektu, bedacy nosnuikami wewnetrznej wiedzy w fiermie, odejda do przeszlosci. role te zastapia developer portale, ktroe beda pelnily funkcje nosnikow wewn wiedzy i kultury organizacji

# onboarding on demands sinicators

## selfonbording time indcator: new dev requested for featyre
futurologcznie: w takim srodowisku developerzy beda porzebowali wdrazac sie sami, nie bedzie zespolu ktory ich omboarduje. beda mieli sztyczna inteligencje do analizy duzych ilosci kodu ale to developer portal pomoze im zrozumiec powiazania miedzy elementami systemu (software catalog) oraz odnalexc cala infastrukture na ktorej ten system stoi (integracje). 

story: drugi dzien w pracy. wczoraj dostalrem accessy do jiry, githuba i backstage (dev poratl). dostalem tez taska aby stworzyc prostego ale nowego freature do pewnej apliakacji (ktorej jeszcze nie widzialem na oczy i pierwsze o niej slysze). task w jira jest zdefiniowany wyczerpujaco i jasmo. czy korzystac z developer portalu umiem sam znalexc aplikacje w ktorej mam zaimplementowac funkcjonalnosc, postawic srodowisko developerskie i napisac tego taska, przetestowac go korzystac

## emergency response time indicator: sre naprawia awarie
futurologcznie: wierze ze dramatycznie spadaajcy koszt liniki kodu dzieki AI, spowoduje ze przyszlosc przyniesie nam jeszcze wiece mikroserwisow i jeszcze bardziej zlozone opreogwamanie. dotychczasowy rozwoj informatyki to rozwoj w wkieunku rosnacje zloznosci (to zdanie zahcowaj tak). w takiej sytuacji rosnie rola SRE bedacych w stanie blyskawicznie reagowac na awarie. a to czego potrzebuje wyksztalcy sre w zlozonym systemi to ustruktoryuwoaznej bazy wiedzy o infrasturkeuyrze organiacjai pozwalajacej mu blystkawicznie sie po niej portuszac jaka dostarcza developer portal.

story: jestem SRE (mam szerokie kompetnecje), jest niedziela wieczor i jest awaria krytczynego systemu o ktorrym pierwszy raz slusze na oczy, czy jedyny programista jaki jest onsite ma dosc informacji aby odpalic srodowisko developerskie, ze skofnigorpowanym debuggerem, aby napraciwac blad, czy jest w stanie zdepolowac latke? czy developer portal zawiera dosc informacji abym jako SRE byl w stanie zalatwac buga lub przynajmniej ograniczyc jego skutki? 

## time of setting up IDE developer envi / CDE

w obu tych przypadaach developer musi postawic srordowisko developerskie w IDE aby dokonac  zmian i wykonac testy. to zajmuje czas, szczegolnie sobie ktora nie robila tego wczesniej,. o tym jest naogol onabrding do projektu dla developerea. developer experince to nie jesty tylko developer portal ale calosc doseiadczenia developerskiego, w tym przypadku czesia tego doswiadczenia jest jak szybko i latwo moge urochocic te srodiwkso. vscode oferuje workspaces i luch scripts (zhadza sie?) ktore pozwlaja opisac konfiguacje tego srodiwska kodem i urchocmic je dzialajace w konterze! mozna zrobic to lokalnie, a mozna zrobic to w CDE (cloud dev end) na github znamy to jako ...., na gitlab, sa tez inne znane jak.... . ja szczegolnie do krytycznych i bardziej zlozonych sytsemow rekomenduje 


## infrasturcre healh status and debugging cover: sre szuka awarii

story: wyobrazmy sobie ze jest niedziela, tez cos nie dziala ale nie wiadomo co! uzytkownicy zglaszaja randomowe bledy, ciuezko domyslec sie zrodla. na ile nasz developer portal daja przejrzysta czysta widomosc w stan inafrasturyey: 
- czy juz strony z lista entities pokazuja jej stan np kolorem? 
- czy mamy podpieta grafane, 
- czy moznamy za pomocac czatbota przepytac o stan infrastruktuyy
- czy czathbot pozwala analizowac wsyzkie logi
- czy wszyskie zrodla logowa do dostepne dla backstage?

innymi slowy: jak szybko SRE moze przeczestywac health statusy i logi niezliczonej ilosci mikroseriwow i serwerow?
developer portal daje niesamowiata okazje 

## podsumwoanie 
czyli zakladamy takie 2 glowne realne potrzeby jakim ma sluzyc developer expience:
- szybkie debugowanie i naprawy przez sre - maintainbily? low reposne time? jakie sa potrzeby dla sre? cele? indicators?
- samodzielenie i szybkie wdrozenie, anync obbording, presetup devenv, i poznej dalej podazanie tym scenariuszem czyli czy zostala mi wlasciwa wiedza przekazana na zadanie czy mam elarning on demand,  wiecej o tym scenaiurszy pisze w artylike o onbaoring on async continuur onbaonding