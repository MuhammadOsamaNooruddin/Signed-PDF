import uploadIcon from "../../assets/uploadIcon.svg";
import file from "../../assets/file.svg";
import { useRef, useState } from "react";
import {
  Headings,
  logos,
  Colors,
  type CardStatus,
  FileStatus,
  bytesToMB,
} from "../../constants/constant";
import { ButtonComponent } from "../Button";
import Download from "../../assets/download.svg";
import { CreatePDF } from "../../createPDF/createPDF";

export const Card = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [status, setStatus] = useState<CardStatus>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type === "application/pdf") {
      setError(null);
      setInputFile(file);
    } else {
      setError("Invalid file type. Please upload a PDF file.");
    }
  };

  const handleFileProgress = async () => {
    // console.log(inputFile,'asdasd');
    if (!inputFile) return;
    let timer: ReturnType<typeof setTimeout>;
    const formData = new FormData();
    formData.append("pdf", inputFile);

    try {
      const res = await fetch("/api/sign", { method: "POST", body: formData });

      if (res.ok) {
        console.log(res);
        const blob = new Blob([await res.arrayBuffer()], {
          type: "application/pdf",
        });

        timer = setInterval(() => {
          setStatus("processing");
          setProgress((prev) => {
            if (prev === 100) {
              setStatus("success");
              clearInterval(timer);
              const url = URL.createObjectURL(blob);
              setPdfUrl(url);
              console.log("PDF URL:", url);
            }
            return Math.min(prev + 10, 100);
          });
        }, 200);
      }
    } catch (e) {
      console.log(e);
    }

    return () => clearInterval(timer);
  };

  const handleReset = () => {
    setStatus("idle");
    setInputFile(null);
    setProgress(0);
    setPdfUrl(null);
    setError(null);
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = inputFile?.name || "signed.pdf"; // fallback filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      handleReset();
    }
  };

  const signDocumentButton =
    status !== "success" ? "Sign Document Securely" : "Sign Another Document";

  return (
    <main className="container mx-auto py-8 md:py-12 lg:py-16 ">
      <div
        className={`${
          status === "success" ? "bg-green-100" : "bg-white"
        } rounded-xl shadow-2xl p-8 max-w-2xl mx-auto flex flex-col gap-5 items-center text-center`}
      >
        {/* Logo */}
        <div
          className={`w-12 h-12 p-1 ${Colors[status]} rounded-xl flex items-center justify-center `}
        >
          <img
            src={logos[status]}
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
        </div>

        {/* Title */}
        <h1
          className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text ${Colors[status]}`}
        >
          {Headings[status]?.mainHeading}
        </h1>

        {/* Description */}
        <p className="md:text-lg text-gray-600">
          {Headings[status]?.subHeading}
        </p>

        {/** file upload div */}
        {status === "idle" && (
          <div className="p-4 w-full border-dashed border-2 bg-gradient-to-r from-pink-100 to-purple-100 border-gray-300 rounded-lg flex flex-col gap-4">
            <div className="flex justify-center p-3">
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center cursor-pointer"
                type="button"
                onClick={handleButtonClick}
              >
                <img src={uploadIcon} alt="upload_icon" className="w-6 h-6" />
              </button>
            </div>
            {error && (
              <p className="text-lg font-medium text-red-500 ">{error}</p>
            )}
            <p className="text-lg font-medium">Click here to browse</p>
            <div>
              <p className="text-sm text-center text-gray-500">
                Maximum file size: 10MB{" "}
              </p>
              <p className="text-sm text-center text-gray-500">
                Supports PDF files only{" "}
              </p>
            </div>
          </div>
        )}

        {/** file details div */}
        {inputFile && (
          <div
            className={`p-4 w-full border-dashed border-2 ${
              status === "success"
                ? "bg-green-100"
                : "bg-gradient-to-r from-pink-100 to-purple-100"
            }  border-gray-300 rounded-lg flex gap-2 items-center`}
          >
            <div
              className={`w-12 h-12 flex-shrink-0 ${
                status === "success" ? Colors[status] : "bg-purple-500"
              } rounded-xl flex items-center justify-center`}
            >
              <img src={file} alt="Logo" className="w-8 h-8 rounded-full" />
            </div>
            <div className="text-start flex-1 min-w-0">
              <p className="text-md truncate overflow-hidden whitespace-nowrap">
                {inputFile.name}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span>{bytesToMB(inputFile.size)}</span>
                <span className="flex items-center">•</span>
                <span>{FileStatus[status]}</span>
              </p>
            </div>
          </div>
        )}

        {/** progess bar shows when processing status */}
        {status === "processing" && (
          <div className="w-full mb-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-purple-500 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="text-md text-gray-500 mt-2">
                {progress}% Completed
              </span>
            </div>
          </div>
        )}

        {/** file details div */}
        {status === "success" && (
          <div className="flex items-center justify-center gap-2 w-full">
            {/* <ButtonComponent styleType={"view"}>
              <div className="flex items-center justify-center gap-2">
                <img src={View} alt="Logo" className="w-6 h-6 rounded-full" />
                View
              </div>
            </ButtonComponent> */}
            <ButtonComponent
              styleType={"download"}
              handleClick={handleDownload}
            >
              <div className="flex items-center justify-center gap-2">
                <img
                  src={Download}
                  alt="Logo"
                  className="w-6 h-6 rounded-full"
                />
                Download
              </div>
            </ButtonComponent>
          </div>
        )}

        {/* Button */}
        <ButtonComponent
          handleClick={status === "success" ? handleReset : handleFileProgress}
          styleType={status === "success" ? "textStyleButton" : "idle"}
          disabled={!inputFile || status === "processing"}
        >
          <div className="flex items-center justify-center gap-2">
            {status !== "success" && (
              <div className="w-8 h-8 p-1 bg-purple-500 rounded-xl flex items-center justify-center">
                <img src={file} alt="Logo" className="w-8 h-8 rounded-full" />
              </div>
            )}
            {signDocumentButton}
          </div>
        </ButtonComponent>
      </div>

      {/** PDF Preview */}
      {pdfUrl && (
        <div className="my-4 text-center mt-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            PDF Preview
          </h1>
          <CreatePDF pdfPath={pdfUrl} />
        </div>
      )}
    </main>
  );
};
