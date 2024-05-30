import React, { useEffect, useState } from "react";
import { useUser } from "../../../../helper/UserContext";
import axios from "axios";
import { Dropdown } from "flowbite-react";
import { IoPerson } from "react-icons/io5";

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const { user, token } = useUser();
  const [jobOfferModal, setJobOfferModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return; // Ensure token exists
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `http://localhost:3001/recruitment/interviews/${user?.id}`,
          null,
          config
        );
        setInterviews(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const [interviewId, setInterviewId] = useState(null);
  const [intervieweeId, setIntervieweeId] = useState(null);
  const [status, setStatus] = useState("");

  const editInterviewStatus = async (newStatus, id) => {
    try {
      if (!token) return;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:3001/recruitment/interviews/${id}`,
        { status: newStatus },
        config
      );
      setInterviews(
        interviews.map((interview) =>
          interview.id === id ? response.data : interview
        )
      );
    } catch (error) {
      console.error("Error updating interview status:", error);
    }
  };

  const firstInterview = interviews.filter(
    (interview) => interview.status === "first_interview"
  );
  const jobOffer = interviews.filter(
    (interview) => interview.status === "job_offer"
  );
  const hired = interviews.filter((interview) => interview.status === "hired");
  const rejected = interviews.filter(
    (interview) => interview.status === "rejected"
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center h-full font-sans font-medium m-10">
      <div className="flex flex-col h-[80vh] min-h-5/6 bg-white rounded-xl lg:w-1/4 overflow-y-scroll">
        <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white py-4 rounded-xl text-center">
          First Interview
        </span>
        <div className="bg-white p-4 m-2">
          {firstInterview?.map((interview) => (
            <div
              key={interview.id}
              className="relative py-8 px-4 mt-1 sm:px-8 border-2 border-gray-200 dark:border-gray-700 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            >
              <span className="absolute top-2 right-2 cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white">
                <Dropdown
                  className="w-36"
                  placement="right"
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <svg
                      className="cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">Move To:</span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("job_offer");
                      setInterviewId(interview.id);
                      setJobOfferModal(true);
                      setIntervieweeId(interview?.interviewee?.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Job Offer
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("hired");
                      setInterviewId(interview.id);
                      editInterviewStatus("hired", interview.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Hired
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("rejected");
                      setInterviewId(interview.id);
                      editInterviewStatus("rejected", interview.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Rejected
                  </Dropdown.Item>
                </Dropdown>
              </span>
              <IoPerson size={40} />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {interview?.interviewee?.name}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {interview?.interviewee?.jobTitle}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium flex flex-row justify-center items-center gap-1 me-2 px-0 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(interview.datetime))}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                  {new Date(interview.datetime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <a href={interview?.join_url} target="_blank" rel="noreferrer">
                  <span className="pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Join
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col h-[80vh] min-h-5/6 bg-white rounded-xl lg:w-1/4 overflow-y-scroll">
        <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br py-4 text-white rounded-xl text-center">
          Job Offer
        </span>
        <div className="bg-white p-4 m-2">
          {jobOffer?.map((interview) => (
            <div
              key={interview.id}
              className="relative py-8 px-4 mt-1 sm:px-8 border-2 border-gray-200 dark:border-gray-700 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            >
              <span className="absolute top-2 right-2 cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white">
                <Dropdown
                  className="w-36"
                  placement="right"
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <svg
                      className="cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">Move To:</span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("hired");
                      setInterviewId(interview.id);
                      editInterviewStatus("hired", interview.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Hired
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("rejected");
                      setInterviewId(interview.id);
                      editInterviewStatus("rejected", interview.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Rejected
                  </Dropdown.Item>
                </Dropdown>
              </span>
              <IoPerson size={40} />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {interview?.interviewee?.name}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {interview?.interviewee?.jobTitle}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium flex flex-row justify-center items-center gap-1 me-2 px-0 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(interview.datetime))}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                  {new Date(interview.datetime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <a href={interview?.join_url} target="_blank" rel="noreferrer">
                  <span className="pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Join
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col h-[80vh] min-h-5/6 bg-white rounded-xl lg:w-1/4 overflow-y-scroll">
        <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br py-4 text-white rounded-xl text-center">
          Hired
        </span>
        <div className="bg-white p-4 m-2">
          {hired?.map((interview) => (
            <div
              key={interview.id}
              className="relative py-8 px-4 mt-1 sm:px-8 border-2 border-gray-200 dark:border-gray-700 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            >
              <span className="absolute top-2 right-2 cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white">
                <Dropdown
                  className="w-36"
                  placement="right"
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <svg
                      className="cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">Move To:</span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("rejected");
                      setInterviewId(interview.id);
                      editInterviewStatus("rejected", interview.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Rejected
                  </Dropdown.Item>
                </Dropdown>
              </span>
              <IoPerson size={40} />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {interview?.interviewee?.name}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {interview?.interviewee?.jobTitle}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium flex flex-row justify-center items-center gap-1 me-2 px-0 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(interview.datetime))}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                  {new Date(interview.datetime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <a href={interview?.join_url} target="_blank" rel="noreferrer">
                  <span className="pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Join
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col h-[80vh] min-h-5/6 bg-white rounded-xl lg:w-1/4 overflow-y-scroll">
        <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br py-4 text-white rounded-xl text-center">
          Rejected
        </span>
        <div className="bg-white p-4 m-2">
          {rejected?.map((interview) => (
            <div
              key={interview.id}
              className="relative py-8 px-4 mt-1 sm:px-8 border-2 border-gray-200 dark:border-gray-700 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            >
              <span className="absolute top-2 right-2 cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white">
                <Dropdown
                  className="w-36"
                  placement="right"
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <svg
                      className="cursor-pointer w-6 h-6 sm:top-4 sm:right-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">Move To:</span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    onClick={() => {
                      setStatus("hired");
                      setInterviewId(interview.id);
                      editInterviewStatus("hired", interview.id);
                    }}
                  >
                    <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br w-1 rounded-full h-1 mr-2"></span>
                    Hired
                  </Dropdown.Item>
                </Dropdown>
              </span>
              <IoPerson size={40} />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {interview?.interviewee?.name}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {interview?.interviewee?.jobTitle}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium flex flex-row justify-center items-center gap-1 me-2 px-0 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(interview.datetime))}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                  {new Date(interview.datetime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <a href={interview?.join_url} target="_blank" rel="noreferrer">
                  <span className="pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    Join
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interviews;
