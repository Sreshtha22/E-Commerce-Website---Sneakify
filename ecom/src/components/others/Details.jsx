import React from 'react';
const Details = (props) => {
  const product = props.data;
  return (
    <React.Fragment>
     <p style ={{fontSize : "20px", textAlign : "justify"}}> {product.pdesc}</p>
      <details style={{}}>
        <summary style={{fontSize:"20px"}}><b> More details </b></summary><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Outer Material</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>Flyknit</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Inner Material</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>Extra Soft</h5></div></div><br></br> 
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Model Name</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>{product.name}</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Type of Casual</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>Sneakers</h5></div></div><br></br>
        <details>
        <summary style={{fontSize:"20px"}}><b>Product details</b></summary><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Sole Material</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>PVC</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Closure</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>Lace-Ups</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Sales Package</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>1 Pair of Shoes</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Pack of</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>1</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Tip Shape</b></h5></div><div class="col col-9-12 _2vZqPX"><h5>Round</h5></div></div><br></br>
        <div class="row"><div class="col col-3-12 _2H87wv"><h5><b>Care instruction</b></h5></div><div class="col col-9-12 _2vZqPX"><h5 style={{textAlign : "justify"}}>To clean the shoes, you can clean them with a soft brush or cloth. You can use lukewarm water. If required can also be washed with a small amount of mild soap, after washing with soap wipe with a slightly damp cloth.</h5></div></div><br></br>
        </details>
      </details>
    </React.Fragment>
  );
};
export default Details;