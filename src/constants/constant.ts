import cardlogo from "../assets/cardlogo.svg";
import successlogo from "../assets/successlogo.svg";

export type CardStatus = "idle" | "processing" | "success";

interface ButtonProps {
  handleClick?: () =>void;
  styleType: CardStatus | "view" | "download" | "textStyleButton";
  disabled?: boolean;
  children: React.ReactNode;
}

const Headings = {
  idle: {
    mainHeading: "Upload PDF to Sign",
    subHeading:
      "Select document to get it signed securely with our advanced encryption",
  },
  processing: {
    mainHeading: "Signing Document...",
    subHeading: "Please wait while we process your document",
  },
  success: {
    mainHeading: "Document Signed Successfully!",
    subHeading: "Your document has been signed and is ready for view and download.",
  },
};

const logos = {
    idle: cardlogo,
    processing: cardlogo,
    success: successlogo,
};

const Colors = {
    idle: "bg-gradient-to-r from-pink-500 to-purple-600",
    processing: "bg-gradient-to-r from-pink-500 to-purple-600",
    success: "bg-green-500",
}

const FileStatus = {
  idle: "Ready to Sign",
  processing: "Signing...",
  success : "Signed & Verified"
}

const ButtonStyles: Record<string, string> = {
  idle: "bg-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 w-full hover:bg-purple-600 hover:shadow-lg cursor-pointer",
  processing: "bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 w-full hover:bg-purple-600 hover:shadow-lg cursor-pointer",
  view: "border bg-white border-purple-500 text-purple-500 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 w-full hover:bg-purple-200 hover:text-white cursor-pointer",
  download: "border bg-purple-500 border-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full transition-shadow duration-150 hover:shadow-lg",
  disabled: "bg-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 w-full opacity-50 cursor-not-allowed",
  textStyleButton: "bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-bold py-2 px-4 transition-all duration-200 w-full cursor-pointer"
}

function bytesToMB(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }

export { bytesToMB, ButtonProps, ButtonStyles, FileStatus, Headings, logos, Colors };