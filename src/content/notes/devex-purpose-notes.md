Chce napisac artykul po angl na bloga. 
docelowo ma byc w markdown na razie nie
bo praujcemy nad tekstem

ma miec tytlul, streszczenie (do listy aretow) no i bedzie sam art
art bedzie na podstawie moich notatke z miro ktore wklejam ponizej oraz instrukcji i wprowadzenia jakie Ci zaraz podam
jesl ichodzi o m miro to chcemy wykorzystac glownie pierwsz aczesc, na okolo to moze bycz  polowa tekstu o tym "What is purpose Developer Experience?" ale juz nie bedzo bedziemy chcieli sie rozpiusywc o tym jak te purpose sie realizuje

backgound jest taki - i dokladnie tak chce to przkeazac, to jest  mieso odenie na arta do przetlumaczenia i tak chce zaczac- ze wdrazajac developer portal czesto spotykamy sie ze strony innych stakeholderow , pracownikow dzialu it oraz manageorw roznego szczebla pytania po co to robimy. prowadzac taki projekt wazne jest aby umiec precyzyjnie zwielde odpowiedziec na to pytanie, w sposob ktory tlumaczy cele stojace za naszymi dzialaniami oraz spodziewane korzysci. kiedy ludzie pytaja o purpose, a na poczatku pytaja czesto, to pytaja o intencje z jakimi dzialmy. robia to dlatego ze swiadomosc intecji - celow, warotsci - pozwala im poczuc sie bezpiecznie, dzieki temu ze wiedza czego moga sie po nas spodziewac oraz do czego sie odwolywac komunikacyujac sie z n nami. wdrazanie projektu devex postrzegam tez z perspektyy change managera, ktory dealuje z oporem. najwazniejsza czescia pracy z oporem jest adresiowanie go na samym poczatku, najlepiej aby nie wystapoil. wiecej o tym jak pracowac z oporem poisze w innych artykulach ale jedna ze strategii jest niedopuszczanie do rozwiniecia sie leku, sprawienie aby ludzie czuli sie bezpiecznie, a ludzie czuja sie instytnkownie bezpiecznie kiedy znaja nasze intencje i rozumieja nasze cele. mozna napisac ze jesli jestes wdrazajacym albo jakiegos rodzaju managerem nad tym czy osoba ktora reprezentuje ten projekt, jakakolwiek osoba jaka repzeentuje ten projekjt przed innymi.... albo jak u CIebie wdrazaja devporetal a Ty zastanawiasz sie jaki jest cel tego i jaka wartosc to ma wnosic to tutaj tez jest wyjasnienie. to jest taka uporzadkowana przezemnie teoretyczna perspektywa pomagajaca wyjanisc czym jest i czemu sluzy developer experience - ze w taki sposob ja sobie to porzadkuje, w domysle to nie jest prawda objawiona. i to ma byc wstep. moze jakis naglowek do niego a moze robic na 2 akapity - jeden ze wstep wstep, a 2gi cos o change managment i roli umiejetnsoci wyjasnienia purpose of devexp orject. czuli mysle ze tak, najpierw o tym ze czy sam repzentujesz projekt czy u Ciuebie wdrazaja to mozesz chciec doglebniej zrozumiec teoretyczne abstrakcyjne motywacje stojace za devex, a pozniej o roli tego w changemanagment dzial z naglowkiem

ja pisze Ci to abys mial latwosc precyzyjnego ubrania w slowa intencji, i opowiadania o devportal i devex na wysokim poziomie abstrkacji abys mogl szybko sobie jednac ludzi do ideii trafynymi argymentami i prezcyzjna jasna demonstracja wartosci, klarownym wyjasnieniem wyzwan ktore chcemym zaadresowac swojm dzialaniem i celow jakie chcemy osiagnac, kierunkuy w jakim chcemy zmierzac

### czyli po co robimy ten developer portal? bo co wdrazamy ten backstage?
- aby poprawic developer experience

