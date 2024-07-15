export interface IGroupDeleteModalComponent {
  open: boolean;
  setOpen: (val: boolean) => void;
  group_id?: string;
  email?:string
}
