export interface IGroupDeleteModalComponent {
  open: boolean;
  setOpen: (val: boolean) => void;
  setSelectedCategories?: (val: any) => void;
  selectedCategories?: Array<string>;
}
