import React, {useCallback, useEffect, useState} from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import Pagination from "@atlaskit/pagination";
import Avatar from "@atlaskit/avatar";
import {getAllUsers} from "../../../api/authApi";
import {head} from "./UserData";
import "../User/user.css";
import {Link} from "react-router-dom";
import SearchForm from "../User/SearchForm";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 10;

  const headTable = head;

  const submitSearchForm = (searchData) => {
    setIsLoading(true);

    getAllUsers(searchData).then((response) => {
      console.log(response);
      const data = response.data;
      const users = data.users;
      const newRows = users.map((user) => ({
        key: user.userId,
        cells: [
          {
            key: "fullName",
            content: (
              <div className='user-info'>
                <Avatar
                  src={user.avatarPath ? user.avatarPath : ""}
                  size='large'
                />
                <Link className='user-name'>{user.fullName}</Link>
              </div>
            ),
          },
          {key: "email", content: user.email || "N/A"},
          {key: "birthYear", content: user.birthYear || "Unknown"},
          {key: "status", content: user.status === 0 ? "Active" : "Inactive"},
          {key: "blackList", content: user.blackList ? "Yes" : "No"},
        ],
      }));

      setRows(newRows);
      setPage(data.page);
      setTotal(data.total);
      setIsLoading(false);
    });
  };

  return (
    <div id='userPage'>
      <SearchForm submitSearchForm={submitSearchForm} />

      {
        <DynamicTable
          head={headTable}
          rows={rows}
          rowsPerPage={pageSize}
          defaultPage={1}
          isFixedSize
          onSetPage={setPage}
          isRankable
          isLoading={isLoading}
          loadingSpinnerSize='large'
          caption='List of Users'
        />
      }
      <div
        style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
        <Pagination
          pages={[...Array(Math.ceil(total / pageSize)).keys()].map(
            (i) => i + 1
          )}
          onChange={(e, newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Users;
