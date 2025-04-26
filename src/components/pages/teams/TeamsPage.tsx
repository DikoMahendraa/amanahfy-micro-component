import { memo } from "react";
import { Card } from "components";
import TeamsList from "components/organisms/teams/TeamsList";
import { useNavigate } from "react-router-dom";

const TeamsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="space-y-3">
        <div className="text-lg font-bold">Teams</div>
        <TeamsList
          searchValue=""
          data={[
            {
              id: 1,
              name: "Lorem ipsum dolor sit amet.",
              captain: {
                avatar: "",
                name: "Waqas Ali",
              },
              members: 100,
              status: "active",
            },
            {
              id: 2,
              name: "Lorem ipsum dolor sit amet.",
              captain: {
                avatar: "",
                name: "Adil Ali",
              },
              members: 30,
              status: "in-review",
            },
            {
              id: 3,
              name: "Lorem ipsum dolor sit amet.",
              captain: {
                avatar: "",
                name: "Waqas Ali",
              },
              members: 27,
              status: "active",
            },
          ]}
          onSearchChange={(value: string) => console.log(value)}
          onPreview={() => console.log("")}
          onEdit={(record) => navigate(`/my-profile/teams/edit/${record.id}`)}
        />
      </Card>
    </>
  );
};

export default memo(TeamsPage);
