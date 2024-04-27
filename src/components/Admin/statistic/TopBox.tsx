// import "../../styles/topBox.scss";
import "../../../styles/topBox.scss";
import { topDealUsers } from "../../../data/data";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const TopBox = ({ workers }: any) => {
  return (
    <div className="topBox">
      <h1>Աշխատակիցներ</h1>
      <div className="list">
        {workers?.map((user: any, i: number) => (
          <div
            className="listItem"
            key={i}
            title={`ընդհանուր աշխատած գումարը $${user.amount}`}
          >
            <div className="user">
              {/* <img src={user.img} alt="" /> */}
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">${user.amountPerMonth}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
