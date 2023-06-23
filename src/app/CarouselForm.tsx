"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import houseData from "./houseMinistry";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./loading";

type Candidate = {
  std: string;
  name: string;
  admissionNo: string;
};

type Vote = {
  candidateAdmissionNo: string;
  voterAdmissonNo: string;
};
type CandidateData = {
  ministry: string;
  candidates: Candidate[];
};

const submitData: Vote[] = [];

const cardClasses =
  "w-44 h-fit my-8 mx-16 cursor-pointer shadow-brand block shadow-lg rounded";

export default function CarouselForm({
  candidatesData,
}: {
  candidatesData: CandidateData[];
}): JSX.Element {
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async (finalData: Vote[]) =>
      await axios.post("/api", finalData),
  });
  let extraData;
  let studentAdmissionNo;
  if (typeof window !== "undefined") {
    const studentHouse = localStorage.getItem("house");
    extraData = houseData[String(studentHouse)];
    studentAdmissionNo = localStorage.getItem("admissionNo");
  }
  const router = useRouter();
  const [currSlide, setcurrSlide] = useState(0);
  const [vote, setVote] = useState<string>("");
  const [btnEnabled, setbtnEnabled] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) router.push("/login");
      if (!studentAdmissionNo) router.push("/login");
  });


  if (isError) {
    return (
      <p className=" font-semibold text-l text-red-500 ">
        Enter a correct Admission No
      </p>
    );
  } else if (isLoading) return <Loading className="bg-darkest" />;

  if (candidatesData.length === 19 && extraData) {
    candidatesData.splice(9, 0, extraData[0]);
    candidatesData.push(extraData[1]);
  }
  const nextSlide = () => {
    setcurrSlide((prev) => prev + 1);
    submitData.push({
      voterAdmissonNo: studentAdmissionNo,
      candidateAdmissionNo: vote,
    });
    setbtnEnabled(false);
    setVote("");
  };
  const submitHandler = async () => {
    if (window) {
      localStorage.removeItem("admissionNo");
      localStorage.removeItem("house");
    }
    candidatesData.pop();
    candidatesData.splice(8, 1);
    console.log(submitData);
    await mutate(submitData);
    submitData.splice(0, submitData.length);
    console.log(submitData);
    setVote("");
  };
  return (
    <>
      <div
        className="transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateY(-${currSlide * 100}%)` }}
      >
        {candidatesData.length === 21 &&
          candidatesData.map(
            (data: { ministry: string; candidates: Candidate[] }) => (
              <div className="w-full h-full pt-2" key={data?.ministry}>
                <div className="p-1 bg-brand w-full h-8 mx-auto text-center font-semibold  text-light ">
                  {data?.ministry}
                </div>
                <div className="flex justify-around">
                  {data?.candidates.map(
                    ({
                      name,
                      std,
                      admissionNo,
                    }: {
                      name: string;
                      std: string;
                      admissionNo: string;
                    }) => (
                      <div
                        key={admissionNo}
                        onClick={() => {
                          setVote(admissionNo);
                          setbtnEnabled(true);
                        }}
                        className={
                          admissionNo == vote
                            ? cardClasses +
                              " bg-lightest border-solid border-4 border-brand scale-110"
                            : cardClasses + "bg-light hover:scale-105 "
                        }
                      >
                        <div className="bg-light rounded pb-1">
                          <Image
                            className="mx-auto object-cover h-44 w-full"
                            src={`/${name}-min.png`}
                            width={125}
                            height={50}
                            alt="Could not load the image"
                          />

                          <h3 className="text-center text-xs text-gray-900 font-medium ">
                            {name}
                          </h3>
                          <div className="text-center text-gray-500 text-xs font-semibold">
                            {std}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
      </div>
      <button
        onClick={currSlide === 20 ? submitHandler : nextSlide}
        disabled={!btnEnabled}
        className="bottom-4 w-1/3 text-center rounded-md bg-brand px-3 py-1.5 text-sm font-semibold leading-6 text-white absolute left-1/2 -translate-x-1/2 shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {currSlide === 20 ? "Submit" : "Next"}
      </button>
    </>
  );
}
