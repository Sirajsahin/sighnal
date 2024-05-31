import HeaderComponent from "../HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { IUIContainerProps } from "./interface";

const UIContainer: React.FC<React.PropsWithChildren<IUIContainerProps>> = (
  props
) => {
  return (
    <>
      <div className="flex w-full flex-row h-screen">
        <SidebarComponent />

        <div className="w-full flex-col h-screen">
          <HeaderComponent />

          <main className="py-6 px-4">
            <div className="px-4 sm:px-2 lg:px-3  ">{props?.children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UIContainer;
