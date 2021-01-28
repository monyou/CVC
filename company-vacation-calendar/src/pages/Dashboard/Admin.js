/** @jsxImportSource @emotion/react */
import {
  getAllVacationsByCompany,
  updateVacation,
} from "../../services/vacation.service";
import { vacationStatus } from "../../utils/enums";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteUser,
  getAllUsersByCompanyId,
} from "../../services/user.service";
import { TabView, TabPanel } from "primereact/tabview";
import { VacationRequestsList } from "../../components/VacationRequestsList";
import { UsersTable } from "../../components/UsersTable";

function Admin() {
  const store = useSelector((state) => ({ user: state.user }));
  const queryClient = useQueryClient();

  const { data: allVacations } = useQuery(
    "all-vacations",
    () => getAllVacationsByCompany(store.user.company.id),
    { enabled: !!store.user?.company?.id }
  );
  const updateVacationMutation = useMutation(
    (requestData) => updateVacation(requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-vacations");
      },
    }
  );

  const { data: allCompanyUsers } = useQuery(
    "all-company-users",
    () =>
      getAllUsersByCompanyId(store.user.company.id).then(
        (response) => response.users
      ),
    { enabled: !!store.user?.company?.id }
  );
  const deleteUserMutation = useMutation((userId) => deleteUser(userId), {
    onSuccess: () => {
      queryClient.invalidateQueries("all-company-users");
    },
  });

  const pendingVacations =
    allVacations?.filter((v) => v.status === vacationStatus.Pending) ?? [];

  const activeCompanyUsers =
    allCompanyUsers?.filter((u) => u.isActive && u.id !== store.user.sub) ?? [];

  function handleUpdateVacation(action, vacationId) {
    let requestData = {
      id: vacationId,
    };

    switch (action) {
      case "accept":
        requestData.status = vacationStatus.Accepted;
        break;
      case "reject":
        requestData.status = vacationStatus.Rejected;
        break;
      default:
        break;
    }

    updateVacationMutation.mutate(requestData);
  }

  return (
    <div>
      <TabView
        renderActiveOnly={false}
        css={{ ".p-tabview-nav": { justifyContent: "center" } }}
      >
        <TabPanel header="Requests">
          <VacationRequestsList
            pendingVacations={pendingVacations}
            handleUpdateVacation={handleUpdateVacation}
          />
        </TabPanel>
        <TabPanel header="Calendar">Calendar</TabPanel>
        <TabPanel header="Employees">
          <UsersTable
            users={activeCompanyUsers}
            removeUser={deleteUserMutation.mutate}
          />
        </TabPanel>
      </TabView>
    </div>
  );
}

export { Admin };
