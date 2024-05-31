import { get as nestedGet } from "lodash";
import { ISelectMenuItemData } from "./interface";

interface ISelectMenuReducerAllSelectItemOptions {
  title: string;
}
interface ISelectMenuReducerOptions {
  withAllSelectOption?: boolean;
  useIndexAsIds?: boolean;
  stateKey?: string;
  allSelectItemOptions?: ISelectMenuReducerAllSelectItemOptions;
  withSubItems?: boolean;
  reducedSubItems?: ISelectMenuItemData[];
}

function useSelectMenuReducer<T>(
  data: T[] | undefined, // Make sure data is of type T[] or undefined
  titleKey: string,
  idKey: string,
  options?: ISelectMenuReducerOptions
): ISelectMenuItemData[] {
  const selectItems = Array.isArray(data) // Check if data is an array
    ? data.reduce((final, item, currentIndex: number) => {
        const title: string = nestedGet(item, titleKey);
        const id = nestedGet(item, idKey);
        const state =
          options && options?.stateKey !== ""
            ? { [`${options?.stateKey}`]: nestedGet(item, options?.stateKey) }
            : {};
        if (options?.withSubItems && options?.withSubItems === true) {
          final.push({
            title: title?.split("_")?.join(" ") ?? "",
            checkboxVisible: true,
            id:
              options?.useIndexAsIds && options?.useIndexAsIds === true
                ? `option:${currentIndex}`
                : id,
            withSubItems: true,
            subSelectItems: options?.reducedSubItems ?? [],
            state: state,
          });
        } else {
          final.push({
            title: title?.split("_")?.join(" ") ?? "",
            checkboxVisible: true,
            id:
              options?.useIndexAsIds && options?.useIndexAsIds === true
                ? `option:${currentIndex}`
                : id,
            withSubItems: false,
            subSelectItems: [],
            state: state,
          });
        }
        return final;
      }, [] as ISelectMenuItemData[])
    : [];

  return options && options?.withAllSelectOption === true
    ? [
        {
          title:
            options &&
            options?.allSelectItemOptions &&
            options?.allSelectItemOptions?.title
              ? options?.allSelectItemOptions?.title
              : "All",
          id: "-1",
        },
        ...selectItems,
      ]
    : selectItems;
}

export { useSelectMenuReducer };
