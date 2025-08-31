import { Card } from "./components/Card/Card";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-5">
        <Header />
        <Card />
      </div>
      <Footer />
    </>
  );
}

export default App;
