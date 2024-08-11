import clsx from "clsx";
import {
  addMinutes,
  differenceInMonths,
  differenceInYears,
  format,
  parse,
  parseISO,
} from "date-fns";
type useUtilsReturnType = {
  getPetStatusCorrespondingBooleans: (status: string) => {
    is_pet_active: boolean;
    is_pet_inactive: boolean;
    is_pet_deceased: boolean;
  };
  convertYDMtoDOBformat: (
    years: number,
    months: number,
    days: number
  ) => string;
  convertDOBToYMDFormat: (dob: string) => {
    years: string;
    months: string;
    days: string;
  };
  convertToValidDateStringFormat: (date: Date) => string;
  maskMobile: (mobile: string) => string;
  classNames: (...classes: string[]) => string;
  convertNoteToArray: (notesString: string) => string[];
  truncateString: (str: string, maxLength: number) => string;
  convertTime12HrFormat: (timeString: string) => string;
  convertTo12HourFormatWithAMPM: (timeString: string) => string;
  to12HrFormat: (createdAt: string) => string;
  splitEmojiAndText: (input: string) => {
    emoji: string;
    title: string;
  };
  dateToAge: (dateOfBirth: string) => string;
  DOBToAge: (dob: string) => {
    years: number;
    months: number;
  };
  addKilogramsAndGrams: (kilograms: string, grams: string) => string;
  // dateAndTime => ISO Format 2023-12-31T18:30:00
  ISOToRelativeTime: (dateAndTime: string) => string;
  addAMPMToTime: (time: string) => string; // time: HH:MM:SS
  //   getService: (serviceId: string) => IOrgServiceWithSubServices;
  convertWeightToKilogramGrams: (weight: string) => {
    kilograms: string;
    grams: string;
  };
  //   getSubService: (serviceId: string, subServiceId: string) => IOrgSubService;
  ISODatetoHuman: (dateString: string) => string;
  getCurrentYear: () => number;
  getCurrentDate: () => string;
  addMinutesAndCalculateTime: (
    originalTime: string,
    minutesToAdd: number
  ) => {
    newTime: string;
    hours: number;
    minutes: number;
  };
  HTMLLiTagsToArray: (htmlString: string) => string[];
  backgroundColorBeHalfOfService: (serviceId: string) => string;
  convertFarenhiteToCelcius: (temperature: number) => number;
  convertCelciusToFarenhite: (temperature: number) => number;
  statusButtonColor: (bookingStatus: string) => string;
  epocToDateTime: (epoc: string) => string;
  epocToDateTimeForNumber: (epoc: number) => string;
  handleBase64ToImageDownload: (
    base64String: any,
    fileName: any,
    file_extension: any
  ) => void;
  base64ToValidURL: (base64String: string, fileType: string) => string;
  imageUrlToDownload: (url: string, fileName: string) => void;
  convertDataToHTMLList: (data: any) => string;
  cleanURLPathname(url: string): string;
  convertToReadableFormat(str: string): string;
  POStatusTextColor(str: string): string;

  fileListToBase64: (fileList: FileList) => Promise<
    {
      base_64_string: string;
      file_name: string;
      file_extension: string;
    }[]
  >;
};
const POStatusTextColor = (status: string) => {
  if (status === "pre_draft") {
    return "text-blue-400";
  } else if (status === "draft") {
    return "text-[#C13BF0]";
  } else if (status === "pending_invoice_upload") {
    return "text-[#F75C03]";
  } else if (status === "pending_invoice_verification") {
    return "text-[#C38D02]";
  } else if (status === "awaiting_grn") {
    return "text-[#058FF3]";
  } else if (status === "closed") {
    return "text-[#C13BF0]";
  }
};

function convertToReadableFormat(str) {
  return str
    ?.split("_")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
}

