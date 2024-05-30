import React from 'react'
import { IFeedbackHeaderComponentProps } from './interface'

const GroupHeaderComponent: React.FC<IFeedbackHeaderComponentProps> = (props) => {
    return (
        <div className="flex  gap-2 flex-col">
            <div className="flex items-center gap-3 ">
                <div className="bg-[#F5F5F5] h-9 w-9 rounded-lg"></div>
                <p className="text-xl font-bold text-[#333333] ">{props?.header}</p>
            </div>
            {props?.para && <p className="text-sm font-normal text-[#475467] my-2 w-3/5 ">{props?.para}</p>}
        </div>
    )
}

export default GroupHeaderComponent
