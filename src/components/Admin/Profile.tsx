import React, { useState } from "react";
import Avatar from "../Avatar";
import verifyIcon from "../../assets/verifyIcon.png";
import Edit from "../../UI/Edit";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import DetectCurrentUserType from "../../utils/detectUserType";
import UiSimpleInput from "../../UI/UiSimpleInput";
import { useForm } from "react-hook-form";
import {
  changeEmail,
  sendCode,
  sendEmail,
  updateUser,
} from "../../store/asyncThunk";
import Toast from "../../UI/UIToast";
import UICodePopUp from "../../UI/UICodePopUp";

const Profile = () => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);
  const userType = DetectCurrentUserType();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [isOpenPopUpCode, setIsOpenPopUpCode] = useState<boolean>(false);
  const [isOpenPopUpEmail, setIsOpenPopUpEmail] = useState<boolean>(false);
  let isSub = user.userType === "subCustomer";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    // defaultValues: {
    //   // companyName: user?.companyName,
    // },
  });

  const filterObject = async (data: any) => {
    const changedData: any = {};
    for (const key in data) {
      if (
        data[key] !== user[key] &&
        !(key === "phoneNumber" && data[key] === "-") &&
        !(key === "address" && data[key] === "-") &&
        !(key === "website" && data[key] === "-")
      ) {
        changedData[key] = data[key];
      }
    }
    if (Object.keys(changedData).length > 0) {
      let res = await dispatch(
        updateUser({ data: changedData, userType: user.userType })
      );
      console.log(res);
      if (typeof res?.payload === "string") {
        toastEvent(res?.payload);
      }
    } else {
      console.log("The object has no properties.");
    }
    console.log(changedData);
  };

  const toastEvent = (message: string): void => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 5000);
  };

  const onSubmit = (data: any) => {
    setIsDisabled(false);
    filterObject(data);
  };

  const handleEdit = () => {
    setIsDisabled(true);
  };

  const cancel = () => {
    setIsDisabled(false);
  };

  const changeEmailEvents = () => {
    setIsOpenPopUpCode(true);
    dispatch(sendEmail({ email: user.email, userType: user.userType }));
  };

  const getCode = () => {
    const code = watch("code");
    console.log(code);
    setIsOpenPopUpCode(false);
    setIsOpenPopUpEmail(true);

    dispatch(sendCode({ email: user.email, verificationCode: code }));
  };

  const setEmail = () => {
    const email = watch("email");
    console.log(email);
    dispatch(changeEmail({ newEmail: email }));
    setIsOpenPopUpEmail(false);
    setValue("email", "");
    setValue("code", "");
  };

  console.log(user);

  return (
    <>
      <form
        className="px-4 md:px-10 pb-4 "
        onSubmit={(e) => {
          handleSubmit(onSubmit);
          e.preventDefault();
        }}
      >
        {/* for send code */}
        <UICodePopUp
          setIsOpenPopUp={setIsOpenPopUpCode}
          isOpenPopUp={isOpenPopUpCode}
          register={register}
          type={"code"}
          codeEvent={getCode}
          title={`Մուտքագրեք հաստատման ծածկագիր`}
          text={`Մուտքագրեք ձեր ${user.email} էլ. փոստին եկած ծածկագիրը`}
        />
        {/* for send code */}
        <UICodePopUp
          setIsOpenPopUp={setIsOpenPopUpEmail}
          isOpenPopUp={isOpenPopUpEmail}
          register={register}
          type={"email"}
          codeEvent={setEmail}
          title={`Մուտքագրեք նոր էլ. հասցեն`}
        />

        <div className="h-full md:px-10 px-2 pb-3 flex flex-col gap-6 ">
          <div className="avatar relative">
            <div className="w-full h-36 border-2 border-slate-300 rounded-xl flex flex-col justify-evenly items-center banner">
              <div className="z-1 pointer-events-none">
                <Avatar />
              </div>

              <p className="md:text-[30px] text-[24px] font-bold">
                {isSub ? user?.parent?.companyName : user?.companyName}
              </p>
              <div className="absolute right-4 top-4">
                <img
                  src={verifyIcon}
                  alt=""
                  className="md:w-6 w-4"
                  title="Verify"
                />
              </div>
            </div>
          </div>

          <div className="flex md:flex-nowrap flex-wrap border-2 border-slate-300 rounded-xl p-4 relative">
            <div className="personal-info text-sm md:w-1/2 w-full ">
              <div className="w-full  ">
                <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
                  <h4 className="text-gray-500">Ընկերության անվանումը</h4>
                  {isDisabled && !isSub ? (
                    <UiSimpleInput
                      value={user?.companyName}
                      register={register}
                      type={"companyName"}
                    />
                  ) : (
                    <p>
                      {isSub ? user?.parent?.companyName : user?.companyName}
                    </p>
                  )}
                </div>

                <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
                  <h4 className="text-gray-500">Էլ-հասցե</h4>

                  {isDisabled ? (
                    <div
                      className="w-[190px] bg-blue-200 px-1 py-[2px] border-2 hover:border-blue-400 border-transparent rounded-md cursor-pointer"
                      onClick={changeEmailEvents}
                    >
                      <p className="text-center">փոխել էլ. հասցեն</p>
                    </div>
                  ) : (
                    <p> {user?.email}</p>
                  )}
                </div>
                <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
                  <h4 className="text-gray-500">Հեռախուսահամար</h4>
                  {isDisabled ? (
                    <UiSimpleInput
                      value={user?.phoneNumber ? user?.phoneNumber : "-"}
                      register={register}
                      type={"phoneNumber"}
                    />
                  ) : (
                    <p> {user?.phoneNumber ? user?.phoneNumber : "-"}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="personal-info text-sm md:w-1/2 w-full">
              <div className="w-full  ">
                <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
                  <h4 className="text-gray-500">Հասցե</h4>
                  {isDisabled ? (
                    <UiSimpleInput
                      value={user?.address ? user?.address : "-"}
                      register={register}
                      type={"address"}
                    />
                  ) : (
                    <p> {user?.address ? user?.address : "-"}</p>
                  )}
                </div>
                <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
                  <h4 className="text-gray-500">Գործունեության տեսակը</h4>

                  <p>{user?.userType}</p>
                </div>

                <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
                  <h4 className="text-gray-500">Վեբ կայք</h4>
                  {isDisabled ? (
                    <UiSimpleInput
                      value={user?.website ? user?.website : "-"}
                      register={register}
                      type={"website"}
                    />
                  ) : (
                    <p> {user?.website ? user?.website : "-"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {userType === "customer" && (
            <div className="payment relative">
              <div className="w-full border-2 border-slate-300 rounded-xl">
                <h4 className="md:text-center  font-semibold pt-4 pl-4 md:pl-0">
                  Վճարային համակարգ
                </h4>
                <div className="flex pb-4 flex-wrap md:flex-nowrap px-4 text-sm">
                  <div className="w-full md:w-1/2 h-14 flex border-b-2 md:border-b-0 flex-col justify-center md:items-center items-start">
                    <h4 className="text-gray-500">Վճարման եղանակ</h4>
                    <p>Անկանխիկ բանկային փոխանցում</p>
                  </div>
                  <div className="w-full md:w-1/2 h-14  flex flex-col justify-center md:items-center items-start">
                    <h4 className="text-gray-500">Տևողություն</h4>
                    <p> {user.duration ? user.duration : "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bio relative">
            <div className="w-full border-2 border-slate-300 rounded-xl">
              <h4 className="md:text-center  font-semibold py-4 pl-4 md:pl-0">
                Կարճ ընկերության մասին
              </h4>
              <div className="flex pb-4 flex-wrap md:flex-nowrap px-4 text-sm min-h-auto ">
                {isDisabled ? (
                  <textarea
                    className="text-gray-500 md:px-4 resize-none py-10 px-2    border-0 bg-inherit w-full"
                    // value={bio}
                    defaultValue={user?.about}
                    {...register("about")}
                    // onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-500 text-justify pb-2">
                    {user?.about}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full  flex justify-end ">
            <Edit
              handleEdit={handleEdit}
              cancel={cancel}
              isDisabled={isDisabled}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </form>
      <Toast
        type="error"
        message={toastMessage as string}
        isVisible={!!toastMessage}
      />
    </>
  );
};

export default Profile;
