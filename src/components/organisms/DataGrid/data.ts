export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  regStatus: "DONE" | "PROCESSING" | "ERROR" | "REEVALUATED";
  lastLogin: string;
};

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    regStatus: "DONE",
    lastLogin: "2023-03-01 14:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "editor",
    regStatus: "PROCESSING",
    lastLogin: "2023-12-14 09:15",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    regStatus: "ERROR",
    lastLogin: "2023-11-15 14:30",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    regStatus: "REEVALUATED",
    lastLogin: "2023-03-15 14:30",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    regStatus: "DONE",
    lastLogin: "2023-03-15 14:30",
  },
];
