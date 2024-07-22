import React from "react";
const SizeChart = (props) => {
  return (
    <React.Fragment>
      <div className="table-responsive">
      <div style={{ display: "flex", flexDirection: "row" }}>
  <div style={{ marginRight: "20px" }}>
        <div style={{fontSize : "20px", fontWeight : "bold"}}>Men's</div>
        <table className="table table-striped table-hover" style={{width:"350px", marginTop : "10px"}}>
          <tbody>
            <tr>
              <th  style = {{fontSize : "15px"}}>UK/India</th>
              <th  style = {{fontSize : "15px"}}>Length (in cm)</th>
              <th  style = {{fontSize : "15px"}}>Euro</th>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>5</td>
              <td  style = {{fontSize : "15px"}}>24</td>
              <td  style = {{fontSize : "15px"}}>39</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>6</td>
              <td  style = {{fontSize : "15px"}}>25</td>
              <td  style = {{fontSize : "15px"}}>40</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>7</td>
              <td  style = {{fontSize : "15px"}}>26</td>
              <td  style = {{fontSize : "15px"}}>41</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>8</td>
              <td  style = {{fontSize : "15px"}}>26.9</td>
              <td  style = {{fontSize : "15px"}}>42</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>9</td>
              <td  style = {{fontSize : "15px"}}>28</td>
              <td  style = {{fontSize : "15px"}}>43</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>10</td>
              <td  style = {{fontSize : "15px"}}>29</td>
              <td  style = {{fontSize : "15px"}}>44</td>
            </tr>
          </tbody>
        </table>

        <div style={{fontSize : "20px", fontWeight : "bold"}}>Women's</div>
        <table className="table table-striped table-hover" style={{width:"350px", marginTop : "10px"}}>
          <tbody>
            <tr>
              <th  style = {{fontSize : "15px"}}>UK/India</th>
              <th  style = {{fontSize : "15px"}}>Length (in cm)</th>
              <th  style = {{fontSize : "15px"}}>Euro</th>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>4</td>
              <td  style = {{fontSize : "15px"}}>23</td>
              <td  style = {{fontSize : "15px"}}>38</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>5</td>
              <td  style = {{fontSize : "15px"}}>24</td>
              <td  style = {{fontSize : "15px"}}>39</td>
            </tr>
            <tr>
            <td  style = {{fontSize : "15px"}}>6</td>
              <td  style = {{fontSize : "15px"}}>25</td>
              <td  style = {{fontSize : "15px"}}>40</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>7</td>
              <td  style = {{fontSize : "15px"}}>26</td>
              <td  style = {{fontSize : "15px"}}>41</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>8</td>
              <td  style = {{fontSize : "15px"}}>26.9</td>
              <td  style = {{fontSize : "15px"}}>42</td>
            </tr>
          </tbody>
        </table>

        <div style={{fontSize : "20px", fontWeight : "bold"}}>Kids'</div>
        <table className="table table-striped table-hover" style={{width:"350px", marginTop : "10px"}}>
          <tbody>
            <tr>
              <th  style = {{fontSize : "15px"}}>UK/India</th>
              <th  style = {{fontSize : "15px"}}>Age Group </th>
              <th  style = {{fontSize : "15px"}}>Length (cm)</th>
              <th  style = {{fontSize : "15px"}}>Euro</th>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>6C</td>
              <td  style = {{fontSize : "15px"}}>18 - 24 Months</td>
              <td  style = {{fontSize : "15px"}}>14.6</td>
              <td  style = {{fontSize : "15px"}}>23</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>7C</td>
              <td  style = {{fontSize : "15px"}}>2 - 2.5 Years</td>
              <td  style = {{fontSize : "15px"}}>15.3</td>
              <td  style = {{fontSize : "15px"}}>24</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>8C</td>
              <td  style = {{fontSize : "15px"}}>2.5 - 3 Years</td>
              <td  style = {{fontSize : "15px"}}>16</td>
              <td  style = {{fontSize : "15px"}}>25</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>9C</td>
              <td  style = {{fontSize : "15px"}}>3 - 3.5 Years</td>
              <td  style = {{fontSize : "15px"}}>16.5</td>
              <td  style = {{fontSize : "15px"}}>26</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>10C</td>
              <td  style = {{fontSize : "15px"}}>3.5 - 4 Years</td>
              <td  style = {{fontSize : "15px"}}>17.5</td>
              <td  style = {{fontSize : "15px"}}>27</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>11C</td>
              <td  style = {{fontSize : "15px"}}>4 - 4.5 Years</td>
              <td  style = {{fontSize : "15px"}}>19.4</td>
              <td  style = {{fontSize : "15px"}}>28</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>1</td>
              <td  style = {{fontSize : "15px"}}>7.5 - 8 Years</td>
              <td  style = {{fontSize : "15px"}}>21.2</td>
              <td  style = {{fontSize : "15px"}}>33</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>2</td>
              <td  style = {{fontSize : "15px"}}>8.5 - 9 Years </td>
              <td  style = {{fontSize : "15px"}}>22.2</td>
              <td  style = {{fontSize : "15px"}}>33</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>3</td>
              <td  style = {{fontSize : "15px"}}>9.5 - 10 Years</td>
              <td  style = {{fontSize : "15px"}}>22.6</td>
              <td  style = {{fontSize : "15px"}}>34</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>4</td>
              <td  style = {{fontSize : "15px"}}>10.5 - 11 Years</td>
              <td  style = {{fontSize : "15px"}}>23</td>
              <td  style = {{fontSize : "15px"}}>38</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>5</td>
              <td  style = {{fontSize : "15px"}}>11 - 11.5 Years</td>
              <td  style = {{fontSize : "15px"}}>24</td>
              <td  style = {{fontSize : "15px"}}>39</td>
            </tr>
            <tr>
              <td  style = {{fontSize : "15px"}}>6</td>
              <td  style = {{fontSize : "15px"}}>12 - 13 Years</td>
              <td  style = {{fontSize : "15px"}}>25</td>
              <td  style = {{fontSize : "15px"}}>40</td>
            </tr>
          </tbody>
        </table>
</div></div>
      </div>
    </React.Fragment>
  );
};
export default SizeChart;