import { useFormUtils } from "@/app/hooks/useFormUtils";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import FormFieldErrors from "../Reusable/FromFiledError";
import {
  ISearchableSelectMenu,
  ISelectMenuItemData,
  SelectMenuItems,
} from "../interface";

const SearchableSelectMenu: React.FC<ISearchableSelectMenu> = ({
  fieldError,
  placeholder,
  defaultSelected,
  className,
  itemsClassName,
  defaultSelectId,
  showDropdownIcon,
  errorMessages,
  showDropdownWhenNoData,
  showTypedErrors,
  showTooltips,
  register,
  disableSearch,
  isMultiSelect,
  onSelectItem,
  listBoxClassName,
  onInputChange,
  addAction,
  ...props
}) => {
  const { deduceFormFieldErrors, isFormFieldValid } = useFormUtils();
  const [selected, setSelected] = useState<ISelectMenuItemData | null>(null);
  const [query, setQuery] = useState<string>("");

  const filteredDataItems: SelectMenuItems =
    query === ""
      ? props?.selectItems
      : props?.selectItems?.filter((item) =>
          item?.title
            ?.toLowerCase()
            ?.replace(/\s+/g, "")
            ?.includes(query.toLowerCase()?.replace(/\s+/g, ""))
        ) ?? [];

  const reducedErrorMessages = deduceFormFieldErrors(errorMessages, fieldError);
  const isValid: boolean = isFormFieldValid(reducedErrorMessages);

  useEffect(() => {
    if (defaultSelected === undefined) {
      setSelected(null);
    } else {
      setSelected(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    if (!defaultSelectId) return;
    if (props?.selectItems?.length === 0) return;
    if (defaultSelectId) {
      setSelected(
        props?.selectItems?.filter((i) => i.id === defaultSelectId)[0]
      );
    }
  }, [defaultSelectId]);

  const showFieldErrors =
    showTypedErrors && showTypedErrors === true
      ? true
      : showTypedErrors === false
        ? false
        : true;

  return (
    <div
      style={props?.style ?? {}}
      className={clsx("relative", props?.containerClassName ?? "")}
    >
      <Combobox
        disabled={props?.disabled && props?.disabled === true ? true : false}
        value={selected}
        onChange={(item) => {
          setSelected(item);
          if (onSelectItem) {
            onSelectItem(item);
          }
        }}
        nullable
      >
        {({ open }) => {
          return (
            <>
              {open && props?.variant && props?.variant === "LIKE_TEXT" && (
                <div className="absolute top-[35px] left-2 shadow-md rounded-sm rotate-45 bg-white p-3 "></div>
              )}
              <div className="relative  w-full mt-1">
                {props?.label && (
                  <span className="absolute text-sm left-1 -top-4 text-gray-500">
                    {props?.label}
                  </span>
                )}
                <div
                  className={clsx(
                    "relative w-full  cursor-default overflow-hidden  text-left rounded-lg border border-gray-300   focus:outline-none  bg-none  sm:text-sm ",

                    props?.variant && props?.variant === "LIKE_TEXT"
                      ? "border-none outline-none ring-0 bg-transparent"
                      : "bg-white "
                  )}
                >
                  <input {...register} hidden />
                  {disableSearch && disableSearch === true ? (
                    <>
                      <Combobox.Button className="w-full flex justify-start items-center">
                        <Combobox.Input
                          readOnly
                          autoComplete="false"
                          autoCorrect="false"
                          placeholder={placeholder}
                          displayValue={(item: ISelectMenuItemData): string => {
                            return item?.title;
                          }}
                          className={clsx(
                            `w-full text-sm  font-medium focus:border-[#333333] rounded-lg py-2 pl-3 pr-10 leading-6   ${className}`,
                            isValid
                              ? "text-black-500 border-none outline-none font-medium "
                              : "text-red-600  ::place  .placeholder-red-500",
                            props?.variant &&
                              props?.variant === "LIKE_INPUT" &&
                              "text-gray-500 border-none outline-none font-medium ",
                            props?.variant &&
                              props?.variant === "LIKE_TEXT" &&
                              "border-t-0 border-l-0 border-r-0  outline-none cursor-pointer ring-0 border-b border-b-red-500",
                            props?.disabled &&
                              props?.disabled === true &&
                              "bg-gray-200"
                          )}
                          onChange={(event) => {
                            setQuery(event.target.value);
                          }}
                        />
                      </Combobox.Button>
                    </>
                  ) : (
                    <Combobox.Button className="w-full">
                      <Combobox.Input
                        autoComplete="off"
                        autoCorrect="false"
                        className={clsx(
                          `w-full text-sm font-normal focus:border-[#333333] rounded-lg py-2 pl-3 pr-10 leading-6  focus:ring-0 ${className}`,
                          isValid
                            ? "text-black-500 border-none outline-none font-medium "
                            : "text-red-600   placeholder-red-400 ",
                          props?.variant &&
                            props?.variant === "LIKE_INPUT" &&
                            "text-gray-500 border-none outline-none font-medium ",
                          props?.variant &&
                            props?.variant === "LIKE_TEXT" &&
                            "border-t-0 border-l-0 border-r-0  outline-none cursor-pointer ring-0 border-b border-b-red-500 ",
                          props?.disabled &&
                            props?.disabled === true &&
                            "bg-gray-200"
                        )}
                        placeholder={placeholder}
                        displayValue={(item: ISelectMenuItemData): string => {
                          return item?.title;
                        }}
                        onChange={(event) => {
                          setQuery(event.target.value);
                          if (onInputChange) {
                            onInputChange(event.target.value);
                          }
                        }}
                      />
                    </Combobox.Button>
                  )}
                  {showDropdownIcon && showDropdownIcon === true ? (
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <IoMdArrowDropdown
                        className="h-5 w-5 text-black-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  ) : (
                    <></>
                  )}
                </div>
                {showFieldErrors && (
                  <div className="absolute -mt-1">
                    <FormFieldErrors errors={reducedErrorMessages} />
                  </div>
                )}
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options
                    // style={{ zIndex: 1 }}
                    className={clsx(
                      filteredDataItems?.length > 0 &&
                        "absolute z-50 mt-1  overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none max-h-60 sm:text-sm",
                      listBoxClassName ? listBoxClassName : "w-full"
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
                              className="w-full text-black-500 border-t-0 border-l-0 border-r-0  outline-none ring-0 border-b text-sm pl-2 pr-4 border-b-gray-200 focus:ring-0 focus:outline-none "
                              type="text"
                              placeholder="Search withing options"
                            />
                          </div>
                        </Combobox.Option>
                      )}
                    {filteredDataItems?.length === 0
                      ? showDropdownWhenNoData &&
                        showDropdownWhenNoData === true && (
                          <div className=" absolute cursor-default select-none py-2 bg-white shadow-md border border-gray-100 w-full z-10 rounded-md px-4 text-gray-700">
                            {props?.dropdownNoDataContent ?? (
                              <span className="text-sm text-center">
                                No Data
                              </span>
                            )}
                          </div>
                        )
                      : filteredDataItems?.map((item: ISelectMenuItemData) => (
                          <Combobox.Option
                            key={item.id}
                            className={({ selected }) =>
                              clsx(
                                "relative flex font-medium  pl-2 text-sm justify-between items-center cursor-default select-none py-2 text-center ",
                                selected
                                  ? "bg-gray-800 hover:bg-gray-800 text-white font-medium "
                                  : "text-gray-800 hover:bg-gray-800 hover:text-white",
                                itemsClassName && itemsClassName !== ""
                                  ? itemsClassName
                                  : ""
                              )
                            }
                            onClick={() => setSelected(item)}
                            data-tooltip-place="right"
                            data-tooltip-id={`option-tooltip:${register?.name}`}
                            data-tooltip-content={item.title}
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                {isMultiSelect && isMultiSelect === true && (
                                  <input
                                    id="comments"
                                    aria-describedby="comments-description"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                )}
                                <span
                                  className={`block text-left truncate ${selected ? "font-medium " : "font-normal"}`}
                                >
                                  {item.title}{" "}
                                  {props?.extraInfoNode && (
                                    <span>{props?.extraInfoNode}</span>
                                  )}
                                </span>
                                {selected ? (
                                  <div className="flex  text-left justify-start items-center">
                                    <span
                                      className={`inset-y-0 text-left left-0 flex items-center pl-3 ${
                                        active ? "text-white" : "text-blue-600"
                                      }`}
                                    ></span>
                                    <CheckIcon className="w-4 h-4 mr-4" />
                                  </div>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                    {addAction && (
                      <div className="p-2">
                        <hr />
                        <Combobox.Button
                          className="text-[#0068FF] cursor-pointer"
                          onClick={() => addAction?.callBack(query)}
                        >
                          {addAction?.title}{" "}
                          {query && <span>{`"${query}"`}</span>}
                        </Combobox.Button>
                      </div>
                    )}
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

export default SearchableSelectMenu;
