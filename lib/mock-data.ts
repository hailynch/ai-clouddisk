import { FileItem, FolderItem } from "./types";

export const mockFolders: FolderItem[] = [
  {
    id: "1",
    name: "Documents",
    path: "/documents",
    children: [
      {
        id: "1-1",
        name: "Work",
        path: "/documents/work",
        children: [],
      },
      {
        id: "1-2",
        name: "Personal",
        path: "/documents/personal",
        children: [],
      },
    ],
  },
  {
    id: "2",
    name: "Pictures",
    path: "/pictures",
    children: [],
  },
];

export function getMockFiles(path: string): FileItem[] {
  // Root directory
  if (path === "/") {
    return [
      {
        id: "root-1",
        name: "Welcome.txt",
        type: "file",
        size: 1024,
        modified: new Date(2024, 2, 15),
        path: "/Welcome.txt",
      },
    ];
  }

  // Documents directory
  if (path === "/documents") {
    return [
      {
        id: "doc-1",
        name: "Project Proposal.docx",
        type: "file",
        size: 1024 * 1024 * 2.5,
        modified: new Date(2024, 2, 15),
        path: "/documents/Project Proposal.docx",
      },
      {
        id: "doc-folder-1",
        name: "Work",
        type: "folder",
        modified: new Date(2024, 2, 14),
        path: "/documents/work",
      },
      {
        id: "doc-folder-2",
        name: "Personal",
        type: "folder",
        modified: new Date(2024, 2, 14),
        path: "/documents/personal",
      },
    ];
  }

  // Work directory
  if (path === "/documents/work") {
    return [
      {
        id: "work-1",
        name: "Meeting Notes.md",
        type: "file",
        size: 1024 * 512,
        modified: new Date(2024, 2, 16),
        path: "/documents/work/Meeting Notes.md",
      },
      {
        id: "work-2",
        name: "Budget.xlsx",
        type: "file",
        size: 1024 * 1024 * 1.2,
        modified: new Date(2024, 2, 15),
        path: "/documents/work/Budget.xlsx",
      },
    ];
  }

  // Personal directory
  if (path === "/documents/personal") {
    return [
      {
        id: "personal-1",
        name: "Resume.pdf",
        type: "file",
        size: 1024 * 1024,
        modified: new Date(2024, 2, 17),
        path: "/documents/personal/Resume.pdf",
      },
    ];
  }

  // Pictures directory
  if (path === "/pictures") {
    return [
      {
        id: "pic-1",
        name: "Vacation.jpg",
        type: "file",
        size: 1024 * 1024 * 3.5,
        modified: new Date(2024, 2, 18),
        path: "/pictures/Vacation.jpg",
      },
      {
        id: "pic-2",
        name: "Family.jpg",
        type: "file",
        size: 1024 * 1024 * 2.8,
        modified: new Date(2024, 2, 17),
        path: "/pictures/Family.jpg",
      },
    ];
  }

  return [];
}