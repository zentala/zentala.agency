import React from "react"
import Layout from "../components/layout"
import KontaktBox from "../components/KontaktBox"

const oNas = () => (
  <Layout>
    <section>
      <h1 style={{marginBottom: 0, fontSize: '8em'}}>Jesteśmy najlepszym partnerem</h1>
      <h2 style={{fontSize: '5em'}}>dla przedsiębiorstw pragnących wdrażać innowacje i zoptymalizować swoje operacje.</h2>

      <button>Porozmawiajmy</button>
    </section>
    <section>
      <h3>Twoje przedsiębiorstwo w centrum uwagi</h3>
      Nasza misja to nie tylko dostarczenie efektywnych rozwiązań technologicznych, ale również zrozumienie i wsparcie dla specyfiki Twojego biznesu. Naszym priorytetem jest Twoje zadowolenie i sukces.

      <strong>Ponad 80% naszych klientów to firmy, które poleciły nas innym przedsiębiorstwom. To nasz największy sukces.</strong>

      <h3>Automatyzacja i Innowacje</h3>
      <p>Specjalizujemy się w dostarczaniu zaawansowanych rozwiązań, które zwiększają efektywność i redukują koszty. Nasze podejście łączy w sobie najnowsze technologie z praktycznymi zastosowaniami w biznesie.</p>

      <h3>Przyszłość to teraz</h3>
      <p>Żyjemy w dynamicznie zmieniającym się środowisku, w którym opóźnienie w adaptacji do nowych technologii może być kosztowne. Dlatego stawiamy na ciągły rozwój i innowacyjność, aby zawsze być krok przed konkurencją.</p>
    </section>
    <section>
      <h3>Nasze wartości</h3>
      <ul>
        <li>Skuteczność - Robimy to, co obiecujemy</li>
        <li>Odpowiedzialność - Za nasze działania i za Twoje zadowolenie</li>
        <li>Zaufanie - Tworzymy relacje, które są korzystne dla obu stron</li>
        <li>Innowacyjność - Nieustannie poszukujemy nowych, lepszych rozwiązań</li>
      </ul>
      <button>Skontaktuj się z nami</button>
    </section>
    <section>
      <h2>Historia Agencji</h2>
      <p>Nasza historia to ciągła ewolucja i adaptacja do zmieniającego się rynku. Zaczynaliśmy jako mały zespół freelancerów, a dzisiaj jesteśmy liderem w automatyzacji i innowacjach.</p>
      <p>Posiadamy biuro w Warszawie, a nasi eksperci mają wieloletnie doświadczenie w różnych sektorach: rozwóju oprogramowania, IoT, robotyki, project managmentów, change menagmentu, marketungu, designu i UX, data science, zarządzania strategiczego itd. Jeteśmy zespołem o silnym trzonie technologicznym, a jednocześnie zakorzenionym w biznesie.</p>
      <p>Nieważne, czy jesteś małą firmą, czy dużą korporacją, mamy rozwiązania dopasowane do Twoich potrzeb.</p>
    </section>
    <section>
      <KontaktBox/>
    </section>
  </Layout>
)

export default oNas
