import React, { useState, useEffect } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@atlaskit/modal-dialog";
import Form, { Field, ErrorMessage } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import { DatePicker } from "@atlaskit/datetime-picker";
import {getUserDetailById, updateUserById} from "../../../../api/authApi";

const EditUserModal = ({ user, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    workPlace: "",
    identityNumber: "",
    role: "",
    status: 0,
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserDetailById(user.userId).then((res) => {
    const user = res.data;

    if (user) {
        setUserId(user.userId);

        setFormData({
            fullName: user.fullName || "",
            email: user.email || "",
            phone: user.phone || "",
            dateOfBirth: user.dateOfBirth || "",
            address: user.address || "",
            workPlace: user.workPlace || "",
            identityNumber: user.identityNumber || "",
            role: user.role || "",
            status: user.status || 0,
        });
        }
    });
    
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (data) => {

    console.log('formData', userId)
    if (typeof data.status === "object" && data.status?.value !== undefined) {
        data.status = data.status.value;
    }
    if (typeof data.role === "object" && data.role?.value !== undefined) {
        data.role = data.role.value;
    }
    updateUserById(userId, data).then(res => {
        console.log('RES', res)
    })

    onClose();
  };

  return (
    isOpen && (
        <Modal onClose={onClose}>
           <ModalHeader>
          <ModalTitle>Edit User</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(data) => {
                handleSubmit(data);
            }}
          >
            {({ formProps }) => (
              <form {...formProps} className="edit-user-form">
                <div className="form-grid">
                  {/* Full Name */}
                  <Field name="fullName" defaultValue={formData.fullName} label="Full Name" isRequired>
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                  </Field>

                  {/* Email */}
                  <Field name="email" defaultValue={formData.email} label="Email" isRequired validate={(value) => !value.includes("@") ? "Invalid email" : undefined}>
                    {({ fieldProps, error }) => (
                      <>
                        <Textfield {...fieldProps} />
                        <ErrorMessage>{error}</ErrorMessage>
                      </>
                    )}
                  </Field>

                  {/* Phone */}
                  <Field name="phone" defaultValue={formData.phone} label="Phone">
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                  </Field>

                  {/* Date of Birth */}
                  <Field name="dateOfBirth" defaultValue={formData.dateOfBirth} label="Date of Birth">
                    {({ fieldProps }) => (
                      <DatePicker defaultValue={formData.dateOfBirth} {...fieldProps} onChange={(value) => setFormData({ ...formData, dateOfBirth: value })} />
                    )}
                  </Field>

                  {/* Address */}
                  <Field name="address" defaultValue={formData.address} label="Address">
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                  </Field>

                  {/* Work Place */}
                  <Field name="workPlace" defaultValue={formData.workPlace} label="Work Place">
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                  </Field>

                  {/* Identity Number */}
                  <Field name="identityNumber" defaultValue={formData.identityNumber} label="Identity Number">
                    {({ fieldProps }) => <Textfield {...fieldProps} />}
                  </Field>

                  {/* Role */}
                  <Field name="role" defaultValue={{ label: formData.role, value: formData.role }} label="Role">
                    {({ fieldProps }) => (
                      <Select
                        {...fieldProps}
                        options={[
                          { label: "Admin", value: "ADMIN" },
                          { label: "User", value: "USER" },
                        ]}
                      />
                    )}
                  </Field>

                  {/* Status */}
                  <Field name="status" defaultValue={{ label: formData.status === 0 ? "Active" : "Inactive", value: formData.status }} label="Status">
                    {({ fieldProps }) => (
                      <Select
                        {...fieldProps}
                        options={[
                          { label: "Active", value: 0 },
                          { label: "Inactive", value: 1 },
                        ]}
                      />
                    )}
                  </Field>
                </div>

                {/* Footer */}
                <ModalFooter>
                  <button type="button" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                </ModalFooter>
              </form>
            )}
          </Form>
        </ModalBody>
      </Modal>
    )
  );
};

export default EditUserModal;
