import React, {useCallback, useEffect, useState} from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import Pagination from "@atlaskit/pagination";
import Avatar from "@atlaskit/avatar";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import RetryIcon from "@atlaskit/icon/glyph/retry";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import EditUserModal from "./modal/EditUserModal";
import DeleteUserModal from "./modal/DeleteUserModal";
import {getAllUsers} from "../../../api/authApi";
import "../User/user.css";
import {Link} from "react-router-dom";
import SearchForm from "../User/SearchForm";

const Users = () => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchData, setSearchParams] = useState({});

  const handleSearchDataChange = (newSearchData) => {
    setSearchParams(newSearchData);
  };

  const handleCreate = () => {
    setIsCreateModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete user:", selectedUser);

    setIsDeleteModalOpen(false);
  };

  // Mở modal khi nhấn Edit
  const openModal = (action, user) => {
    setSelectedUser(user);

    switch (action) {
      case "edit":
        setIsEditModalOpen(true);
        break;
      case "delete":
      case "restore":
        setIsDeleteModalOpen(true);
        break;
      case "create":
        setIsCreateModalOpen(true);
        break;
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsCreateModalOpen(false);

    submitSearchForm(searchData);
  };

  const submitSearchForm = (searchData) => {
    setIsLoading(true);

    getAllUsers(searchData).then((response) => {
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
          {key: "dateOfBirth", content: user.dateOfBirth || "Unknown"},
          {key: "status", content: user.status === 0 ? "Active" : "Inactive"},
          {key: "blackList", content: user.blackList ? "Yes" : "No"},
          {
            key: "actions",
            content: (
              <div className='action-group'>
                <button
                  className='edit-buttons'
                  appearance='subtle'
                  onClick={() => {
                    openModal("edit", user);
                  }}>
                  <EditIcon label='Edit' size='medium' />
                </button>
                <button
                  className={
                    user.deleted ? "restore-buttons" : "delete-buttons"
                  }
                  appearance='subtle'
                  onClick={() => {
                    if (user.deleted) {
                      openModal("restore", user); // Xử lý khôi phục user
                    } else {
                      openModal("delete", user); // Mở modal xác nhận xóa
                    }
                  }}>
                  {user.deleted ? (
                    <RetryIcon label='restore' size='medium' />
                  ) : (
                    <TrashIcon label='Delete' size='medium' />
                  )}
                </button>
              </div>
            ),
          },
        ],
      }));

      setRows(newRows);
      setPage(data.page);
      setTotal(data.total);
      setIsLoading(false);
    });
  };

  const head = {
    cells: [
      {key: "fullName", content: "Full Name", isSortable: true},
      {key: "email", content: "Email", isSortable: true},
      {key: "dateOfBirth", content: "Date Of Birth", isSortable: true},
      {key: "status", content: "Status", isSortable: true},
      {key: "blackList", content: "Black List", isSortable: true},
      {key: "actions", content: "Actions"},
    ],
  };

  return (
    <div id='userPage'>
      <SearchForm
        submitSearchForm={submitSearchForm}
        onSearchChange={handleSearchDataChange}
        openCreateModal={() => {
          openModal("create");
        }}
      />

      <DynamicTable
        head={head}
        rows={rows}
        rowsPerPage={10}
        defaultPage={1}
        onSetPage={setPage}
        isRankable
        isLoading={isLoading}
        loadingSpinnerSize='large'
        caption='List of Users'
      />
      <div
        style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
        <Pagination
          pages={[...Array(Math.ceil(total / 10)).keys()].map((i) => i + 1)}
          onChange={(e, newPage) => setPage(newPage)}
        />
      </div>

      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <ModalHeader>
            <ModalTitle>Create User</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Create user</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
            <button onClick={() => handleCreate()}>Save</button>
          </ModalFooter>
        </Modal>
      )}

      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={closeModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteUserModal
          user={selectedUser}
          isOpen={isDeleteModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
