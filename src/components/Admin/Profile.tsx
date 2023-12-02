import React, { useState } from "react";
import Avatar from "../Avatar";
import verifyIcon from "../../assets/verifyIcon.png";
import Edit from "../../UI/Edit";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import DetectCurrentUserType from "../../utils/detectUserType";

const Profile = () => {
  const { user } = useTypedSelector((state) => state.user);
  const userType = DetectCurrentUserType();
  const [bio, setBio] = useState(
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. In iste aspernatur, adipisci eius rem reiciendis sed sequi, officiis placeat provident numquam quisquam iusto, quam accusamus nostrum accusantium ab quas. Quas delectus quis dicta amet praesentium deserunt sit ratione optio pariatur nemo. Explicabo autem quidem amet repellendus sequi nisi. Nemo rem obcaecati provident ipsa officia expedita dolores exercitationem atque minus, odio voluptatem consequuntur cupiditate fuga, iste quos quis possimus hic corporis! Rem doloribus eaque vitae enim reiciendis? Commodi quae nulla repudiandae. Iusto repudiandae saepe quas quo, ad, pariatur nobis architecto magni ab dolore placeat corporis enim commodi vel dicta delectus voluptatum."
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const handleEdit = () => {
    setIsDisabled(true);
  };
  const handleSave = () => {
    setIsDisabled(false);
  };
  return (
    <div className="md:px-10 px-2 flex flex-col gap-6">
      <div className="avatar relative">
        <div className="w-full h-36 border-2 border-slate-300 rounded-xl flex flex-col justify-evenly items-center banner">
          <div className="z-1 pointer-events-none">
            <Avatar />
          </div>

          <p className="md:text-[30px] text-[24px] font-bold">
            {user?.companyName}
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
              <p> {user?.companyName}</p>
            </div>

            <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
              <h4 className="text-gray-500">Էլ-հասցե</h4>
              <p> {user?.email}</p>
            </div>
            <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
              <h4 className="text-gray-500">Հեռախուսահամար</h4>
              <p> {user?.phoneNumber ? user?.phoneNumber : "-"}</p>
            </div>
          </div>
        </div>
        <div className="personal-info text-sm md:w-1/2 w-full">
          <div className="w-full  ">
            <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
              <h4 className="text-gray-500">Հասցե</h4>
              <p> {user?.address ? user?.address : "-"}</p>
            </div>
            <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
              <h4 className="text-gray-500">Գործունեության տեսակը</h4>

              <p>{user?.userType}</p>
            </div>

            <div className="w-full h-14 border-b-2 flex flex-col justify-center md:items-center items-start">
              <h4 className="text-gray-500">Վեբ կայք</h4>
              <p> {user?.website ? user?.website : "-"}</p>
            </div>
          </div>
        </div>
        <Edit
          handleEdit={handleEdit}
          handleSave={handleSave}
          isDisabled={isDisabled}
        />
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
          <Edit
            handleEdit={handleEdit}
            handleSave={handleSave}
            isDisabled={isDisabled}
          />
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <p className="text-gray-500 text-justify pb-2">{bio}</p>
            )}
          </div>
          <Edit
            handleEdit={handleEdit}
            handleSave={handleSave}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
