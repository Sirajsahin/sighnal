import { ReactNode } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  Message,
  UseFormRegisterReturn,
} from "react-hook-form";

export type IMessageErrorType = string;

export interface IFormFieldErrorMessages {
  type: IMessageErrorType;
  message: string;
}

export interface IUseFormRegister {
  register: UseFormRegisterReturn<string>;
}

export type ReducedErrorMessages = {
  [key in IMessageErrorType]: Message;
};

export interface IFormComponents {
  key?: string;
  fieldError?:
    | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
    | FieldError
    | undefined;
  errorMessages: IFormFieldErrorMessages[];
}

//TeaxtArea interface

export interface ITextarea
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    IFormComponents,
    IUseFormRegister {
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  inputClassName?: string;
  rows?: number;
}

// Inputs Interfaces
export interface IInput
  extends React.AllHTMLAttributes<HTMLInputElement>,
    IFormComponents,
    IUseFormRegister {
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  inputClassName?: string;
  labelName?: string;
  isMandatory?: boolean;
  fieldError?:
    | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
    | FieldError
    | undefined;
}

export interface IInputWithFileUpload
  extends React.AllHTMLAttributes<HTMLInputElement>,
    IFormComponents,
    IUseFormRegister {
  variant: "DRAG_AND_DROP" | "SIMPLE";
  fieldError?:
    | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
    | FieldError
    | undefined;
  inputClassName?: string;
  onClear?: () => void;
  onUploadSuccess?: () => void;
  onFileRemove?: (Files?: File[]) => void;
  isMultiple?: boolean;
  dragAndDropIcon?: React.ReactNode;
  files?: FileList;
  onFileUploaded?: (data: any[]) => void;
  type?: string;
  fileType?: string;

  dragAndDropDescription?: {
    allowedFormats: string[];
    maxFileSize: string;
  };
}

// Calendar Interfaces

export interface IPWLCalendar extends IFormComponents, IUseFormRegister {
  selectedDate?: Date;
  showLeftNav?: boolean;
  label?: string;
  disabled?: boolean;
  showTypedErrors?: boolean;
  onSelectDate?: (date: Date) => void;
  className?: string;
  containerClassName?: string;
  allowPastDaySelection?: boolean;
  blockFutureDaySelection?: boolean;
  nextWeekHandelFunction?: () => void;
  prevWeekHandelFunction?: () => void;
  displayDateString?: string;
  disableDatesBeforeDate?: string;
  defaultSelectedDate?: string;
  disableDatesAfterDate?: string;
  disabledAfterYear?: number;
  blockAfterMonthSelection?: number;
  disabledAfterMonth?: number;
  disabledFutureDateYearMonthSelection?: boolean;
}

export interface ICalendar extends IFormComponents, IUseFormRegister {
  placeholder?: string;
  onDateSelect: (date: Date | null) => void;
  disabled?: boolean;
  selectDefaultDate?: string;
}

// Select Menu Interfaces

export interface ISelectMenuItemData {
  title: string;
  id: string;
  workspace_id?: string;
  state?: any;
  checkboxVisible?: boolean;
  withSubItems?: boolean;
  subSelectItems?: SelectMenuItems;
}

export interface ICascadeSelectMenuItemData {
  title: string;
  id: string;
  subSelectItems: ISelectMenuItemData[];
  state?: any;
}

export type SelectMenuItems = ISelectMenuItemData[];

export interface ISearchableSelectMenu
  extends IFormComponents,
    IUseFormRegister,
    React.AllHTMLAttributes<HTMLInputElement> {
  selectItems: SelectMenuItems;
  containerClassName?: string;
  label?: string;
  variant?: "LIKE_INPUT" | "LIKE_TEXT";
  withDropDownSearch?: boolean;
  showTooltips?: boolean;
  showDropdownWhenNoData?: boolean;
  dropdownNoDataContent?: React.ReactNode;
  showDropdownIcon?: boolean;
  disabledTooltipContent?: string;
  disableSearch?: boolean;
  isSearchLoading?: boolean;
  extraInfoNode?: React.ReactNode;
  itemsClassName?: string;
  defaultSelected?: ISelectMenuItemData;
  listBoxClassName?: string;
  onInputChange?: (value: string) => void;
  onSelectItem?: (item: ISelectMenuItemData | null) => void;
  showSearchInputInDropdown?: boolean;
  showTypedErrors?: boolean;
  isMultiSelect?: boolean;
  defaultSelectId?: string;
  addAction?: { title: React.ReactNode; callBack: (query?: string) => void };
}

export interface ICascadingSearchableMultiSelectMenu
  extends IFormComponents,
    IUseFormRegister,
    React.AllHTMLAttributes<HTMLInputElement> {
  selectItems: ICascadeSelectMenuItemData[];
  label?: string;
  containerClassName?: string;
  showTooltips?: boolean;
  withSelectAll?: boolean;
  selectAllTitle?: string;
  showDropdownWhenNoData?: boolean;
  noDataDropDownContent?: React.ReactNode;
  showDropdownIcon?: boolean;
  disableSearch?: boolean;
  isSearchLoading?: boolean;
  itemsClassName?: string;
  defaultSelected?: ISelectMenuItemData[];
  defaultSubSelected?: ISelectMenuItemData[];
  listBoxClassName?: string;
  onInputChange?: (value: string) => void;
  onSelectItem?: (item: ICascadeSelectMenuItemData[] | null) => void;
  showTypedErrors?: boolean;
  // Cacading Props
}

