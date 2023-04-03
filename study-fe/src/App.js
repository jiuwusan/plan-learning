import API from './api'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    API.questionApi.queryList();
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