export const useUtils = (): useUtilsReturnType => {
  //   const { org_services } = useAppSelector((state) => state.staticAPI);
  /* returns states for valid pet statuses */
  const getPetStatusCorrespondingBooleans = (status: string) => {
    const s = status?.toLocaleLowerCase();
    const statues = {
      active: {
        is_pet_active: true,
        is_pet_inactive: false,
        is_pet_deceased: false,
      },
      inactive: {
        is_pet_active: false,
        is_pet_inactive: true,
        is_pet_deceased: false,
      },
      deceased: {
        is_pet_active: false,
        is_pet_inactive: false,
        is_pet_deceased: true,
      },
      default: {
        is_pet_active: false,
        is_pet_inactive: false,
        is_pet_deceased: false,
      },
    };
    if (s !== "") {
      return statues[s];
    }
    return statues.default;
  };

  const imageUrlToDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const convertDataToHTMLList = (data) => {
    const listItems = data
      ?.map((comment) => `<li>${comment?.value}</li>`)
      ?.join("");
    return `<ol>${listItems}</ol>`;
  };

  const handleBase64ToImageDownload = (
    base64String,
    fileName,
    file_extension
  ) => {
    const base64 = `data:image/${file_extension};base64,${base64String}`;
    const filename = `${fileName}.${file_extension}`;
    // Validate Base64 format
    if (!base64.startsWith("data:image/")) {
      throw new Error("Invalid Base64 string");
    }

    // Split the Base64 string to get the MIME type and the actual Base64 data
    const parts = base64.split(",");
    if (parts.length !== 2) {
      throw new Error("Invalid Base64 string");
    }

    const mimeString = parts[0].match(/:(.*?);/)[1];
    const byteString = atob(parts[1]);

    // Convert Base64 string to binary data
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeString });

    // Create an object URL from the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const base64ToValidURL = (base64String: string, fileType: string) => {
    return `data:${fileType};base64,${base64String}`;
  };

  const fileListToBase64 = async (
    fileList: FileList
  ): Promise<
    { base_64_string: string; file_name: string; file_extension: string }[]
  > => {
    const filesArray = Array.from(fileList);
    const base64Promises = filesArray.map((file) => {
      return new Promise<{
        base_64_string: string;
        file_name: string;
        file_extension: string;
      }>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
          resolve({
            base_64_string: `${reader.result}`.split(",")[1] as string,
            file_name: file?.name?.split(".")[0],
            file_extension: `${file.type.split("/")[1]}`,
          });
        reader.onerror = (error) => reject(error);
      });
    });

    return Promise.all(base64Promises)
      .then((base64Objects) => {
        return base64Objects;
      })
      .catch(() => {
        return [];
      });
  };

  function cleanURLPathname(url: string) {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const urlWithoutQueryParams = url.split("?")[0];
    const urlParts = urlWithoutQueryParams.split("/");
    const cleanedParts = urlParts.filter((part) => !uuidRegex.test(part));
    const cleanedPathname = cleanedParts.join("/");

    return cleanedPathname;
  }

  const convertFarenhiteToCelcius = (temperature: number) => {
    const celsius = (temperature - 32) * (5 / 9);
    return parseFloat(celsius.toFixed(2));
  };

  const convertCelciusToFarenhite = (temperature: number) => {
    const fahrenheit = temperature * (9 / 5) + 32;
    return parseFloat(fahrenheit.toFixed(2));
  };

  /* converts yyyy-DD-MM format to ISOString format  */
  const convertYDMtoDOBformat = (years = 0, months = 0, days = 0) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear() - years,
      currentDate.getMonth() - months,
      currentDate.getDate() - days
    );

    // Format the target date as "YYYY-MM-DD"
    const formattedDate = targetDate.toISOString()?.split("T")[0];
    return formattedDate;
  };

  /* helps converting date to yyyy-MM-dd format  */
  const convertToValidDateStringFormat = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* Masks mobile middle numbers only shows last digits */
  const maskMobile = (mobile: string) => {
    const mask = new Array(6)?.fill("x");
    return [
      mobile[0],
      mobile[1],
      ...mask,
      mobile[mobile.length - 2],
      mobile[mobile.length - 1],
    ].join("");
  };

  /* Helps merging tailwindcss classes */

  const classNames = (...classes: string[]) => {
    return clsx(classes);
  };

  /* Convert Dangerous HTML <li> some comment </li> to Array<string> to process it */

  const convertNoteToArray = (value: string) => {
    // Check if value is undefined or null
    return HTMLLiTagsToArray(value);
  };

  /* Truncates string to specific length   */

  const truncateString = (str: string, maxLength: number) => {
    if (str?.length > maxLength) {
      return str?.slice(0, maxLength) + "...";
    }
    return str;
  };

  /* convert valid timestring HH:MM string to valid 12 HR format with AM PM  */
  const convertTime12HrFormat = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");

    // Convert hours to a number
    const hoursNum = parseInt(hours);

    // Determine whether it's AM or PM
    const period = hoursNum >= 12 ? "PM" : "AM";

    // Calculate the 12-hour format hours
    const hours12Hour = hoursNum % 12 || 12;

    // Format the time in 12-hour format
    const time12Hour = `${hours12Hour}:${minutes} ${period}`;
    return time12Hour;
  };

  // Split emoji and text

  const splitEmojiAndText = (
    input: string
  ): { emoji: string; title: string } => {
    const match = input.match(/^([\p{Emoji}\p{L}]+)\s(.*)$/u);

    if (match) {
      return {
        emoji: match[1],
        title: match[2],
      };
    }
    return { emoji: "", title: "" };
  };

  /* Converts createdAt timestamp to valid 12HR format string */
  const to12HrFormat = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  };

  /*  convert yyyy-MM-dd dob format to valid Date Yrs and Months */
  const dateToAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    // Calculate the age in milliseconds
    const ageInMilliseconds = currentDate.getTime() - dob.getTime();

    // Convert milliseconds to days
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    // If the age is less than 30 days, return the age in days
    if (ageInDays < 30) {
      return ageInDays + "d";
    }

    // Calculate the age in months and years
    const ageInMonths = Math.floor(ageInDays / 30);
    const ageInYears = Math.floor(ageInDays / 365);

    // Calculate remaining months after removing years
    const remainingMonths = ageInMonths - ageInYears * 12;

    // Format the age
    let formattedAge = "";

    // Add years if greater than 0
    if (ageInYears > 0) {
      formattedAge += ageInYears + "Y ";
    }

    // Add remaining months if greater than 0 or if years are 0
    if (remainingMonths > 0 || ageInYears === 0) {
      formattedAge += remainingMonths + "M ";
    }

    return formattedAge.trim(); // Trim to remove any extra whitespace
  };

  const DOBToAge = (birthdate: string) => {
    if (birthdate === "") return { years: 0, months: 0 };
    const currentDate = new Date();
    const birthDate = new Date(birthdate);

    const years = differenceInYears(currentDate, birthDate);
    const months = differenceInMonths(currentDate, birthDate) % 12;

    return { years, months };
  };

  const ISOToRelativeTime = (dateAndTime: string) => {
    const ISODateAndTime = parseISO(dateAndTime);
    const convertedTime = format(ISODateAndTime, "hh:mm a");
    return convertedTime;
  };

  const addAMPMToTime = (time: string) => {
    if (!time) return "Invalid Time";
    return format(parse(time, "HH:mm:ss", new Date()), "hh:mm a");
  };

  const ISODatetoHuman = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    return format(parseISO(dateString), "MMMM d, yyyy");
  };

  /* Redux States Utils Starts */
  //   const getService = (serviceId: string) => {
  //     return (
  //       org_services.filter((service) => {
  //         return service.service_id === serviceId;
  //       })[0] ?? null
  //     );
  //   };

  //   const getSubService = (serviceId: string, subServiceId: string) => {
  //     const service = getService(serviceId);
  //     if (!service) return null;
  //     return (
  //       service?.sub_services?.filter((subService) => {
  //         return subService?.sub_service_id === subServiceId;
  //       })[0] ?? null
  //     );
  //   };

  const getCurrentYear = () => {
    const date = new Date(Date.now());
    return date.getFullYear();
  };

  const getCurrentDate = () => {
    const date = new Date(Date.now());
    return format(date, "yyyy-MM-dd");
  };

  const addMinutesAndCalculateTime = (
    originalTime: string,
    minutesToAdd: number
  ) => {
    const originalDate = new Date(`2000-01-01T${originalTime}:00`);
    const newDate = addMinutes(originalDate, minutesToAdd);

    const newTime = format(newDate, "HH:mm");
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

    return {
      newTime,
      hours,
      minutes,
    };
  };

  const convertDOBToYMDFormat = (dob: string) => {
    if (!dob || dob === "" || dob === undefined || dob === null) {
      return {
        years: "0",
        months: "0",
        days: "0",
      };
    }
    // The given date in the format "YYYY-MM-DD"
    const dateString = dob;

    // Parse the input date string
    const parts = dateString.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]); // Months are 0-based (January is 0, February is 1, etc.)

    // Create Date objects for the input date and the current date
    const inputDate: any = new Date(year, month, day);
    const currentDate: any = new Date();

    // Calculate the time difference
    const timeDifference: any = currentDate - inputDate;

    // Calculate the years, months, and days passed
    const yearsPassed = Math.floor(
      timeDifference / (365.25 * 24 * 60 * 60 * 1000)
    );
    const monthsPassed = Math.floor(
      (timeDifference % (365.25 * 24 * 60 * 60 * 1000)) /
        (30.44 * 24 * 60 * 60 * 1000)
    );
    const daysPassed = Math.floor(
      (timeDifference % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
    );

    return {
      years: yearsPassed.toString(),
      months: monthsPassed.toString(),
      days: daysPassed.toString(),
    };
  };

  const HTMLLiTagsToArray = (htmlString: string): string[] => {
    if (htmlString === "" || htmlString === undefined || htmlString === null)
      return [];

    const textWithLineBreaks = htmlString.replace(/<li>(.*?)<\/li>/gm, "$1\n");

    const linesArray = textWithLineBreaks
      .split("\n")
      .filter((line) => line.trim() !== "");

    const textArray =
      linesArray
        .map((line) => line.replace(/<[^>]*>?/gm, ""))
        .filter(Boolean) ?? [];

    return textArray ?? [];
  };

  const convertWeightToKilogramGrams = (weight: string) => {
    if (weight === "") {
      return {
        kilograms: "",
        grams: "",
      };
    }
    const weightFloat = parseFloat(weight);
    const kilograms = Math.floor(weightFloat); // Extract the whole part as kilograms
    const grams = Math.round((weightFloat - kilograms) * 1000);
    return {
      kilograms: kilograms.toString(),
      grams: grams.toString(),
    };
  };

  const addKilogramsAndGrams = (kilograms: string, grams: string) => {
    const kg = kilograms !== "" ? parseInt(kilograms) : 0;
    const gm = grams !== "" ? parseInt(grams) : 0;
    return (kg + gm / 1000).toString();
  };

  const backgroundColorBeHalfOfService = (serviceId: string) => {
    if (serviceId === "2fa0dc20-2385-11ed-8ca0-1e00da26097a") {
      return `bg-[#F4FBFF] text-[#094769]`; //opd
    } else if (serviceId === "d10441ad-4549-11ed-af80-d1c5db9bbce2") {
      return `bg-[#FCEDFF] text-[#75118A] `; //grooming
    } else if (serviceId === "ce6d6191-c08a-4871-8f3b-d42f6798a8b2") {
      return `bg-[#CDDBFF] text-[#001C62]`; //teliconsultation
    } else if (serviceId === "7206babd-481b-4295-94f9-9b93c239d0bb") {
      return `bg-[#FFEEE0] text-[#B74B00]`; //surgery
    } else if (serviceId === "ae6445e6-c1cc-4e00-a586-45eb46e430c8") {
      return `bg-[#FEFFCF] text-[#6D6F00]`; //Home visit
    } else if (
      serviceId === "05bbbe4e-0292-4c1e-b46e-e20437d6c846" ||
      serviceId === "da22b4e1-4f98-4dcb-8a9e-b94ddff33712"
    ) {
      return `bg-[#DDFFDD] text-[#026200]`; //CT and Ultra and X-ray
    } else if (serviceId === "172199d0-899d-49db-af11-56ffaa50b8c7") {
      return `bg-red-300 text-[#026200]`; //CT and Ultra and X-ray
    } else if (serviceId === "059ab443-5d88-4655-9061-48a7be992c91") {
      return `bg-[#A1FFEE] text-[#004F41]`; //Phy
    } else if (serviceId === "c0ce6be0-167f-4083-af30-101727adaa93") {
      return `bg-[#F9F9F9] text-[#383838]`; //Slot Reserved
    } else {
      return `bg-[#F4FBFF] text-[#094769]`;
    }
  };

  const statusButtonColor = (bookingStatus: string) => {
    if (bookingStatus === "completed") {
      return `bg-[#EAFACE] text-[#477200] border border-1 border-[#477200]`;
    } else if (bookingStatus === "attending") {
      return `bg-[#C3ECF5] text-[#09305E] border border-1 border-[#09305E]`;
    } else if (bookingStatus === "check out") {
      return `bg-[#EFFEF] text-[#006F76] border border-1 border-[#006F76]`;
    } else if (bookingStatus === "waiting") {
      return `bg-[#FFE9DD] text-[#EA5400] border border-1 border-[#EA5400]`;
    } else if (bookingStatus === "upcoming") {
      return `bg-[#FFF2D1] text-[#A47A0D] border border-1 border-[#A47A0D]`;
    } else if (bookingStatus === "no show") {
      return `bg-[#FDEDFF] text-[#6C0076] border  border-1 border-[#6C0076]`;
    } else if (bookingStatus === "cancelled") {
      return `bg-[#FFEBEB] text-[#D00000] border border-1 border-[#D00000]`;
    } else {
      return `bg-[#EAFACE] text-[#477200]`;
    }
  };

  const epocToDateTime = (epoc: string) => {
    const timestamp = epoc;
    const dateObj = new Date(timestamp);

    // Get the date components
    const year = dateObj?.getFullYear();
    const month = String(dateObj?.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(dateObj?.getDate())?.padStart(2, "0");

    // Get the time components
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");

    // Convert hours to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12; // Convert 0 to 12

    // Format the date and time
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  };

  // return date and am pm
  const epocToDateTimeForNumber = (epochTimestamp: number): string => {
    const date = new Date(epochTimestamp * 1000);

    // Extract date and time components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours24 = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Convert 24-hour time to 12-hour time with AM/PM
    const hours12 = hours24 % 12 || 12;
    const amPm = hours24 >= 12 ? "PM" : "AM";

    return `${year}-${month}-${day} ${hours12}:${minutes} ${amPm}`;
  };

  // Am pm time calculation
  function convertTo12HourFormatWithAMPM(timeString) {
    let [hour, minute] = timeString
      ? timeString.split(":").map(Number)
      : [null, null];
    const period = hour >= 12 ? "PM" : "AM";
    if (hour === 0) {
      hour = 12; // Convert 00:00 to 12:00 AM
    } else if (hour > 12) {
      hour -= 12; // Convert hours greater than 12 to 12-hour format
    }
    hour = hour < 10 ? "0" + hour : hour.toString(); // Convert hour to string and add leading zero if needed
    minute = minute < 10 ? "0" + minute : minute.toString(); // Convert minute to string and add leading zero if needed

    return `${hour}:${minute} ${period}`;
  }

  /* Redux States Utils Ends */

  return {
    base64ToValidURL,
    getCurrentYear,
    addKilogramsAndGrams,
    HTMLLiTagsToArray,
    convertWeightToKilogramGrams,
    addMinutesAndCalculateTime,
    convertDOBToYMDFormat,
    getPetStatusCorrespondingBooleans,
    convertYDMtoDOBformat,
    convertToValidDateStringFormat,
    maskMobile,
    fileListToBase64,
    classNames,
    convertNoteToArray,
    truncateString,
    convertTime12HrFormat,
    to12HrFormat,
    splitEmojiAndText,
    dateToAge,
    DOBToAge,
    ISOToRelativeTime,
    addAMPMToTime,
    // getService,
    getCurrentDate,
    // getSubService,
    ISODatetoHuman,
    backgroundColorBeHalfOfService,
    statusButtonColor,
    epocToDateTime,
    convertTo12HourFormatWithAMPM,
    convertCelciusToFarenhite,
    convertFarenhiteToCelcius,
    handleBase64ToImageDownload,
    imageUrlToDownload,
    convertDataToHTMLList,
    cleanURLPathname,
    convertToReadableFormat,
    POStatusTextColor,
    epocToDateTimeForNumber,
  };
};
