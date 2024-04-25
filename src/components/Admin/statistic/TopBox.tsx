// import "../../styles/topBox.scss";
import "../../../styles/topBox.scss";
import { topDealUsers } from "../../../data/data";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const TopBox = () => {
  const { statistic } = useTypedSelector((state) => state.user);

  return (
    <div className="topBox">
      <h1>Աշխատակիցներ</h1>
      <div className="list">
        {statistic?.workers?.map((user: any) => (
          <div
            className="listItem"
            key={user.id}
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