### a co to jest te developer exerience
- to jest usaability dla developerowe, to jest user experience, ale nie dla userow ale dla pracownikow it

### potrebujemy poprawiac usability w naszym dziale it?
- a czy zdarzlao Ci szukac potrzebnych informacji godzinami a nawet dniami?
- byc przekierownywanym od osoby do osoby nie bedac w stanie znalexc osoby odpowiedzialnej wlasciwej do danej sprawy?
- czy nie meczy Cie czasem przeksakiwanie miedzy platformami szukajac potrzebnych informacji? (nie wolabys miec jednego panelu startowego gdzie znajdziesz wszystko obok siebie, ze soba powiazane? )
- czy nie czujesz sie czasem zmeczony w gaszczu tych wszystkuich rozporosznych informacji?
- nie zdarzylo Ci sie poczuc zmeczonym zanim jeszcze zaczales programowac, bo tak ciezko bylo uzyskac potrzebene infomfjace o wewnetrznych systemamach i rozwizaniach firmy aby rozpoczac z jakas funkcjonalnsocia?

jesli odpowiadasz tak na ktores pytania, to wlasnie swiadczy o slabym developer experiece, 

### dlaczego kiedys nie potrzrbowalismy developer portalow i jak doszlismy do tego ze ich potrzebujemy?

kiedys nie bylo mikroserwisow, wraz z nimi ogromnej ilosci api, nie bylo chmury, devops, aplikacje i infrastutkrua do nich byly prostsze
ale na przestrzeni ostatnich lat architektuera naszych rozwizan staje sie coraz bardziej zlozona  - ilosc elementow z ktorych sklada sie nasza cyfriwa infastkura i platfom dookola nich (devops, monitoring, etc) szybko rosnie
nie bylo tak zlozonych oboardingow i tyle roznych linkow i referencji do przekaznia sobie 

## o jak to sie stalo ze zaczelismy rozwijac devex?

firmy jak spotify majace przeogormna iloc mikorserwodow zobaczyly potrzebe rozwoju takich rozwizan i wypuscili dlatego backstage 
no i fimy na swiecie uznaja ze to dobry pomysl aby za jego pomoca skatalogowac cale to cyfrowe srodowisko developerkie

w developer expeience inwoestwal takze amanon ktory mial podobnie jak sporify ogronna ilosc mikroserosow dla swojego sklepu, i deoployowanie ich bylo problemem, tak powstal aws, z potrzeby poprawy developer experiecene podczas deploymentu, aby developer mogl jak najprposciej deployowac, monitorowac, zarzadzac swoja usluga, jakims serwisem, baza, pipelinem, etc. wiec oni oprcowali AWS dla siebie, aby ich developerz mieli latwiej z tymi opoeracjami. 

ogolnie wiadomio ze te same usluigi na aws kosztowaly by na swoim serwerze wielokrotnie taniej, np sam stoarage na aws kosztuje kilkukrotnie niz na vps, ale poniewaz jest w chmurze to jest taki drogi, bo wartoscia nie jest stirage ake chmura, uproszczone developer experiece ktore redykuyje bledy, problem i tez pozwala zmniejszyc dzial it, nie potrzeba ponosic  odpowidzialnosci czesci zarzadzania serwerami i firmy dlatego za to duzo placa, za uslugi amaozna

github tez jest mocno w developer experiece dlatego tworza rozne rozania dookola githuba i swojej chmury azure ktore wspieraja devex

wielkie korporacje juz wiedza ze devex po prostu robi pieniadze, bo w tym zlozonym srodowsiku ze slabym devex nie idzie pracowac. gdy devex jest slabe to jestes zmeczony zanim zaczniesz pisac kod, a spedzasz cala uwage na rzeczach wcale nie ziwzanych z wykonaiem zadania ale z ogarnieciem tego co potrzebne aby je zrealizowac

i poniewaz tak sie stalo w ostatnich latach z powodu rosnacej zlozonosci srodowisk developerskich i mnogosci mikroseriwosow, zaczelo to blokowac prace w niektorych wypadkach, to naturalnie najwieksze organizacje najpier zaczelyu rozwazac jak zastosowac prinicples of user experience dla srodoiwskk developerkow

