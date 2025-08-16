import './App.css'
import DataTable from './components/DataTable';
import InputFieldDemo from './components/InputField/InputFieldDemo';


function App() {
  return (
    <>
      <InputFieldDemo />
      <DataTable data={[]} columns={[]} />
    </>
  )
}

export default App;
