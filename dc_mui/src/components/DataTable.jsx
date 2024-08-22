import React, { useState ,useEffect} from 'react';
import { forwardRef } from 'react';
import MaterialTable,{MTableEditField,AutoComplete} from 'material-table';
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material';

import { AddBox, ArrowDownward,Check, 
  ChevronLeft, ChevronRight, Clear, DeleteOutline, 
   Edit,  FilterList,  FirstPage, LastPage,
    Remove, SaveAlt,  Search , ViewColumn } from "@material-ui/icons";



const DataTable = (props ) => {

  let [data, setData] = useState(props.DataList);

  const [columns, setcolumns] = useState(props.columnss);
  const [collection, setcollection] = useState(props.collections);
  const [noAdd, setnoAdd] = useState(props.noAdds);
  const [noEdit, setnoEdit] = useState(props.noEdit);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const typeUser = props.type;
  
  
  const theme = createTheme({});

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const addRowToCollection =(newRow)=> {
    try {
          
        Object.assign(newRow, {type: typeUser});
     
      } catch (error) {
        console.log(error);
      }
  }

  const updateRowOfCollection = (updatedRow) =>{
//
  }

  const deleteRowfromCollection = (deletedRow) =>{
//
  }


  return (
    <div className="App">
    
      
<ThemeProvider theme={theme}>
      <MaterialTable
      icons={tableIcons}
      title={""}
      columns={columns}
      data={data} 
        editable={{
          
          onRowAdd:  noAdd == false ? (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { ...newRow }]
            
            setTimeout(() => {
              setData(updatedRows)
              addRowToCollection(newRow);
              resolve()
            }, 2000)
          }) : null,
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              deleteRowfromCollection(selectedRow);
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate: noEdit == false ?(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows);
              updateRowOfCollection(updatedRow);
              resolve()
            }, 2000)
          }) : null,

        }}

        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",columnsButton: true, grouping: props.isgrouping,exportButton: true, sorting: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          }),
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          }
        }}
    //     localization={{
    //       body: {
    //           emptyDataSourceMessage: "Pas d'enregistreent à afficher",
    //           addTooltip: 'Ajouter',
    //           deleteTooltip: 'Supprimer',
    //           editTooltip: 'Modifier',
    //           filterRow: {
    //               filterTooltip: 'Filtrer'
    //           },
    //           editRow: {
    //               deleteText: 'Voulez-vous supprimer cette ligne?',
    //               cancelTooltip: 'Annuler',
    //               saveTooltip: 'Enregistrer'
    //           }
    //       },
    //       grouping: {
    //           placeholder: "Tirer l'entête ...",
    //           groupedBy: 'Grouper par:'
    //       },
    //       header: {
    //           actions: 'Actions'
    //       },
    //       pagination: {
    //           labelDisplayedRows: '{from}-{to} de {count}',
    //           labelRowsSelect: 'lignes',
    //           labelRowsPerPage: 'lignes par page:',
    //           firstAriaLabel: 'Première page',
    //           firstTooltip: 'Première page',
    //           previousAriaLabel: 'Page précédente',
    //           previousTooltip: 'Page précédente',
    //           nextAriaLabel: 'Page suivante',
    //           nextTooltip: 'Page suivante',
    //           lastAriaLabel: 'Dernière page',
    //           lastTooltip: 'Dernière page'
    //       },
    //       toolbar: {
    //           addRemoveColumns: 'Ajouter ou supprimer des colonnes',
    //           nRowsSelected: '{0} ligne(s) sélectionée(s)',
    //           showColumnsTitle: 'Voir les colonnes',
    //           showColumnsAriaLabel: 'Voir les colonnes',
    //           exportTitle: 'Exporter',
    //           exportAriaLabel: 'Exporter',
    //           exportName: 'Exporter en CSV',
    //           searchTooltip: 'Chercher',
    //           searchPlaceholder: 'Chercher'
    //       }
    //   }}
  
 
     
      />
      </ThemeProvider>
    </div>
  );
}

export default DataTable;