no bo kurde nie dosc ze placimy im sporo pieniedzy to jeszcze ich brakuje, dlatego ich efektywosc jest wazna. jesli usabbility stoi na przeszkodzie to je poprawmy.

w firmach pojawialja sie problemy z onboardingiem i knowdlege trandfer. 


ktore chcielibysmy pomoc wam poprawiac poprzez skodyfikowanie, ustruktuyrozwoanie duzej czesci rozproszone dotychczas wiedzy o infastukturze cyforwej organizacji. backstage jest jak graph ktory pozwala skatalogowac i polaczyc ze soba na wiele sposob rozne z ele,mentow (entities) tej cyfrowej infastruktury, a nastepnie zbudowac dookola tej sieci graph powiazania z zewnetrnzymi platformami. W ten sposbo backstage czy inne tego rodzjau suysyemy sa debeloper portalami, one tylko sa bramami do tego co dalej, do wewnwetrznych platfrom (github, attalasian, etc)

## dlaczego w ogole zaadresowanie problemmow zlozonosci tego srodiwska ma znacznie

bo czlowiek ma ograniczona ilosc silnej woli podczas dnia, jesli zmeczy sie na to aby poruszac sie w chaose to nie tylko nie bedzie mial jej na programowanie ale sie szybciej wypali. poprawa developereperience znaczaco wplywa na wzrost satysfkacji devekloperow, ktorzy moga efektywnie skupic swoja uwage na swojej pracy i maja dostarczone wszystkie infomracje o zaleznosciach, infrastrukturze czy dokuimemntacji do reki za pomoca dev portalu. 

nalezy rozroznic portal od platformy bo czasem sa mylone, platoforma to usluga, cos dostarcza jak github lub attaliasian, natomiast backstage jest developer portalem, on przypomina portale internetowe z przeszlosci, z czasow gdzie wyszukiwarki nie graly jeszcze tak silnej roli, i te portale byly takimi bramami do innych zasobow internetu. podobnie nasz devportal ma byc taka brama do zasobow firmy. 


## czym jest to developer expriece teoreycznie?

w dexex chodzi o reduce cogfnitive load oraz reduce switching
chodzi o to aby oszczeddnie dysponowac twoja uwaga jako czlowieka dzialu it
chcemy podjac dzialania poprawiajaca ussability naszego srodowiska developerskiego 
tak aby kazdy developer, ale tez manager, sre, architect, team lead, etc 
aby mial dobre visbility (improving discoverability) naszego srodowiska cyfrowego

w reduce cognitive load chodzi o to abys wiedzial to czego potrzebujesz wtedy kiedy pootrzebujesz
onboarding on demand, elarning on demand, jak w serwisie samochodzoym, dostajesz tylko te wiedze ktora jest potrzebna Ci do wykonywania pracym,
jestes ja w stanie latwo zlokalizowac i uzyc, nie musisz przedzierac sie przez nierelwantne rzeeczy
ale tez np poprawiamyu jakosc dokmenacji abys mogl na niej polegac

ogolnie takie panele jakie dostajesz w bacstage entities jakie sobie komponujemy to one Ci reduce context switching bo wszystko masz w 1 miejscy, a jak jeszcze dostarszczsz do backstage rozne statusy np czy serwis jest live, logi itd to masz visibility nie tylko na to co istnieje ale tez masz observabiity w jakim jest stanie

tak ukierunwoanwe - dedukujace context switichn i cognitive load, impvoing visibilit and observaltity, to dzialania poprawiajace developer experiece

i devex jest taka miekka nauka, bazyjaca na usability polacozny z jakas wiedza o devloperksich srowdowiskach, sluzjaca zwiekszaniu efektywnosci w it dzieki developer experience

## jakie sa inne mozliwe cele w devex

kazdy projejt devex powinno miec swoja strategiie. 
ta strategie skupia sie na osiagieciu celow dookola zwiekszenia efektywnosci. 

