export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  modified: Date;
  path: string;
}

export interface FolderItem {
  id: string;
  name: string;
  path: string;
  children: FolderItem[];
}

export interface User {
  name: string;
  email: string;
}