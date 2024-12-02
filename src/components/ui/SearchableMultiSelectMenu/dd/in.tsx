import { useFormUtils } from "@/app/hooks/useFormUtils";
import { useAfterFirstRender } from "@/app_redux/ui_hooks/useAfterFirstRender";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  ISearchableMultiSelectMenu,
  ISelectMenuItemData,
} from "../../interface";
import FormFieldErrors from "../../Reusable/FromFiledError";

const SearchableMultiSelectMenu: React.FC<ISearchableMultiSelectMenu> = ({
  onSelectItem,
  errorMessages,
  register,
  fieldError,
  showTypedErrors,
  asButton,
  renderAsButton,
  itemsClassName,
  showDropdownWhenNoData,
  defaultSelected,
  defaultSelectedIds,
  noDataDropDownContent,
  listBoxClassName,
  showTooltips,
  className,
  ...props
}) => {
  const { deduceFormFieldErrors, isFormFieldValid } = useFormUtils();
  const [selectedOptions, setSelectedOptions] = useState<ISelectMenuItemData[]>(
    []
  );
  const [selectAll, setSelectAll] = useState(false);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? props?.selectItems
      : props?.selectItems.filter((item) =>
          item?.title?.toLowerCase()?.includes(query.toLowerCase())
        );

  const reducedErrorMessages = deduceFormFieldErrors(errorMessages, fieldError);
  const isValid = isFormFieldValid(reducedErrorMessages);

  const updateSelectAllState = (items: ISelectMenuItemData[]) => {
    setSelectAll(
      items.length > 0 &&
        items.length === filteredItems.length &&
        filteredItems.every((item) =>
          items?.some((selectedItem) => selectedItem?.id === item?.id)
        )
    );
  };

  const handleSelectItems = (items: ISelectMenuItemData[]) => {
    setSelectedOptions(items);
    updateSelectAllState(items);

    if (onSelectItem) {
      onSelectItem(items);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      handleSelectItems([]);
    } else {
      handleSelectItems(filteredItems);
    }
  };

  const handleItemToggle = (item: ISelectMenuItemData) => {
    const isSelected = selectedOptions.some(
      (selectedItem) => selectedItem.id === item.id
    );

    const updatedItems = isSelected
      ? selectedOptions.filter((i) => i.id !== item.id)
      : [...selectedOptions, item];

    handleSelectItems(updatedItems);
  };

  useAfterFirstRender(() => {
    if (defaultSelected) {
      setSelectedOptions(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    if (defaultSelectedIds) {
      const selectedItems = props?.selectItems.filter((item) =>
        defaultSelectedIds.includes(item.id)
      );
      setSelectedOptions(selectedItems);
    }
  }, [defaultSelectedIds]);

  const renderDisplay = (items: ISelectMenuItemData[]) => {
    if (!items.length) return "";
    if (props?.expandedInputValue) {
      return items?.map((i) => i?.title)?.join(", ");
    }
    if (items?.length === 1) return items[0]?.title;
    return `${items[0].title}, +${items.length - 1}`;
  };

  const renderEmptyState = (open: boolean) => {
    if (props?.watchCascadeSelectMenuState) {
      props?.watchCascadeSelectMenuState(open);
    }
    return null;
  };

  return (
    <div
      className={clsx("relative", props?.containerClassName)}
      style={props?.style}
    >
      <Combobox
        disabled={!!props?.disabled}
        value={selectedOptions}
        onChange={handleSelectItems}
        multiple
        nullable
      >
        {({ open }) => {
          renderEmptyState(open);

          return (
            <>
              {props?.label && (
                <span className="absolute -top-4 text-xs left-1 text-[#808DA0] font-medium z-10">
                  {props?.label}
                </span>
              )}
              <div className="relative w-full">
                {asButton ? (
                  <Combobox.Button>{renderAsButton}</Combobox.Button>
                ) : (
                  <div
                    className={clsx(
                      "relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left focus:outline-none sm:text-sm",
                      !isValid && "border-red-500",
                      props?.disabled && "bg-gray-100"
                    )}
                  >
                    <Combobox.Button className="w-full">
                      <Combobox.Input
                        className={clsx(
                          "w-full text-xs font-medium rounded-lg py-2 pl-3 pr-10 text-black leading-6 focus:ring-0",
                          className,
                          !isValid && "text-red-600 border-red-500",
                          props?.disabled && "bg-gray-200"
                        )}
                        displayValue={renderDisplay}
                        placeholder={props?.placeholder || "Select Multiple"}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                      />
                    </Combobox.Button>
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                )}
                {showTypedErrors && (
                  <FormFieldErrors errors={reducedErrorMessages} />
                )}
                <Transition
                  show={props?.cascadeState || open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options
                    className={clsx(
                      "absolute mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
                      listBoxClassName
                    )}
                  >
                    {props?.withDropDownSearch && (
                      <div className="flex items-center px-2 py-1">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full px-2 py-1 text-xs focus:outline-none border-b"
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                    )}
                    {props?.withSelectAll && query === "" && (
                      <Combobox.Option
                        className="flex items-center px-4 py-2 text-xs cursor-pointer"
                        onClick={toggleSelectAll}
                        value={null}
                      >
                        <input
                          type="checkbox"
                          checked={selectAll}
                          className="h-4 w-4 rounded border-gray-300 text-black"
                          readOnly
                        />
                        <span className="ml-2">
                          {props?.selectAllTitle || "Select All"}
                        </span>
                      </Combobox.Option>
                    )}
                    {filteredItems.length === 0
                      ? showDropdownWhenNoData && (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            {noDataDropDownContent || "No Data..."}
                          </div>
                        )
                      : filteredItems.map((item) => (
                          <Combobox.Option
                            key={item.id}
                            className={({ active }) =>
                              clsx(
                                "flex items-center px-4 py-2 text-xs cursor-pointer",
                                active && "bg-gray-200"
                              )
                            }
                            value={item}
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedOptions?.length > 0
                                  ? selectedOptions?.some(
                                      (i) => i?.id === item?.id
                                    )
                                  : false
                              }
                              className="h-4 w-4 rounded border-gray-300 text-black"
                              onChange={() => handleItemToggle(item)}
                              readOnly
                            />
                            <span className="ml-2">{item?.title}</span>
                          </Combobox.Option>
                        ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </>
          );
        }}
      </Combobox>
      {showTooltips && (
        <Tooltip
          id={`option-tooltip:${register?.name}`}
          style={{ zIndex: 5, fontSize: "10px" }}
        />
      )}
    </div>
  );
};

export default SearchableMultiSelectMenu;
