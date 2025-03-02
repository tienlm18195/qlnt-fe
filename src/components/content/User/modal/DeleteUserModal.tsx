import React, { useState, useEffect } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@atlaskit/modal-dialog";
import {deleteUserById} from "../../../../api/authApi";

const DeleteUserModal = ({ user, isOpen, onClose }) => {
    const handleSubmit = () => {
        deleteUserById(user.userId).then(res => {
            console.log('RES', res)
        })

        onClose();
    };

  return (
    isOpen && (
        <Modal onClose={onClose}>
          <ModalHeader>
            <ModalTitle>Confirm {user.deleted ? "Restore" : "Delete"}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to {user.deleted ? "restore" : "delete"} {user?.fullName}?</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() => {
                handleSubmit();
              }}>
              {user.deleted ? "Restore" : "Delete"}
            </button>
          </ModalFooter>
        </Modal>
    )
  );
};

export default DeleteUserModal;
