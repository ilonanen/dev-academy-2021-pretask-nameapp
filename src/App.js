
import './App.css';

import React, { useState, useEffect } from 'react'

import { AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

function App() {

  const [names, setNames] = useState([])
  
  useEffect(() => {
    getNames()
  }, [])

  const getNames = () => {
    fetch('https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json')
    .then(response => response.json())
    .then(data => setNames(data.names))
    .catch(err => console.error(err))
  }

  const columns = [
    {
      field: 'name',
      sortable: true
    },
    {
      field: 'amount',
      sortable: true,
      sort: 'desc'
    }
  ]

  const total = Object.values(names).reduce((currentTotal, {amount}) => currentTotal + parseInt(amount), 0)

  return (
    <div 
      className = 'ag-theme-alpine'
      style = {{height: 560, width: 420, margin: 'auto'}}
      >
        <AgGridReact
          rowData = {names}
          columnDefs = {columns}
          pagination = 'true'
          paginationPageSize = '10'
          resizable = 'true'
          sizeColumnsToFit
          skipHeaderOnAutoSize
          autoSizeAllColumns
          >
      </AgGridReact>
      <div 
        className = 'App'
      >
          <p>
            Different names: {names.length} <br />
            Names (people) in total: {total}
          </p>
      </div>
    </div>
  );
}

export default App;
