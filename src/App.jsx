
import ListaFatture from "./Components/ListaFatture.jsx";
import Fatture from "./Components/Fatture.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavBar></MyNavBar>
        <Routes>
          <Route path="/fatture" element={<Fatture />} />
          <Route path="/visualizza-fatture" element={<ListaFatture />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;