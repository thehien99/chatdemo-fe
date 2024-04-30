import { memo, useEffect } from "react";

const ConvMess = ({ nameUserOfConv }) => {

  return (
    <div>
      {nameUserOfConv?.map((item) => {
        return <li key={item?.id}>
          {item?.name}
        </li>
      })}
    </div>
  )
}

export default memo(ConvMess)