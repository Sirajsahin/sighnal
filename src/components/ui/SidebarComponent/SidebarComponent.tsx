import { HomeIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Home",
    href: "/app/home",
    icon: HomeIcon,
    count: "5",
    current: true,
  },
  {
    name: "Campaign",
    href: "/app/campaign/live?group_id=4d38d7b7-18b8-41ea-ba19-28669b405a01&survey_id=44a4ba4f-0cac-47ef-a374-88bfd324b32b",
    icon: HomeIcon,
    count: "5",
    current: true,
  },
  // { name: "Campaign", href: "/app/campaign", icon: UsersIcon, current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarComponent({ collapsed, setCollapsed }) {
  return (
    <div
      className={`fixed z-50 h-full mt-16 bg-gray-800 ${collapsed ? "w-10" : "lg:w-[15rem]"} lg:inset-y-0 lg:z-0 lg:flex lg:flex-col`}
    >
      <div className="flex h-16 shrink-0 items-center justify-end px-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-6 w-6" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="flex flex-1 flex-col w-full">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className=" space-y-1">
              {navigation?.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? " text-white"
                        : "text-gray-400 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {!collapsed && item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
