import Cars from "./components/Cars/cars";
import Loader from "./components/ Elements/elements";
import { BrowserRouter as Router } from 'react-router-dom'
import Menu from "./components/Menu/menu";
import { useEffect } from "react";
import { API } from "./api";
import { useWindowSize } from "./customHooks/useWindowSize";
import './index.css'
import Statistics from "./components/Statistics/statistics";
import Drivers from "./components/Drivers/drivers";
import { useDispatch, useSelector } from "react-redux";
import { setPardsStatisticsAction, setRacesStatisticsAction } from "./redux/statisticsReduces";
import { setCargoesAction } from "./redux/racesReducer";
import Applications from "./components/Applications/applications";
import Storage from "./components/Storage/storage";

function App() {

  const { races } = useSelector(state => state.races)

  const { tab } = useSelector(state => state.ui)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(API.fetchRaces())
    dispatch(API.fetchCars())
  }, [dispatch])

  useEffect(() => {
    dispatch(setRacesStatisticsAction(races))
    dispatch(setPardsStatisticsAction(races))
    dispatch(setCargoesAction(races))
  }, [races, dispatch])

  const [width,] = useWindowSize()

  return (
    <Router>
      <div className="App">
        <Menu />
        {
          Boolean(races.length)
            ? tab === 'cars'
              ? <Cars /> : tab === 'statistics'
                ? <Statistics /> : tab === 'applications'
                  ? <Applications /> : tab === 'drivers'
                    ? <Drivers /> : <Storage />
            : <Loader width={width > 0 ? width / (width < 700 ? 4 : width < 1000 ? 7 : 8) - 15 : 100} />
        }
      </div>
    </Router>
  );
}

export default App;
