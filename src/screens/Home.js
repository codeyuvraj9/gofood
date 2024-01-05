import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import Card from '../Components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });
    response = await response.json();
    console.log("Fetched data:", response);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div><Navbar /></div>

      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner">
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className='d-flex justify-content-center'>
                <input type="search" className="form-control rounded" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                {/* <button type="button" className="btn btn-outline-primary text-white" data-mdb-ripple-init>search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/600x250/?burger" className="d-block w-100 img-fluid img-responsive" style={{ filter: "brightness(40%)", height: "700px"}} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/600x250?pastry" className="d-block w-100 img-fluid img-responsive" style={{ filter: "brightness(40%)", height: "700px"}} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/600x250/?barbeque" className="d-block w-100 img-fluid img-responsive" style={{ filter: "brightness(40%)", height: "700px"}} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {
          foodCat !== [] ? foodCat.map((data) => {
            return (<div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItem !== [] ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map(filterItems => {
                return (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filterItems} options={filterItems.options[0]}></Card>
                  </div>
                )
              }) : <div>No such data found</div>}
            </div>
            )
          }) : ""
        }

      </div>
      <div><Footer /></div>
    </div>
  );
}
