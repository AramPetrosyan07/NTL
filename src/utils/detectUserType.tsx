import { useTypedSelector } from "../hooks/useTypedSelector";

const DetectCurrentUserType = () => {
  const { user } = useTypedSelector((state) => state.user);

  const detectUserType = () => {
    if (detector(user.userType, "customer") && user) {
      return "customer";
    } else if (detector(user.userType, "carrier") && user) {
      return "carrier";
    }
    else{
        return 'loading'
    }
  };

  const detector = (param: string, txt: string) => {
    return param.toLowerCase().includes(txt.toLowerCase());
  };

  let userType = detectUserType();
  return userType;
};

export default DetectCurrentUserType;
