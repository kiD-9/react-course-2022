import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RegistrationComponent } from "./Components/Registration/RegistrationComponent";
import { CardListComponent } from './Review/Components/CardList/CardListComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<RegistrationComponent/>}></Route>
          <Route path='/cards' element={<CardListComponent/>}></Route>
          <Route path='/cards/:id' element={<span>kekeek</span>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
