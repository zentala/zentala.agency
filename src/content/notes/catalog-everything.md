## catalog everything

te rzecyz , sczegolnie zbudowanie katlogu i podczenie douentacji, moga wydawac sie nidne ale skatalogowanie wszytskie porzwdnie to zawsze pierwszy krok jaki rekomenduje klinetom w swojej strategii devex
pomieaz katalog jest centralna czescia platofrmy i wszytskosie wokol niego kreci, wszytski dalesze mozlwe integracje i rozwijanie platformy

### custom entity procesor

kolejna rzecz ktora jest powiazana z katalogwaniem to uzywanie custom entity procesors aby podlaczyc zrodla danych do katalogu, np custom APIs czy tez jesli generujemy entities z danych ktore juz istnija w repos w innycgh firmach ale nie chcemy miec 2 zrodlej prawdyw wiec pozwalamy custom entity procesorom poberacv dane i geneowac z nich entities do katalogu, nie utrzymujemy wtedy dla tych danych osobnych catalog-info.yaml w repozytoriach

### post porcesor

kolejna rzecz zwiazana z katalogowaniem to postporcesor,. czasami np pobieramyu uzytkiownika z organizacji github ale chcemy ubogadzic jego entity o dodatkowe informacje z innego zrodla np z bazy danych o useram Azire AD, wtedy mozemy uzyc postporcesorow aby po stworzeniu entity w katalogu zaktualizowac go o dodatkowe informacje, aby posporpoceso uzyl dostepnych dsnaych (np loginu githuba) aby pobrac dodatkowe informacje o uzytkowniku na tej podstawie (np login azuure ad na postawie usera githuba). takie rzeczy robia postporcesory

### links

linki do wszystkiego co jest zwiazane z entities, do kzdego elementy instrasfiturky.

### md docs

### confulence docs

### feedback loop

na koncu nie zapominij dodac pluginu feedback do entities, aby umozliwic zwracanie feedbacku o bledach w entity dla ownerow

### custom plugins

add readmed (markdown), add repo info

## podsumowanie

skatalowanie wszyskiego w ogole pozwala powiedziec na czym stoimi i np zacac dobierac do realnych entities pluginy ktore poglebia integracja z ecosystemem
