export interface Note {
  _id : string;
  title : string;
  content : string;
  color : string;
  isPinned : boolean;
  isArchived : boolean;
  lastEdited : string | Date;
  isTrashed : boolean;
}