w zalznosci od oganizacji, jej strukturey, potrzeb, wyzwan, charaktesytki jej produku mozemy stawiac sobie rozne cele, ktore ukierunkuja na nas na to w jaki sposob uzywac portalu developerskiego aby osiagnac te cele dla firmy. i majac wtedy te cele mozemy dopasowywac swoje dzialania do nich.

jakie to moga byc inne cele w devex:
- satysfkacja klientow
- ensure code quality  
- ensure security  
- enhance communication and collaboration  
- ETC

TAK NAPRAWDE TO CHYBA TRZEBA TU DLA KAZEDJ Z TYCH RZECZY OMOWIC JAK DOKLADNIE MOZNA TO RROBIC JAKIES PRZYKLADYK PEWNIE KAZDY MUSI BYC SUBNAGLOWIEK, JA TUTAJ DODAM CO TRZEBA JAK ROBISZ NAGOWKI

## Zakonczenie

intencja devex jest poprawa efektywnosci pracy dzialu it, to moga by takie rzeczy jak zdolnosc do szyubszego reagowania czy zmniejszenie ilosc bledow, efektywnosci ktora sie defiuniuje w strategii. ona moze zawierac rozne cele i firma w zalznnosci od okolicznosci moze miec rozne sposoby realzjacji ich


posumwoanie: istnieje wiele celow dla ktorych wdraza sie devex ale sluza one

From Miro board:

What is purpose Developer Experience?

DEVEX  
PRSETNT VIA  DEPO  

Questions
improving discoverability  
reduce contex switching  
reducing cognitive load  
improve efficiency  
enhance communication and collaboration  
increase developer satisfaction  
ease onboarding  
ensure code quality  
ensure security  
support innovation  
What is purpose Developer Experience?  
What exhausts you the most?  
visibility issues  
What takes too much time to find or open?  

What are common and repeative pain points in devs daily work?  
Where do you often get stuck?  
Main purposes: 1) facilitate collaboration 2) make developers efficient and happy 3) ensure golden path compliance  
Fatigue indicates high cognitive load, which we want to reduce  
How can we reduce dependencies from actions of others?  
What is slowing you down?  
onboarding  
DevOps  
documentation  
...  
because DevEx is mostly about DevOps  
Where do we apply DX?  
to problems that are beneficial to solve  
Observed areas where necommers are struggling?  
What of theirs struggles are most time consiming?  
How does a new developer learn how to get started?  
problems  
pain points  
sources of frustration  
fatigue  
chaos  
confusion  
misleadings  
time-wasters  
repetitive actions  
blockers  
slowdowns  
Gatekeepers for systems (hard to get onboarded)  
Not much is self-service - need to coordinate with lots of other teams  
Any challenges regarding deployments?  
Are there any difficulties in monitoring and managing resources?  
Hard to learn how to do things the correct way (not documented?)  
What kind and pages of documentation should be easly searchable? (easy to find; so we can add them to search)  
MAX -> System Team  
Azure -> CCOE  

Can we create a map of all important documents?  
enable developers to help themselves  
beneficial  
address common problems  
will be frequently used  
remove dependencies  
tackle time-consuming issues  
prevents errors with serious consequences  
significantly reduce the effort required  
relatively easy to implement  
May be worse depending on the ARTs/Domains  


Where seasoned developerr (1y+ in company) are stil struggling because of missing docs?  
What is whole depoyment toolkit  
What areas and topics require documentation & onboarding improvement?  
What are the sources of documentation? Something else than confluence?  
Do you monitor its consistency and usefulness?  
Did you identify crucial docs you serve to others?  
How can we present our deployument process via backstage to newcommers?  
technical writers  
docs review and consultation  
Are all parts of deploument strightforard and well documented?  
Do you need / want help to improve docs you are responsbile for?  
where do we relay on only single person to onboard?  



Comunities of Practices  
would u like to join or recommend someone?  
who are teachers, supporters, reviewers  

