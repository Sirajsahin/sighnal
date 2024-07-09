import HeaderComponent from "../HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { IUIContainerProps } from "./interface";

const UIContainer: React.FC<React.PropsWithChildren<IUIContainerProps>> = (
  props
) => {
  return (
    <div className="bg-gradient-to-r ">
      <SidebarComponent />

      <div className="lg:pl-64">
        <HeaderComponent />

        <main className="py-5 mt-16 ">
          <div className="px-2 sm:px-2 lg:px-3 relative ">
            {props?.children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UIContainer;
