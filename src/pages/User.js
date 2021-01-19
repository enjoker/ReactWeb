import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import MaterialTable from 'material-table'

const User = () => {
   const [allUser, setAllUser] = useState()

   const getUser = async () => {
      await axios.get('http://103.75.200.45:8088/getUser')
         .then(res => {
            setAllUser(res.data)
         })
         .catch(err => {
            console.log(err)
         })
   }

   const editUser = async (userData) => {
      await axios.post('http://103.75.200.45:8088/edituser ', {
         Id: userData.id,
         name: userData.name,
         phone: userData.phone,
         email: userData.email,
         password: userData.password
      }).then(res => {
         console.log(res)
      }).catch(err => {
         console.log(err)
      })
   }

   useEffect(() => {
      getUser()
   }, [])
   // console.log(allUser)
   return (
      <Container className="allUsers">
         <div style={{ maxWidth: '100%' }}>
            <MaterialTable
               localization={{
                  pagination: {
                     labelDisplayedRows: '{from}-{to} of {count}'
                  },
                  toolbar: {
                     nRowsSelected: '{0} row(s) selected'
                  },
                  header: {
                     actions: 'Edit'
                  },
                  body: {
                     emptyDataSourceMessage: 'No records to display',
                     filterRow: {
                        filterTooltip: 'Filter'
                     }
                  }
               }}
               columns={[
                  { title: 'Name', field: 'name' },
                  { title: 'Phone', field: 'phone' },
                  { title: 'Email', field: 'email' },
                  { title: 'Password', field: 'password' }
               ]}
               data={allUser}
               title="All Users"
               options={{
                  actionsColumnIndex: -1,
                  headerStyle: { fontWeight: 'bold' }
               }}
               editable={{
                  onRowUpdate: (newData, oldData) =>
                     new Promise((resolve, reject) => {
                        setTimeout(() => {
                           const dataUpdate = [...allUser];
                           const index = oldData.tableData.id;
                           dataUpdate[index] = newData;
                           setAllUser([...dataUpdate]);
                           editUser(newData)
                           resolve();
                        }, 1000)
                     }),
                  // onRowDelete: oldData =>
                  //    new Promise((resolve, reject) => {
                  //       setTimeout(() => {
                  //          const dataDelete = [...allUser];
                  //          const index = oldData.tableData.id;
                  //          dataDelete.splice(index, 1);
                  //          setAllUser([...dataDelete]);

                  //          resolve()
                  //       }, 1000)
                  //    }),
               }}
            />
         </div>
      </Container>
   )
}

export default User