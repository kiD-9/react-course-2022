import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RegistrationComponent } from "./Components/RegistrationComponent/RegistrationComponent";
import { InterviewReviewComponent } from './Components/InterviewSolution/InterviewReviewComponent/InterviewReviewComponent';
import { CardListComponent } from './Components/Cards/CardList/CardListComponent';
import { LoginComponent } from './Components/Login/LoginComponent';
import { InterviewContestComponent } from './Components/InterviewSolution/InterviewContestComponent/InterviewContestComponent';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<LoginComponent/>}></Route>
            <Route path='/register/:id' element={<RegistrationComponent/>}></Route>
            <Route path='/contest/:interviewSolutionId' element={<InterviewContestComponent/>}></Route>
            <Route path='/cards' element={<CardListComponent/>}></Route>
            <Route path='/cards/:id' element={<InterviewReviewComponent/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