How can we measure them?  
How can we use them?  
Defining (Success) Metrics  
Gathering Feedback  
Continuus Improvement  
Automation  




Golden Paths  
integrating  
How can we improve DX?  
associating  
cataloguing  
Backstage connects islands of tools  
Who could be responsible for improving which areas?  
How can we involve and enable people  in the process of improving DX?  
What metrics or success indicators will be most important to you after implementing Backstage?  
How can we identify gaps in the developer experience?  
What often repetative processes takes too much time when could be automated or shortened?  
Measuring Your Satisfaction  





What metrics will proof successful implementation?  
What will we need to continuously monitor?  
what tools are you using in your work?  
becuse eg. documentation can become outdated over time  
...so poor DevEx can be easily reported.  
toolchain / dev stack  

processes that require onboarding to first start with, but it may be not a part of initial onboarding. Eg in one company that was translation system. I used it first time 1y after starting work.  
OnBoarding on Demand  
How?  
Where?  

e.g. for docs  




When we perform analytics, let's measure the effectiveness of processes and tools, not people.  
eg. forms, stats  
eg. docs, tools  



eg. self-service like ServiceNow, some monitoring like Grafana, etc.  
eLearning (Documentation)  
eg. conventers, genrators, emulators, any custom tools  
Technical Writing  
async education processes  
RepositoryTemplates  
Backstage Software Templates  
self-service  
monitor page rejection statistics... indicate that someone did not find what they were looking for  
allow to provide detailed explanation of whats wrong via a text form or comment  
provide simple voting form: 1-5, thumbs up/down  
Actions  
+
=
IT-specyfic  
industry-specyfic  
Good documentation should teach! Not document!  


passive eg analitycs  
active eg feedback  

What selfservice actions shoud be avaliable via  (listed in)  backstage?  
vs
How would you connect them with Backstage to improve developer experience?  
eg some from ServiceNow  
Which will save most time?  
Which integrations will provide new value wasn’t possible to provide without Depo?  
organization  
Standardization  
Which will significantly improve productivity?  
Backstage can be a tool for software architects to enforce and encourage standards  

Which will benefit us most, by leveraging ecosystem of integrations?  
Are there other chaotic processes we would like to put more order in? Are there any unstructured and unmanaged processes we could convert into backstage extentions?  
Which will solve painpoints?  
What are goals, standars and qualities we want to encourange or enforce on developers?  
What are goals, standars and qualities we want to encourange or enforce on developers?  
Are there other processes we should stramline?  
What feels chaotic?  
Code quality? Test coverage?  
eg migrate to python v3  
What parts of CI/CI feels most ineffective for you?  
because DevEx is mostly about DevOps  
If you could reduce  jumping (between tools) how would you do it?  
Frame 1
Feedback loops in software development refer to the speed and quality of responses to actions performed. Shortening feedback loops is crucial for improving Developer Experience (DevEx). Developers often face delays in receiving feedback, whether from tools or people, which hampers their productivity. Fast feedback loops enable developers to complete their work efficiently, while slow feedback loops disrupt the development process and cause frustration and delays. To enhance DevEx, organizations should identify areas where development tools can be accelerated and improve hand-off processes to minimize delays.  
Flow state refers to the state of being fully immersed and focused on a task, leading to higher productivity and innovation. Developers who experience flow state regularly perform better and produce higher-quality products. Interruptions, delays, and lack of autonomy hinder developers' ability to enter the flow state. To enhance DevEx, organizations should minimize disruptions, provide developers with autonomy, and offer stimulating and challenging tasks. Creating positive team cultures that support flow state is also essential for improving DevEx.  
Cognitive load represents the mental effort required by developers to perform tasks. As software development becomes more complex, managing cognitive load becomes crucial. High cognitive load, caused by challenges like poor documentation or unfamiliar development frameworks, leads to errors and hinders developers' ability to deliver value to customers. To improve DevEx, teams and organizations should aim to reduce cognitive load by creating well-organized code, improving documentation, and providing intuitive, self-service tools.  