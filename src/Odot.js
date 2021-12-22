import React, { Component, useState, useEffect  } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import './Odot.css'
// export default Odot
export default function Odot() {
class Odot extends Component {

  constructor(props) {
    super(props);
  }
}



  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPages = 3;

  function pageComponent(pageIndex) {
    if (pageIndex === 0)
      return <Img1 />
    else if (pageIndex === 1)
      return <Img2 />
    else if (pageIndex === 2)
      return <Img3 />


  }


  return (
    <>
       <div>
       <AppNavbar/>
       {/* <div>Oddddddotttt</div> */}
       </div>
      <div className="app ">
        <h1 className={"TITLE"}>About our store</h1>
                <div className="bbbb">
        <button
          disabled={currentPage === 0}
          onClick={(e) => setCurrentPage(v => v - 1)}
        >&lt; BACK
        </button>
        </div>
          <div className="cccc">
        <button
          disabled={currentPage >= numberOfPages - 1}
          onClick={(e) => setCurrentPage(v => v + 1)}
        > NEXT &gt;</button> </div>
        {pageComponent(currentPage)}
               
      </div>

    </>
  );
}

export function Img1() {
  return (
    <>

      <div className="aboutPage col-12">

        <h3 className={"titleCh"}><br></br>
        Store history</h3>
        <h6 className={"titleCh1 col-11"}>
          <br></br>
  
          The store was opened in 2000 by the Friedman family, the first branch was on Safed Street in the city of Jerusalem,<br></br> the store had regular customers and on Fridays and holiday eves full of new and old buyers who want to decorate their home in honor of Shabbat and holidays.
        </h6>
      </div>
    </>
  )
}
export function Img2() {
  return (
    <div className="aboutPage col-12">
      <h3 className={"titleCh"}> <br></br>The reasons that opened the store</h3>
      <h6 className={"titleCh1 col-11"}>
        <br></br>
        Shoshana has always loved flowers, ever since she was a young girl she would return home with bouquets in her hands <br></br> and sit in the spring afternoon window and read the flower guide, so she always dreamed of the store she would open when she had the financial means to do so.<br></br>
        Indeed, in 2000 she had the opportunity to purchase a small shop and immediately decided to open a flower shop.
      </h6>
    </div>
  )
}
export function Img3() {
  return (

    <div className="aboutPage col-12">
      <h3 className={"titleCh"}><br></br> Store condition now</h3>
      <h6 className={"titleCh1 col-11"}>
        <br></br>.............In a flourishing and happy state :)</h6>
    </div>

  )
}




