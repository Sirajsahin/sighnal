import StatsCardComponent from '@/components/ui/StatsCardComponent'
import React from 'react'
const data = [
    {
        item: 'Live',
        number: '0'
    },
    {
        item: 'Upcoming',
        number: '0'
    },
    {
        item: 'Completed',
        number: '0'
    },
    {
        item: 'Total',
        number: '0'
    }
]
const SurveyCreateComponent = () => {
    return (
        <div className=" flex gap-4">
            {data.map((val, id) => {
                return (
                    <div key={id}>
                        <StatsCardComponent cardText={val?.item} cardValue={val?.number} />
                    </div>
                )
            })}
        </div>
    )
}

export default SurveyCreateComponent
