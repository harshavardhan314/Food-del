import React, { useState, useEffect } from 'react';
import './Listitems.css';
import axios from 'axios';

const Listitems = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch all food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        console.log("Fetched data:", response.data.data);
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Remove an item
  const removeitems = async (itemid) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: itemid });
      if (response.data.success) {
        alert("Removed successfully");
        // Remove it from the local list
        setList((prevList) => prevList.filter((item) => item._id !== itemid));
      } else {
        alert("Error removing item");
      }
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  // Fetch list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p className="cursor" onClick={() => removeitems(item._id)}>
               X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listitems;
