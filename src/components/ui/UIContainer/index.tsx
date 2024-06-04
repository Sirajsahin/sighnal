import HeaderComponent from "../HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { IUIContainerProps } from "./interface";

const UIContainer: React.FC<React.PropsWithChildren<IUIContainerProps>> = (
  props
) => {
  return (
    <div className="flex h-screen">
      <SidebarComponent />

      <div className="flex flex-col w-full">
        <HeaderComponent />

        <div className="flex-1 mx-6 my-6 sm:px-2 lg:px-3 overflow-auto">
          {props?.children}
        </div>
      </div>
    </div>
  );
};

export default UIContainer;
