import { Issue } from "@/types/index";
import { IssueCard } from "./IssueCard";
import { statesIcons, statesPluralTraslations } from "@/utils/constants";

interface IssueListProps {
  issues: Issue[];
}

type GroupedIssues = {
  [key: string]: Issue[];
};

const initialStatesGroups: GroupedIssues = {
  open: [],
  in_progress: [],
  closed: [],
};


export const IssuesList = ({ issues }: IssueListProps) => {
  
  const groupedIssues = issues.reduce((acc, issue) => {
    let currentGroup = acc[issue.state] ? [...acc[issue.state]] : [];
    currentGroup = [...currentGroup, issue];
    return { ...acc, [issue.state]: currentGroup };
  }, initialStatesGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10"> Tickets </h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedIssues).map(([state, issues]) => (
          <div
            key={state}
            className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5 border-slate-300 border-r-4 border-dashed last:border-r-0 pr-5"
          >
            <h3
              className={`capitalize text-xl font-medium p-3 border-b-4 border-dashed border-slate-300 text-slate-400`}
            >
             <div className="flex justify-center items-center">
              <span>{ statesPluralTraslations[state] }</span>
              <span className="text-3xl ml-3">{ statesIcons[state] }</span>
             </div>
            </h3>

            <ul className="mt-5 space-y-5">
              {issues.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay Tickets
                </li>
              ) : (
                issues.map((issue) => (
                  <IssueCard key={issue._id} issue={issue} />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
