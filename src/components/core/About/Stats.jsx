import React from 'react'

const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"}
];

const StatsComponent = () => {
  return (
    <section className='py-10 bg-richblack-700 text-richblack-25'>
        <div className='max-w-maxContent mx-auto'>
            <div className='flex font-bold justify-evenly'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='text-center'>
                                <h1 className='text-center text-4xl'>{data.count}</h1>
                                <h2>{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
