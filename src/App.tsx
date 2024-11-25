import MainPage from "./containers/MainPage/MainPage";
import {BrowserRouter, Routes, Route} from "react-router";
import MovieDetailPage from "./containers/MovieDetailPage/MovieDetailPage.tsx";
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary.tsx";
import MainPageFallback from "./containers/ErrorBoundary/MainPageFallback/MainPageFallback.tsx";
import MovieDetailPageFallback from "./containers/ErrorBoundary/MovieDetailPageFallback/MovieDetailPageFallback.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ErrorBoundary FallbackUI={MainPageFallback}>
          <MainPage/>
        </ErrorBoundary>}/>
        <Route path="/movie/:id"
               element={<ErrorBoundary FallbackUI={MovieDetailPageFallback}>
                 <MovieDetailPage/>
               </ErrorBoundary>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
