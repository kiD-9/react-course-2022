import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RegistrationComponent } from "./Components/Registration/RegistrationComponent";
import { CardListComponent } from './Review/Components/CardList/CardListComponent';
import { InterviewReviewComponent } from './Components/InterviewSolution/InterviewReviewComponent/InterviewReviewComponent';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<RegistrationComponent/>}></Route>
            <Route path='/cards' element={<CardListComponent/>}></Route>
            <Route path='/cards/:id' element={<InterviewReviewComponent/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
