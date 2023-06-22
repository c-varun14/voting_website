import React, { EventHandler, MutableRefObject } from "react";
import Loading from "../loading";

const Modal = ({
  title,
  dialogRef,
  isInitialLoading,
  submitHandler,
  data,
  isError,
}: {
  title: string;
  dialogRef: MutableRefObject<HTMLDialogElement>;
  isInitialLoading: boolean;
  isError: boolean;
  data: { admissionNo: string; std: string; house: string; name: string };
  submitHandler: EventHandler<React.MouseEvent>;
}) => {
  if (isError) dialogRef.current?.close();
  return (
    <dialog className="m-auto max-w-lg p-2" ref={dialogRef}>
      {!data && !isError && <Loading className="border-darkest" />}
      {data && (
        <form>
          <div className="p-4 flex">
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                stroke="#dc2626"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {title}
              </h3>
              <p className="text-sm text-gray-500">
                {isInitialLoading
                  ? "Loading..."
                  : isError
                  ? "Errr fix it"
                  : `Do you confirm that you are ${data?.name} of ${data?.std} and of house ${data?.house}`}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 py-3 flex justify-end px-6">
            <button
              formMethod="dialog"
              type="submit"
              className=" border-gray-900 bg-lightest mr-4 rounded py-1 px-4 text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              type="submit"
              className="bg-red-600 rounded py-1 px-4  shadow-sm hover:bg-red-500 text-lightest"
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
};

export default Modal;
