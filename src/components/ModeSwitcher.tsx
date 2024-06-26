import React, { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";

interface ChangedModsProps {
  setIsChangedMode?: (props: boolean) => void;
  colorMoon?: string;
}

const ModeSwitcher: React.FC<ChangedModsProps> = ({
  setIsChangedMode,
  colorMoon = "text-black",
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const element = document.documentElement;
    console.log(element);

    if (isDarkMode) {
      element.classList.add("dark");
      document.body.classList.add("darkMode");
      localStorage.setItem("theme", "dark");
      if (setIsChangedMode) {
        setIsChangedMode(true);
      }
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("darkMode");
      localStorage.removeItem("theme");
      if (setIsChangedMode) {
        setIsChangedMode(false);
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onWindowMatch = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkQuery.addEventListener("change", onWindowMatch);

    return () => {
      darkQuery.removeEventListener("change", onWindowMatch);
    };
  }, []);

  return (
    <div
      className="text-[20px] flex justify-center items-center h-full"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <span className="cursor-pointer text-yellow-500">
          <FiSun />
        </span>
      ) : (
        <span className={`cursor-pointer ${colorMoon}`}>
          <HiOutlineMoon />
        </span>
      )}
    </div>
  );
};

export default ModeSwitcher;
