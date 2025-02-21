import React from "react";

interface User {
    userId: string,
    fullName: string,
    email: string,
    birthYear: number,
    avatarPath: string,
    status: number,
    blackList: boolean
}

export const head = {
    cells: [
      { key: 'fullName', content: 'Full Name', isSortable: true },
      { key: 'email', content: 'Email', isSortable: true },
      { key: 'birthYear', content: 'Birth Year', isSortable: true },
      { key: 'status', content: 'Status', isSortable: true },
      { key: 'blackList', content: 'Black List', isSortable: true },
    ],
};