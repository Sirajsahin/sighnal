import { useQuestionResponseAPI } from "@/app/hooks/api_hooks/Group/useQuestionResponseAPI";
import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";

import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
// import { startCase } from "lodash";
import { useEffect, useMemo } from "react";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const BreadcrumbsNavComponent = () => {
  const location = useLocation();
  const [params, _setparams] = useSearchParams();
  const { getRouteKey } = useRouter();
  const navigate = useNavigate();
  const locations = location.pathname
    .split("/")
    .splice(2)
    .filter((x) => !/[^a-zA-Z]/.test(x) && x.toLowerCase() !== "home"); // Exclude IDs and 'home'

  console.log(locations, "locations");

  const { groupDetails } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))
    ?.routeState?.state as ISurvetSliceState;

  const { execute: fetchQuestionDetails, prevQuestionDetails } =
    useQuestionResponseAPI();

  useEffect(() => {
    const survey_id = params.get("survey_id");
    if (survey_id) {
      fetchQuestionDetails(survey_id);
    }
  }, [params.get("survey_id")]);

  const handelClick = (item: string) => {
    if (item === "campaign") {
      navigate(
        `/app/campaign/campaign-list?group_id=${groupDetails?.group_id}`
      );
    }
  };
  return useMemo(() => {
    return (
      <nav
        className={`relative flex  pr-16 ${locations?.length > 0 && "border-b pb-4 mb-4"}  `}
        aria-label="Breadcrumb"
      >
        <ol
          role="list"
          className="flex items-center  bg-white   rounded-md w-full"
        >
          {locations?.length > 0 && (
            <li>
              <div>
                <Link
                  to={getRouteKey("HOME_PAGE", "url")}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <img
                    src="https://vetic-img.s3.ap-south-1.amazonaws.com/quick_commerce//misc/scsddsvgh.svg"
                    alt="icon"
                  />
                </Link>
              </div>
            </li>
          )}
          {locations.map((loc, id) => (
            <li key={loc} onClick={() => handelClick(loc)}>
              <div className="flex items-center ml-3">
                <img
                  src="https://vetic-img.s3.ap-south-1.amazonaws.com/quick_commerce//misc/thesvgsdIcon.svg"
                  alt="icon"
                />

                <a
                  href="#"
                  className={`ml-3 font-bold ${id === locations?.length - 1 ? "text-[#0C6545]" : "text-[#475467]"} text-sm `}
                >
                  {loc === "campaign" && groupDetails?.group_name}
                  {loc === "live" && prevQuestionDetails?.survey_name}
                  {/* {startCase(loc.split("-")?.join(" ")) ?? ""} */}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }, [locations]);
};

export default BreadcrumbsNavComponent;
