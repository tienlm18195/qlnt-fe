import React, { useState, useEffect } from "react";

import AddIcon from '@atlaskit/icon/glyph/add';
import "../User/user.css";

const SearchForm = ({ submitSearchForm, onSearchChange, openCreateModal }) => {
  const [searchData, setSearchData] = useState({
    fullName: "",
    email: "",
    phone: "",
    identityNumber: "",
    address: "",
    isBlackList: false,
    isDeleted: false,
    status: 0,
    page: 0,
    size: 10,
  });

  useEffect(() => {
    submitSearchForm(searchData);
    onSearchChange?.(searchData); 
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    onSearchChange?.(searchData); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitSearchForm(searchData);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Cột 1 */}
      <div className="form-column">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={searchData.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={searchData.email} onChange={handleChange} />
        </div>
      </div>

      {/* Cột 2 */}
      <div className="form-column">
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={searchData.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Identity Number</label>
          <input type="text" name="identityNumber" value={searchData.identityNumber} onChange={handleChange} />
        </div>
      </div>

      {/* Cột 3 */}
      <div className="form-column">
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={searchData.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={searchData.status} onChange={handleChange}>
            <option value="">All</option>
            <option value="0">Active</option>
            <option value="1">Inactive</option>
          </select>
        </div>
      </div>

      {/* Cột Checkbox */}
      <div className="checkbox-column">
        <div className="checkbox-group">
          <input type="checkbox" name="isBlackList" checked={searchData.isBlackList} onChange={handleChange} />
          <label>Blacklist</label>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" name="isDeleted" checked={searchData.isDeleted} onChange={handleChange} />
          <label>Deleted</label>
        </div>
      </div>

      <div className="form-actions">
        <button className='create-buttons' type='button' onClick={openCreateModal}>
          <AddIcon label="New" size='small'/>
          <span>New</span>
        </button>
      </div>
      
      {/* Button Search căn giữa */}
      <div className="form-actions">
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchForm;
