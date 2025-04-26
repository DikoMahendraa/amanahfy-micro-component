import { memo } from "react";
import { Card } from "components";
import FundraisingList from "components/organisms/fundraising/FundraisingList";

const FundraisingPage = () => {
  return (
    <>
      <Card className="space-y-3">
        <div className="text-lg font-bold">Fundraising</div>
        <FundraisingList
          statusConfig={{}}
          data={[
            {
              id: 1,
              title: "Water for All Campaign",
              goals_amount: 50000,
              raised_amount: 35000,
              currency: "USD",
              status: undefined,
              total_donors: 125,
              last_donation_at: "2025-04-22T10:30:00Z",
            },
            {
              id: 2,
              title: "Education Fund",
              goals_amount: 100000,
              raised_amount: 15000,
              currency: "USD",
              status: "draft",
              total_donors: 42,
              last_donation_at: "2025-04-18T14:45:00Z",
            },
            {
              id: 3,
              title: "Emergency Relief Initiative",
              goals_amount: 75000,
              raised_amount: 60000,
              currency: "USD",
              status: "draft",
              total_donors: 210,
              last_donation_at: "2025-04-24T09:15:00Z",
            },
          ]}
          searchValue=""
          onPreview={() => console.log("preview clicked")}
          onEdit={() => console.log("edit clicked")}
          onSearchChange={() => console.log("edit clicked")}
          calculateProgress={() => 1}
          formatAmountWithCurrency={() => "USD"}
          formatTimeAgo={() => "2"}
        />
      </Card>
    </>
  );
};

export default memo(FundraisingPage);
