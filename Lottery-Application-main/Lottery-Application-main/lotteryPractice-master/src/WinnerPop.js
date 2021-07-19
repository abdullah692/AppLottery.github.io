import React, { useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom'
import { db } from './Components/fire'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router';
const paperStyle = { padding: 30, height: '150vh', width: "80%", margin: "40px auto" }
const heading = { textAlign: ' center' }
const link = { textDecoration: 'none', color: 'black' }

var showDate = new Date();
// var displayDate = showDate.getDate() + '/' + showDate.getMonth() + '/' + showDate.getFullYear();
function WinnerPopup() {
  const history=useHistory();
  // const [winnerData,getWinnerData] = React.useState([""])
  const [bookerProductData, setBookerProductData] = useState([""]);
  // const test = bookerProductData.map((data)=>{
  //     console.log(data)
  //     // console.log(data.role)
  // })

  try {

    useEffect(async () => {

      await db
        .collection("Winners")
        .onSnapshot((snapshot) =>
          setBookerProductData(snapshot.docs.map((doc) => doc.data()))

          // console.log( 'abcd',snapshot.docs.data)

        );

    }, [])
    console.log('abcd', bookerProductData)

  } catch (error) {
    console.log(error)
  }

  // bookerProductData.map((test)=>{

  //   console.log(test)
  // })

  return (
    <Paper elevation={10} style={paperStyle}>
       <ArrowBackIcon onClick={()=>history.push('/')} />
      <h2 style={heading}>Showing the Winner People</h2>

      {bookerProductData.map((data) => {

        let d = new Date(data.date?.toDate());
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let tareekh = d.getDate();
      
        return (
          <>
            <h3>Date: {month}/{tareekh}/{year}</h3>
            <h3>Winner01: {data.Winner01}</h3>
            <h3>Winner02: {data.Winner02}</h3>
            <h3>Winner03: {data.Winner03}</h3>
          </>
        )

      })}

    </Paper>

  )
}
export default WinnerPopup
