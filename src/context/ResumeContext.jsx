import { createContext } from "react";

export const ResumeInfoContext = createContext(null);

// Provider component
// export const ResumeInfoProvider = ({ children }) => {
//   const [resumeInfo, setResumeInfo] = useState({}); // Initialize with default data

//   return (
//     <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
//       {children}
//     </ResumeInfoContext.Provider>
//   );
// };