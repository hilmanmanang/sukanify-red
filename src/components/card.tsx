import React from 'react'


function Card(props: any) {
    const { } = props
    console.log(props.item)
    return (
        <div className='bg-[#181818] p-3 w-36 h-56 mr-2 mb-2'>
            <img src={props?.item?.images[0]?.url} alt={props?.item?.name} className="w-36 rounded-full"/>
            <div className='text-white font-semibold text-sm mt-4 truncate'>{props?.item?.name}</div>
            <div className='text-white text-sm mt-2'>{props?.item?.type}</div>
        </div>
    )
}

export default Card
