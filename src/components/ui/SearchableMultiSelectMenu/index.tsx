import { useFormUtils } from "@/app/hooks/useFormUtils";
import { useAfterFirstRender } from "@/app_redux/ui_hooks/useAfterFirstRender";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import FormFieldErrors from "../Reusable/FromFiledError";
import { ISearchableMultiSelectMenu, ISelectMenuItemData } from "../interface";

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
  const [selectedOptions, setSelectedOptions] = useState<
    Array<ISelectMenuItemData>
  >([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? props?.selectItems
      : props?.selectItems.filter((item) =>
          item?.title
            ?.toLowerCase()
            ?.replace(/\s+/g, "")
            ?.includes(query?.toLowerCase()?.replace(/\s+/g, ""))
        );

  const reducedErrorMessages = deduceFormFieldErrors(errorMessages, fieldError);
  const isValid: boolean = isFormFieldValid(reducedErrorMessages);

  const handleSelectItems = (items: ISelectMenuItemData[]) => {
    const selectedItems = items?.filter((i) => i !== null);
    setSelectedOptions(selectedItems);
    if (onSelectItem) {
      onSelectItem(selectedItems);
    }
  };

  useAfterFirstRender(() => {
    if (selectAll) {
      handleSelectItems(filteredItems);
    } else {
      handleSelectItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedOptions(defaultSelected);
  }, [defaultSelected]);

  useEffect(() => {
    if (props?.selectItems?.length === 0) return;
    if (defaultSelectedIds === undefined) {
      setSelectedOptions(null);
    } else {
      setSelectedOptions(
        props?.selectItems?.filter((i) => defaultSelectedIds.includes(i.id))
      );
    }
  }, [defaultSelectedIds]);

  useAfterFirstRender(() => {
    if (
      props?.selectItems?.length > 0 &&
      props?.defaultSelectAll === true &&
      !selectAll
    ) {
      setSelectAll(true);
    }
  }, [props?.selectItems?.length, props?.defaultSelectAll]);

  useAfterFirstRender(() => {
    if (
      props?.selectItems?.length > 0 &&
      selectedOptions?.length === 0 &&
      selectAll
    ) {
      setSelectAll(false);
    }
  }, [props?.selectItems?.length]);

  const showFieldErrors =
    showTypedErrors && showTypedErrors === true
      ? true
      : showTypedErrors === false
        ? false
        : true;

  const renderDisplay = (items: ISelectMenuItemData[]) => {
    if (!items) return "";
    if (props?.expandedInputValue && props?.expandedInputValue === true) {
      const titles = items.map((i) => i.title);
      return titles.join(", ");
    }
    if (items?.length === 0) {
      return "";
    } else if (items?.length === 1) {
      return items[0]?.title;
    } else {
      let label = items[0]?.title ?? "";
      label = label?.length > 15 ? `${label.substring(0, 15)}..` : label;
      return `${label} , +${items.length - 1}`;
    }
  };

  const renderEmtpyState = (cascadeMenuOpen: boolean) => {
    if (props?.watchCascadeSelectMenuState) {
      props?.watchCascadeSelectMenuState(cascadeMenuOpen);
    }
    return null;
  };

  return (
    <div
      style={props?.style ?? {}}
      className={clsx("relative", props?.containerClassName ?? "")}
    >
      <Combobox
        disabled={props?.disabled && props?.disabled === true ? true : false}
        value={selectedOptions ?? []}
        onChange={(items: ISelectMenuItemData[]) => {
          handleSelectItems(items);
        }}
        multiple
        nullable
      >
        {({ open }) => {
          {
            renderEmtpyState(open);
          }
          return (
            <>
              {props?.label && (
                <span className="absolute -top-4 text-xs left-1 text-[#808DA0] font-medium z-10">
                  {props?.label}
                </span>
              )}
              <div className="relative  w-full">
                {!props?.isCascaded ? (
                  asButton ? (
                    <Combobox.Button>{renderAsButton}</Combobox.Button>
                  ) : (
                    <div
                      className={clsx(
                        "relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left  focus:outline-none focus-visible:ring-1 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm",
                        !isValid && "border-none ",
                        props?.disabled && "bg-gray-100"
                      )}
                    >
                      <Combobox.Button className={"w-full"}>
                        <Combobox.Input
                          className={clsx(
                            `w-full text-left text-xs font-medium  rounded-lg py-2 pl-3 pr-10 text-black leading-6  focus:ring-0 ${className}`,
                            isValid
                              ? "text-black border-none outline-none font-medium"
                              : "text-red-600  border border-red-500  outline-red-500 font-medium placeholder-red-400",
                            props?.disabled &&
                              props?.disabled === true &&
                              "bg-gray-200"
                          )}
                          displayValue={(items: ISelectMenuItemData[]) => {
                            return renderDisplay(items);
                          }}
                          autoComplete="off"
                          placeholder={props?.placeholder ?? "Select Multiple"}
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </Combobox.Button>
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Combobox.Button>
                    </div>
                  )
                ) : (
                  <div
                    className={clsx(
                      "relative  cursor-default overflow-hidden rounded-lg  bg-white text-left  focus:outline-none w-64 focus-visible:ring-1 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm",
                      !isValid && "border-none ",
                      props?.disabled && "bg-gray-100"
                    )}
                  ></div>
                )}
                {showFieldErrors && (
                  <div className="">
                    <FormFieldErrors errors={reducedErrorMessages} />
                  </div>
                )}
                <Transition
                  show={props?.cascadeState ? props?.cascadeState : open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options
                    // style={{ zIndex: 1 }}
                    className={clsx(
                      "absolute   mt-1 w-full  overflow-auto  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none max-h-60 sm:text-sm",
                      listBoxClassName ? listBoxClassName : ""
                      //   props?.listZIndex ? props?.listZIndex : "z-50"
                    )}
                  >
                    {props?.withDropDownSearch &&
                      props?.withDropDownSearch === true && (
                        <Combobox.Option
                          value={null}
                          className={"w-full pl-2"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <div className="flex justify-start items-center">
                            <span>
                              <MagnifyingGlassIcon className="w-3 h-3" />
                            </span>
                            <input
                              onChange={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setQuery(e.target.value);
                              }}
                              className="w-full text-black border-t-0 border-l-0 border-r-0  outline-none ring-0 border-b text-xs pl-2 pr-4 border-b-gray-200 focus:ring-0 focus:outline-none "
                              type="text"
                              placeholder="Search withing options"
                            />
                          </div>
                        </Combobox.Option>
                      )}
                    {props?.withSelectAll === true && query?.length === 0 && (
                      <Combobox.Option
                        className={({ selected: _l }) =>
                          clsx(
                            "relative cursor-pointer flex font-medium pr-4 pl-2 text-xs justify-between items-center select-none py-2 text-center ",
                            selectAll
                              ? "bg-gray-100 hover:bg-gray-100 text-gray-800 font-medium "
                              : "text-gray-800 hover:bg-gray-800 hover:text-white",
                            itemsClassName && itemsClassName !== ""
                              ? itemsClassName
                              : ""
                          )
                        }
                        onClick={() => setSelectAll(!selectAll)}
                        value={null}
                      >
                        <div className="w-full flex justify-start items-center">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            className="h-4 w-4  rounded border-gray-300 text-black focus:ring-black accent-black"
                          />
                          <span
                            className={`inline-block pl-2  text-left truncate ${selectAll ? "font-medium " : "font-normal"}`}
                          >
                            {props?.selectAllTitle
                              ? props?.selectAllTitle
                              : "Select All"}
                          </span>
                        </div>
                      </Combobox.Option>
                    )}

                    {filteredItems?.length === 0
                      ? showDropdownWhenNoData &&
                        showDropdownWhenNoData === true && (
                          <div className="absolute border border-gray-200 shadow-md  rounded-md mt-2 w-full cursor-default select-none py-2 px-4 text-gray-700">
                            {noDataDropDownContent ? (
                              noDataDropDownContent
                            ) : (
                              <p className="text-gray-500 text-sm text-center">
                                No Data ...
                              </p>
                            )}
                          </div>
                        )
                      : filteredItems?.length > 0 &&
                        filteredItems?.map((item: ISelectMenuItemData) => (
                          <Combobox.Option
                            key={item.id}
                            className={({ selected: _l }) =>
                              clsx(
                                "relative cursor-pointer flex font-medium pr-4 pl-2 text-xs justify-between items-center select-none py-2 text-center ",
                                selectedOptions?.find(
                                  (so) => so?.id === item.id
                                )
                                  ? "bg-gray-100 hover:bg-gray-100 text-gray-800 font-medium "
                                  : "text-gray-800 hover:bg-gray-800 hover:text-white",
                                itemsClassName && itemsClassName !== ""
                                  ? itemsClassName
                                  : ""
                              )
                            }
                            data-tooltip-place="right"
                            data-tooltip-id={`option-tooltip:${register?.name}`}
                            data-tooltip-content={item.title}
                            value={item}
                          >
                            {({ selected: _l, active: _isActive }) => (
                              <div
                                key={`option:${item.id}`}
                                className="w-full flex justify-start items-center"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedOptions?.find(
                                      (so) => so?.id === item?.id
                                    )
                                      ? true
                                      : false
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                                />
                                <div className="w-full flex justify-start items-center gap-x-2 ml-2">
                                  {props?.iconURLKey &&
                                    props?.iconURLKey !== "" && (
                                      <img
                                        data-tooltip-id={`icon:${register.name}`}
                                        data-tooltip-content={
                                          item?.state[props?.iconURLKey]
                                        }
                                        src={item?.state[props?.iconURLKey]}
                                        className="w-6 h-6"
                                        alt={`Icon:${item.title}`}
                                      />
                                    )}
                                  <span
                                    className={`inline-block pl-2  text-left truncate ${
                                      selectedOptions?.find(
                                        (so) => so?.id === item?.id
                                      )
                                        ? "font-medium "
                                        : "font-normal"
                                    }`}
                                  >
                                    {item.title}
                                  </span>
                                </div>
                              </div>
                            )}
                          </Combobox.Option>
                        ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </>
          );
        }}
      </Combobox>

      {showTooltips && showTooltips === true && (
        <Tooltip
          id={`option-tooltip:${register?.name}`}
          style={{ zIndex: 5, fontSize: "10px" }}
        />
      )}
    </div>
  );
};

export default SearchableMultiSelectMenu;
