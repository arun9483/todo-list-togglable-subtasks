export interface ITask {
  [name: string]: boolean;
}

export interface ITaskList {
  [name: string]: ITask[];
}

// // fix type of title and subtasks, both should be related and derived from ITaskList
export interface ITaskDetails {
  title: keyof ITaskList;
  subtasks: ITask[];
}