export interface IServiceSubServiceSelectMenu
  extends IFormComponents,
    IUseFormRegister,
    React.AllHTMLAttributes<HTMLInputElement> {
  selectItems: SelectMenuItems;
  label?: string;
  containerClassName?: string;
  showTooltips?: boolean;
  withSelectAll?: boolean;
  selectAllTitle?: string;
  showDropdownWhenNoData?: boolean;
  noDataDropDownContent?: React.ReactNode;
  showDropdownIcon?: boolean;
  disableSearch?: boolean;
  isSearchLoading?: boolean;
  itemsClassName?: string;
  defaultSelected?: ISelectMenuItemData[];
  defaultSubItemsSelectedIds?: Array<string>;
  defaultItemSelectedIds?: Array<string>;
  listBoxClassName?: string;
  onInputChange?: (value: string) => void;
  onSelectItem?: (item: ISelectMenuItemData[] | null) => void;
  showTypedErrors?: boolean;
  onSelectSubItem?: (subItems: {
    [key: string]: ISelectMenuItemData[];
  }) => void;
  // Cascading Properties
  isCascaded?: boolean;
  cascadeState?: boolean;
  watchCascadeSelectMenuState?: (state: boolean) => void;
}

export interface ISubOptionObjectType extends ISelectMenuItemData {
  parentId: string;
}

export interface ISelectMenuWithSubOptions {
  /* Classes */
  className?: string;
  disabled?: boolean;
  containerClassName?: string;
  itemsClassName?: string;
  listBoxClassName?: string;
  /* Classes Ends */
  /* Textual Based Starts */
  label?: string;
  selectAllTitle?: string;
  /* Textual Based Ends */
  withDropDownSearch?: boolean;
  placeholder?: string;
  showTooltips?: boolean;
  withSelectAll?: boolean;
  defaultSelectAll?: boolean;
  showDropdownWhenNoData?: boolean;
  noDataDropDownContent?: React.ReactNode;
  showDropdownIcon?: boolean;
  selectItems: SelectMenuItems;
  /* Callbacks */
  onParentItemSelection?: (item: ISelectMenuItemData[] | null) => void;
  onChildItemSelection?: (item: ISubOptionObjectType[] | null) => void;
  defaultSelectedParentIds?: Array<string>;
  defaultSelectedChildIds?: Array<string>;
}

export interface ISearchableMultiSelectMenu
  extends IFormComponents,
    IUseFormRegister,
    React.AllHTMLAttributes<HTMLInputElement> {
  selectItems: SelectMenuItems;
  label?: string;
  iconURLKey?: string;
  withDropDownSearch?: boolean;
  asButton?: any;
  renderAsButton?: any;
  containerClassName?: string;
  showTooltips?: boolean;
  withSelectAll?: boolean;
  defaultSelectAll?: boolean;
  selectAllTitle?: string;
  showDropdownWhenNoData?: boolean;
  expandedInputValue?: boolean;
  noDataDropDownContent?: React.ReactNode;
  showDropdownIcon?: boolean;
  disableSearch?: boolean;
  isSearchLoading?: boolean;
  itemsClassName?: string;
  defaultSelected?: ISelectMenuItemData[];
  defaultSelectedIds?: Array<string>;
  listBoxClassName?: string;
  onInputChange?: (value: string) => void;
  onSelectItem?: (item: ISelectMenuItemData[] | null) => void;
  showTypedErrors?: boolean;
  // Cascading Properties
  isCascaded?: boolean;
  cascadeState?: boolean;
  onRecentItemSelection?: (item: ISelectMenuItemData | null) => void;
  watchCascadeSelectMenuState?: (state: boolean) => void;
}

export interface IGeoSearchSelectMenu
  extends IFormComponents,
    IUseFormRegister,
    React.AllHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  showTooltips?: boolean;
  showDropdownWhenNoData?: boolean;
  showDropdownIcon?: boolean;
  label?: string;
  clearSearch?: boolean;
  disableSearch?: boolean;
  isSearchLoading?: boolean;
  itemsClassName?: string;
  defaultAddressString?: string;
  listBoxClassName?: string;
  labelInfo?: string;
  onInputChange?: (value: string) => void;
  onSelectItem?: (item: ISelectMenuItemData | null) => void;
  showTypedErrors?: boolean;
  withClearAction?: boolean;
  onClear?: () => void;
}

export interface IAgeSelectMenu {
  yearRegister: UseFormRegisterReturn<string>;
  monthRegister: UseFormRegisterReturn<string>;
  dayRegister: UseFormRegisterReturn<string>;
  defaultValues?: { year: string; month: string; day: string };
  yearFieldError:
    | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
    | FieldError;

  monthFieldError:
    | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
    | FieldError;

  dayFieldError:
    | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
    | FieldError;

  onYearSelect?: (year: string) => void;
  onMonthSelect?: (month: string) => void;
  onDaySelect?: (day: string) => void;
  disabled?: boolean;
}

// Interfaces Checkboxes

export interface ICheckbox
  extends IFormComponents,
    IUseFormRegister,
    React.AllHTMLAttributes<HTMLInputElement> {
  labelTitle?: string;
  description?: string;
  circular?: boolean;
  colorHash?: string;
  onCheckChange?: (checked: boolean) => void;
}

export interface IClipboardComponentProps {
  copyId: string;
  text: string;
  onCopyText?: string;
  tooltipText?: string;
  className?: string;
}

export interface INoREcordFound {
  message: string;
  description?: string;
  imageURL?: string;
  className?: string;
}

export interface IRadioGroupOption {
  id: string;
  title: string;
  colorClassName?: string;
}

export interface IRadioGroup extends IFormComponents, IUseFormRegister {
  groupOptions: IRadioGroupOption[];
  alignment: "vertical" | "horizontal";
  defaultSelectedId?: string;
  onRadioChange?: (optionId: string) => void;
  containerClassName?: string;
  radioGroupClassName?: string;
  radioOptionClassName?: string;
}
