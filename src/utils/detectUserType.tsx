import { useTypedSelector } from "../hooks/useTypedSelector";

const DetectCurrentUserType = () => {
  const { user } = useTypedSelector((state) => state.user);

  try {
    const detectUserType = () => {
      if (detector(user.userType, "customer") && user) {
        return "customer";
      } else if (detector(user.userType, "carrier") && user) {
        return "carrier";
      } else {
        return "loading";
      }
    };

    const detector = (param: string, txt: string) => {
      try {
        return param?.toLowerCase().includes(txt.toLowerCase());
      } catch (error) {
        console.log(error);
      }
    };

    let userType = detectUserType();
    return userType;
  } catch (error) {
    console.log(error);
  }
};

export default DetectCurrentUserType;
